const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Dhigaa Fashions Boutique Database ---');

  // 1. Theme Settings
  await prisma.themeSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      primaryColor: '#6A5446',
      secondaryColor: '#B8924A',
      creamColor: '#F5EEE2',
      espressoColor: '#2B211C',
      blushColor: '#E8D5C8',
      fontHeading: 'Playfair Display',
      fontBody: 'Inter',
      borderRadius: '0.75rem',
      enable3DHero: true,
      heroIntensity: 1.0,
      logoUrl: '/assets/logo.png',
      logoLightUrl: '/assets/logo-light.png',
      logoDarkUrl: '/assets/logo-dark.png',
    },
  });

  // 2. Store Settings
  const defaultStoreSettings = [
    { key: 'store_name', value: 'Dhigaa Fashions', description: 'Official Boutique Name' },
    { key: 'tagline', value: 'where every thread has a story', description: 'Logo Brand Tagline' },
    { key: 'headline_tagline', value: 'Where grace meets grandeur', description: 'Homepage Headline Tagline' },
    { key: 'store_email', value: 'dhigaafashions@gmail.com', description: 'Store notifications and orders email' },
    { key: 'store_phone', value: '+91 9092806555', description: 'Customer concierge phone' },
    { key: 'whatsapp_number', value: '919092806555', description: 'WhatsApp business concierge' },
    { key: 'instagram_url', value: 'https://www.instagram.com/dhigaa_fashions/', description: 'Instagram handle' },
    { key: 'store_address', value: 'Dhigaa Fashions Atelier, 128 Nethaji Road, Erode, Tamil Nadu 638001', description: 'Physical Boutique Address' },
    { key: 'gstin', value: '33AAACD1234F1Z8', description: 'Tamil Nadu GST Identification Number' },
    { key: 'free_shipping_threshold', value: '2500', description: 'Minimum cart value for complimentary shipping' },
    { key: 'erode_sameday_active', value: 'true', description: 'Enable same-day doorstep delivery within Erode' },
    { key: 'cod_active', value: 'true', description: 'Cash on delivery enabled' },
    { key: 'cod_max_limit', value: '30000', description: 'Maximum amount for Cash on Delivery' },
    { key: 'cod_extra_fee', value: '99', description: 'Nominal handling fee for COD' },
    { key: 'stock_reservation_minutes', value: '15', description: 'Cart stock reservation timeout during checkout' },
  ];

  for (const s of defaultStoreSettings) {
    await prisma.storeSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 3. Admin Account (mustChangePassword: true on first login)
  const adminPasswordHash = await bcrypt.hash('Dhigaa@2026', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'dhigaafashions@gmail.com' },
    update: {
      role: 'ADMIN',
    },
    create: {
      email: 'dhigaafashions@gmail.com',
      passwordHash: adminPasswordHash,
      name: 'Dhigaa Fashions Creative Director',
      phone: '+91 9092806555',
      role: 'ADMIN',
      mustChangePassword: true,
      loyaltyTier: 'PLATINUM',
      loyaltyPoints: 10000,
    },
  });
  console.log('-> Admin seeded: dhigaafashions@gmail.com (Password: Dhigaa@2026, Must Change: true)');

  // 4. Staff Account
  const staffPasswordHash = await bcrypt.hash('Staff@123', 10);
  await prisma.user.upsert({
    where: { email: 'staff@dhigaafashions.com' },
    update: {},
    create: {
      email: 'staff@dhigaafashions.com',
      passwordHash: staffPasswordHash,
      name: 'Meena Sundaram (Master Tailor & Stylist)',
      phone: '+91 98400 99887',
      role: 'STAFF',
      loyaltyTier: 'GOLD',
      loyaltyPoints: 2500,
    },
  });

  // 5. Customer Account
  const customerPasswordHash = await bcrypt.hash('Customer@123', 10);
  const customerUser = await prisma.user.upsert({
    where: { email: 'priya@example.com' },
    update: {},
    create: {
      email: 'priya@example.com',
      passwordHash: customerPasswordHash,
      name: 'Priya Ramachandran',
      phone: '+91 98840 98765',
      role: 'CUSTOMER',
      loyaltyTier: 'GOLD',
      loyaltyPoints: 1250,
      birthDate: '1992-04-18',
      anniversaryDate: '2019-11-24',
    },
  });

  // Customer Address in Erode / Tamil Nadu
  const existingAddr = await prisma.address.findFirst({
    where: { userId: customerUser.id },
  });
  if (!existingAddr) {
    await prisma.address.create({
      data: {
        userId: customerUser.id,
        name: 'Priya Ramachandran',
        phone: '+91 98840 98765',
        addressLine: '14, Perundurai Road, Near Collector Office',
        locality: 'Maruti Nagar',
        city: 'Erode',
        state: 'Tamil Nadu',
        pincode: '638011',
        isDefault: true,
      },
    });
  }

  // 6. Categories
  const categoriesData = [
    {
      name: 'Sarees',
      slug: 'sarees',
      description: 'Pure Kanchipuram silks, Chettinad handloom cottons, organza and soft silks.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      displayOrder: 1,
    },
    {
      name: 'Bridal Wear',
      slug: 'bridal-wear',
      description: 'Opulent wedding muhurtham silks and bespoke zardozi bridal lehengas.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      displayOrder: 2,
    },
    {
      name: 'Salwar Suits',
      slug: 'salwar-suits',
      description: 'Regal Anarkalis, palazzo ensembles, and Chanderi silk suit sets.',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
      displayOrder: 3,
    },
    {
      name: 'Kurtis',
      slug: 'kurtis',
      description: 'Handblock printed cotton and silk tunic tops with subtle artisanal embroideries.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      displayOrder: 4,
    },
    {
      name: 'Kids Pattu Pavadai',
      slug: 'kids-pattu-pavadai',
      description: 'Traditional pure silk pavadai sets for young princesses for festivals and ceremonies.',
      image: 'https://images.unsplash.com/photo-1610030469668-932454b66dfd?auto=format&fit=crop&w=800&q=80',
      displayOrder: 5,
    },
    {
      name: 'Jewellery & Accessories',
      slug: 'jewellery-accessories',
      description: 'Antique temple kemp jewellery, kasu malas, and royal oddiyanams.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      displayOrder: 6,
    },
  ];

  const categoryMap = {};
  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.name] = record.id;
  }

  // 7. Add-Ons
  const addOnsData = [
    {
      name: 'Custom Blouse Stitching',
      code: 'BLOUSE_STITCH',
      price: 999.0,
      description: 'Tailored to your precise measurements with lining and neck piping.',
      isActive: true,
    },
    {
      name: 'Fall & Pico Hemming',
      code: 'FALL_PICO',
      price: 150.0,
      description: 'Matching soft cotton saree fall stitched with high-precision pico edge.',
      isActive: true,
    },
    {
      name: 'Pure Cotton Inskirt / Petticoat',
      code: 'PETTICOAT',
      price: 450.0,
      description: 'Breathable 100% cotton matching petticoat with adjustable drawstring.',
      isActive: true,
    },
    {
      name: 'Luxury Gift Packaging & Handwritten Note',
      code: 'GIFT_WRAP',
      price: 250.0,
      description: 'Rigid magnetic luxury box tied with gold satin ribbon and personalized calligraphy card.',
      isActive: true,
    },
  ];

  for (const addon of addOnsData) {
    await prisma.addOn.upsert({
      where: { code: addon.code },
      update: addon,
      create: addon,
    });
  }

  // 8. Import Products from CSV
  const csvFilePath = path.join(process.cwd(), 'public', 'assets', 'products.csv');
  if (fs.existsSync(csvFilePath)) {
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const parsed = Papa.parse(csvContent, { header: true, skipEmptyLines: true });

    for (const row of parsed.data) {
      const categoryId = categoryMap[row.category] || categoryMap['Sarees'];

      const product = await prisma.product.upsert({
        where: { sku: row.sku },
        update: {
          name: row.name,
          slug: row.slug,
          categoryId,
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
          description: row.description,
          deliveryEstimate: 'Same-day in Erode, 3-5 days across India',
        },
        create: {
          name: row.name,
          slug: row.slug,
          sku: row.sku,
          categoryId,
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
          description: row.description,
          deliveryEstimate: 'Same-day in Erode, 3-5 days across India',
        },
      });

      // Seed Product Image
      if (row.imageUrl) {
        const existingMedia = await prisma.media.findFirst({
          where: { productId: product.id, url: row.imageUrl },
        });
        if (!existingMedia) {
          await prisma.media.create({
            data: {
              productId: product.id,
              url: row.imageUrl,
              altText: row.name,
              mediaType: 'IMAGE',
              displayOrder: 1,
            },
          });
        }
      }

      // Seed Variants (Unstitched / Standard sizes)
      const existingVariants = await prisma.variant.findMany({
        where: { productId: product.id },
      });
      if (existingVariants.length === 0) {
        if (row.category === 'Sarees' || row.category === 'Bridal Wear') {
          await prisma.variant.create({
            data: {
              productId: product.id,
              sku: `${row.sku}-STD`,
              size: 'Unstitched with Blouse Piece (6.2m)',
              color: row.color,
              colorHex: row.colorHex,
              stock: Math.floor(parseInt(row.stock, 10) * 0.7) || 5,
              priceDelta: 0,
            },
          });
          await prisma.variant.create({
            data: {
              productId: product.id,
              sku: `${row.sku}-PREM`,
              size: 'Pre-pleated Saree with Stitched Blouse (M / 38)',
              color: row.color,
              colorHex: row.colorHex,
              stock: 3,
              priceDelta: 1200,
            },
          });
        } else if (row.category === 'Salwar Suits' || row.category === 'Kurtis') {
          const sizes = ['S (36)', 'M (38)', 'L (40)', 'XL (42)'];
          for (const s of sizes) {
            await prisma.variant.create({
              data: {
                productId: product.id,
                sku: `${row.sku}-${s.substring(0, 2).trim()}`,
                size: s,
                color: row.color,
                colorHex: row.colorHex,
                stock: 4,
                priceDelta: 0,
              },
            });
          }
        } else if (row.category === 'Kids Pattu Pavadai') {
          const kidAges = ['2-4 Yrs', '5-7 Yrs', '8-10 Yrs'];
          for (const age of kidAges) {
            await prisma.variant.create({
              data: {
                productId: product.id,
                sku: `${row.sku}-${age.replace(/\s+/g, '')}`,
                size: age,
                color: row.color,
                colorHex: row.colorHex,
                stock: 3,
                priceDelta: 0,
              },
            });
          }
        }
      }
    }
    console.log(`-> Imported ${parsed.data.length} products from products.csv`);
  }

  // 9. Promotional Coupons
  const coupons = [
    { code: 'DHIGAA10', discountType: 'PERCENTAGE', value: 10, minOrderAmount: 5000, maxDiscount: 2000 },
    { code: 'WELCOME500', discountType: 'FIXED', value: 500, minOrderAmount: 3000 },
    { code: 'ERODE100', discountType: 'FIXED', value: 100, minOrderAmount: 1000 },
    { code: 'BRIDAL2026', discountType: 'PERCENTAGE', value: 15, minOrderAmount: 25000, maxDiscount: 5000 },
  ];
  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }

  // 10. Sample Testimonials & Reviews
  const firstProduct = await prisma.product.findFirst({ where: { slug: 'aadya-royal-crimson-kanchipuram-silk' } });
  if (firstProduct) {
    await prisma.review.createMany({
      data: [
        {
          productId: firstProduct.id,
          userName: 'Ananya Sridharan (Coimbatore)',
          rating: 5,
          title: 'Heirloom quality pure zari!',
          comment: 'Wore this for my sister’s wedding in Madurai. The pure gold zari luster and the heavy korvai temple border drew non-stop compliments all evening.',
          isVerifiedBuyer: true,
          isApproved: true,
        },
        {
          productId: firstProduct.id,
          userName: 'Kavitha Natarajan (Erode)',
          rating: 5,
          title: 'Same-day delivery in Erode was mind blowing!',
          comment: 'Ordered in the morning, arrived neatly packed in their signature fragrance box by 4 PM. Fabric is pure luxury silk mark certified.',
          isVerifiedBuyer: true,
          isApproved: true,
        },
      ],
    });
  }

  // 11. Sample Order
  const sampleOrderCount = await prisma.order.count();
  if (sampleOrderCount === 0 && firstProduct) {
    const order = await prisma.order.create({
      data: {
        orderNumber: 'DHI-2026-9081',
        userId: customerUser.id,
        customerName: 'Priya Ramachandran',
        customerEmail: 'priya@example.com',
        customerPhone: '+91 98840 98765',
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentMethod: 'RAZORPAY',
        totalAmount: 19499,
        subtotal: 18500,
        discountAmount: 0,
        shippingAmount: 0,
        taxGst: 925,
        deliveryType: 'ERODE_SAMEDAY',
        trackingNumber: 'DHI-EXP-ERD-4412',
        courierPartner: 'Dhigaa Concierge Express',
        estimatedDelivery: 'Tomorrow by 2:00 PM',
        shippingAddressJson: JSON.stringify({
          name: 'Priya Ramachandran',
          phone: '+91 98840 98765',
          addressLine: '14, Perundurai Road',
          locality: 'Maruti Nagar',
          city: 'Erode',
          state: 'Tamil Nadu',
          pincode: '638011',
        }),
      },
    });

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: firstProduct.id,
        productName: firstProduct.name,
        price: firstProduct.price,
        quantity: 1,
        imageUrl: firstProduct.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        addOnsJson: JSON.stringify([{ name: 'Custom Blouse Stitching', price: 999 }]),
      },
    });

    await prisma.stitchingRequest.create({
      data: {
        orderId: order.id,
        customerName: 'Priya Ramachandran',
        phone: '+91 98840 98765',
        email: 'priya@example.com',
        garmentType: 'BLOUSE',
        neckDesign: 'Boat Neck with Temple Cutwork',
        sleeveType: 'Elbow Length Maggam Embroidery',
        bust: 36,
        waist: 30,
        blouseLength: 14.5,
        frontNeck: 6.5,
        backNeck: 9.0,
        sleeveLength: 11.0,
        status: 'IN_PROGRESS',
        assignedTailor: 'Meena Sundaram (Master Artisan)',
      },
    });

    // Sample Bridal Booking
    await prisma.booking.create({
      data: {
        type: 'BRIDAL_CONSULTATION',
        name: 'Soundarya Vaitheeswaran',
        phone: '+91 98402 11223',
        email: 'soundarya.v@gmail.com',
        date: '2026-11-20',
        timeSlot: '04:00 PM - 05:30 PM',
        notes: 'Bride looking for traditional Muhurtham silk saree in Golden Mustard with grand Korvai border.',
        status: 'CONFIRMED',
      },
    });
  }

  // 12. Banners
  await prisma.banner.createMany({
    data: [
      {
        title: 'The Royal Erode & Kanchipuram Heirloom Edit',
        subtitle: 'Pure mulberry silks woven by master artisans, imbued with ancient Tamil heritage.',
        badge: 'Pongal & Wedding Edit 2026',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
        linkUrl: '/shop?category=sarees',
        displayOrder: 1,
      },
      {
        title: 'Authentic Chettinad Handloom Cottons',
        subtitle: 'Breathable, sustainable everyday luxury directly from the historic looms.',
        badge: 'Craft Heritage',
        imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85',
        linkUrl: '/shop?category=sarees&fabric=cotton',
        displayOrder: 2,
      },
    ],
  });

  console.log('--- Database Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

