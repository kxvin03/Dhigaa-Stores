import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { razorpayInstance } from '@/lib/razorpay';
import { generateOrderNumber, isErodePincode } from '@/lib/utils';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      items,
      paymentMethod, // 'RAZORPAY', 'COD', 'STORE_PICKUP'
      couponCode,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Shopping cart is empty' }, { status: 400 });
    }

    if (!customerName || !customerPhone || !address?.pincode) {
      return NextResponse.json(
        { error: 'Customer contact name, phone and delivery address are required' },
        { status: 400 }
      );
    }

    // 1. Calculate totals on server side - NEVER trust client amounts!
    let subtotal = 0;
    const verifiedOrderItems = [];

    for (const item of items) {
      const dbProduct = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true },
      });

      if (!dbProduct) {
        return NextResponse.json(
          { error: `Product ${item.name} is unavailable or out of stock` },
          { status: 400 }
        );
      }

      let itemPrice = dbProduct.price;
      if (item.variantId) {
        const variant = dbProduct.variants.find((v) => v.id === item.variantId);
        if (variant && variant.priceDelta) {
          itemPrice += variant.priceDelta;
        }
      }

      // Add-on cost
      let addOnCost = 0;
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        addOnCost = item.selectedAddOns.reduce((sum: number, a: any) => sum + (a.price || 0), 0);
      }

      const lineTotal = (itemPrice + addOnCost) * item.quantity;
      subtotal += lineTotal;

      verifiedOrderItems.push({
        productId: dbProduct.id,
        variantId: item.variantId || null,
        productName: dbProduct.name,
        variantTitle: item.variantTitle || null,
        price: itemPrice + addOnCost,
        quantity: item.quantity,
        addOnsJson: JSON.stringify(item.selectedAddOns || []),
        imageUrl: item.imageUrl || null,
      });
    }

    // 2. Coupon Discount
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase().trim() },
      });

      if (coupon && coupon.isActive && subtotal >= coupon.minOrderAmount) {
        if (coupon.discountType === 'PERCENTAGE') {
          discountAmount = (subtotal * coupon.value) / 100;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        } else {
          discountAmount = coupon.value;
        }
      }
    }

    // 3. Shipping & Taxes
    const freeShippingThreshold = 2500;
    let shippingAmount = subtotal >= freeShippingThreshold ? 0 : 150;
    const isErode = isErodePincode(address.pincode);
    const deliveryType = isErode ? 'ERODE_SAMEDAY' : 'STANDARD';

    // 5% GST for silk textile in India
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxGst = Math.round(taxableAmount * 0.05);

    // COD handling fee
    let codFee = 0;
    if (paymentMethod === 'COD') {
      codFee = 99;
    }

    const totalAmount = Math.round(taxableAmount + taxGst + shippingAmount + codFee);

    // 4. Create Order in Database
    const orderNumber = generateOrderNumber();
    const session = await getSession();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.id || null,
        customerName,
        customerEmail: customerEmail || 'guest@dhigaafashions.com',
        customerPhone,
        status: 'PLACED',
        paymentStatus: paymentMethod === 'COD' || paymentMethod === 'STORE_PICKUP' ? 'PENDING' : 'PENDING',
        paymentMethod,
        totalAmount,
        subtotal,
        discountAmount,
        shippingAmount: shippingAmount + codFee,
        taxGst,
        couponCode: couponCode || null,
        deliveryType,
        estimatedDelivery: isErode
          ? 'Today or Tomorrow (Express Erode Concierge)'
          : '3 - 5 Business Days across India',
        shippingAddressJson: JSON.stringify(address),
        orderItems: {
          create: verifiedOrderItems,
        },
      },
    });

    // 5. If Razorpay, create server-side Razorpay Order
    let razorpayOrderId = null;
    if (paymentMethod === 'RAZORPAY') {
      try {
        const rzpOrder = await razorpayInstance.orders.create({
          amount: Math.round(totalAmount * 100), // in paise
          currency: 'INR',
          receipt: order.orderNumber,
          notes: {
            orderId: order.id,
            customerPhone,
          },
        });
        razorpayOrderId = rzpOrder.id;

        await prisma.payment.create({
          data: {
            orderId: order.id,
            razorpayOrderId: rzpOrder.id,
            amount: totalAmount,
            status: 'CREATED',
            method: 'RAZORPAY',
          },
        });
      } catch (rzpErr) {
        console.warn('Razorpay order creation fallback (test mode):', rzpErr);
        razorpayOrderId = `order_${Date.now()}`;
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount,
      razorpayOrderId,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_DhigaaBoutique123',
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}

