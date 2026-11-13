import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      await req.json();

    if (!orderId || !razorpayPaymentId) {
      return NextResponse.json({ error: 'Missing payment identifiers' }, { status: 400 });
    }

    // In test environment with demo secrets, verify if provided or allow test fulfillment
    const isValid =
      process.env.NODE_ENV === 'development' || !process.env.RAZORPAY_KEY_SECRET
        ? true
        : verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update order and payment records
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
      },
    });

    await prisma.payment.upsert({
      where: { orderId },
      update: {
        razorpayPaymentId,
        razorpaySignature,
        status: 'CAPTURED',
      },
      create: {
        orderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        amount: 0,
        status: 'CAPTURED',
      },
    });

    return NextResponse.json({ success: true, message: 'Payment successfully verified' });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

