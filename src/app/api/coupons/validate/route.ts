import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { code, cartAmount } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Please enter a coupon code' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ error: 'Invalid or expired coupon code' }, { status: 400 });
    }

    if (cartAmount < coupon.minOrderAmount) {
      return NextResponse.json(
        { error: `This code requires a minimum order of ₹${coupon.minOrderAmount.toLocaleString('en-IN')}` },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = (cartAmount * coupon.value) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discount: Math.round(discount),
      message: `Coupon ${coupon.code} applied successfully!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}

