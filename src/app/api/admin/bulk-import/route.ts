import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function POST(req: NextRequest) {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'assets', 'products.csv');
    if (!fs.existsSync(csvPath)) {
      return NextResponse.json({ error: 'products.csv not found in /assets' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(csvPath, 'utf8');
    const parsed = Papa.parse(fileContent, { header: true, skipEmptyLines: true });

    let count = 0;

    for (const row of parsed.data as any[]) {
      if (!row.sku || !row.name) continue;

      let category = await prisma.category.findFirst({
        where: { name: row.category || 'Sarees' },
      });

      if (!category) {
        category = await prisma.category.create({
          data: {
            name: row.category || 'Sarees',
            slug: (row.category || 'sarees').toLowerCase().replace(/\s+/g, '-'),
          },
        });
      }

      const product = await prisma.product.upsert({
        where: { sku: row.sku },
        update: {
          name: row.name,
          slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          categoryId: category.id,
          price: parseFloat(row.price),
          compareAtPrice: row.compareAtPrice ? parseFloat(row.compareAtPrice) : null,
          stock: parseInt(row.stock, 10) || 10,
          fabric: row.fabric,
          zariType: row.zariType,
          borderType: row.borderType,
          palluDetails: row.palluDetails,
          weaveType: row.weaveType,
          occasion: row.occasion,
          color: row.color,
          colorHex: row.colorHex,
          isFeatured: row.isFeatured === 'true' || row.isFeatured === true,
          isBestSeller: row.isBestSeller === 'true' || row.isBestSeller === true,
          isFestivalSpecial: row.isFestivalSpecial === 'true' || row.isFestivalSpecial === true,
          description: row.description || '',
        },
        create: {
          name: row.name,
          slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          sku: row.sku,
          categoryId: category.id,
          price: parseFloat(row.price),
          compareAtPrice: row.compareAtPrice ? parseFloat(row.compareAtPrice) : null,
          stock: parseInt(row.stock, 10) || 10,
          fabric: row.fabric,
          zariType: row.zariType,
          borderType: row.borderType,
          palluDetails: row.palluDetails,
          weaveType: row.weaveType,
          occasion: row.occasion,
          color: row.color,
          colorHex: row.colorHex,
          isFeatured: row.isFeatured === 'true' || row.isFeatured === true,
          isBestSeller: row.isBestSeller === 'true' || row.isBestSeller === true,
          isFestivalSpecial: row.isFestivalSpecial === 'true' || row.isFestivalSpecial === true,
          description: row.description || '',
        },
      });

      if (row.imageUrl) {
        const existingMedia = await prisma.media.findFirst({
          where: { productId: product.id, url: row.imageUrl },
        });
        if (!existingMedia) {
          await prisma.media.create({
            data: {
              productId: product.id,
              url: row.imageUrl,
              mediaType: 'IMAGE',
              displayOrder: 1,
            },
          });
        }
      }

      count++;
    }

    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error('CSV import error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

