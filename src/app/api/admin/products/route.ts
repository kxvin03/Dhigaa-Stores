import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'ADMIN' && session.role !== 'STAFF')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      category: categoryName,
      price,
      compareAtPrice,
      stock,
      fabric,
      zariType,
      borderType,
      occasion,
      color,
      colorHex,
      imageUrl,
      description,
    } = body;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const sku = `DHI-NEW-${Math.floor(1000 + Math.random() * 9000)}`;

    let category = await prisma.category.findFirst({
      where: { name: categoryName },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        },
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        sku,
        categoryId: category.id,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        stock: parseInt(stock, 10) || 10,
        fabric: fabric || 'Pure Silk',
        zariType,
        borderType,
        occasion,
        color: color || 'Heritage Gold',
        colorHex: colorHex || '#B8924A',
        description: description || '',
        isPublished: true,
      },
    });

    if (imageUrl) {
      await prisma.media.create({
        data: {
          productId: product.id,
          url: imageUrl,
          mediaType: 'IMAGE',
          displayOrder: 1,
        },
      });
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

