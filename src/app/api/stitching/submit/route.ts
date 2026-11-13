import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      garmentType,
      neckDesign,
      sleeveType,
      bust,
      waist,
      blouseLength,
      shoulder,
      frontNeck,
      backNeck,
      sleeveLength,
      notes,
    } = body;

    if (!customerName || !phone) {
      return NextResponse.json(
        { error: 'Customer name and phone number are required' },
        { status: 400 }
      );
    }

    const stitchingRequest = await prisma.stitchingRequest.create({
      data: {
        customerName,
        phone,
        email: email || '',
        garmentType: garmentType || 'BLOUSE',
        neckDesign,
        sleeveType,
        bust: bust ? parseFloat(bust) : null,
        waist: waist ? parseFloat(waist) : null,
        blouseLength: blouseLength ? parseFloat(blouseLength) : null,
        shoulder: shoulder ? parseFloat(shoulder) : null,
        frontNeck: frontNeck ? parseFloat(frontNeck) : null,
        backNeck: backNeck ? parseFloat(backNeck) : null,
        sleeveLength: sleeveLength ? parseFloat(sleeveLength) : null,
        notes,
        status: 'PENDING',
        priceEstimate: 999.0,
      },
    });

    return NextResponse.json({
      success: true,
      requestId: stitchingRequest.id,
      message: 'Measurements recorded! Our master tailor will review and confirm.',
    });
  } catch (error: any) {
    console.error('Stitching submit error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

