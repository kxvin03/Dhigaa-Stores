import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const fabric = searchParams.get('fabric');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const bestSeller = searchParams.get('bestseller');
    const festival = searchParams.get('festival');
    const sort = searchParams.get('sort'); // price_asc, price_desc, new

    const where: any = { isPublished: true };

    if (category) {
      where.category = {
        slug: category.toLowerCase(),
      };
    }

    if (fabric) {
      where.fabric = {
        contains: fabric,
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { fabric: { contains: search } },
        { color: { contains: search } },
      ];
    }

    if (featured === 'true') where.isFeatured = true;
    if (bestSeller === 'true') where.isBestSeller = true;
    if (festival === 'true') where.isFestivalSpecial = true;

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { displayOrder: 'asc' } },
        variants: true,
      },
      orderBy,
    });

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}

