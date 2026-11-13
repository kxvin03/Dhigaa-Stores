'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/storefront/ProductCard';
import QuickViewModal from '@/components/storefront/QuickViewModal';

const collectionMetadata: Record<string, { title: string; subtitle: string; description: string }> = {
  sarees: {
    title: 'Heritage Silk & Handloom Sarees',
    subtitle: 'Kanchipuram Silks & Chettinad Cottons',
    description: 'Master handloom drapes featuring pure mulberry silk, tested gold zari and iconic korvai temple borders from Tamil Nadu.',
  },
  'bridal-wear': {
    title: 'The Royal Muhurtham Bridal Trousseau',
    subtitle: 'Opulent Pure Gold 3G Zari & Zardozi Lehengas',
    description: 'Heirloom bridal creations designed to illuminate auspicious wedding milestones and cherished celebrations.',
  },
  'salwar-suits': {
    title: 'Regal Salwar Sets & Anarkalis',
    subtitle: 'Pure Chanderi Silk & Georgette Flared Ensembles',
    description: 'Fluid silhouettes crafted with delicate zardozi, hand embroidery and sheer scalloped dupattas.',
  },
  kurtis: {
    title: 'Handblock Kurtis & Artisanal Tunics',
    subtitle: 'Pure Cotton Silk & Breathable Everyday Luxury',
    description: 'Contemporary tunics adorned with subtle mirror work, resham threads and traditional motifs.',
  },
  'kids-pattu-pavadai': {
    title: 'Traditional Kids Pattu Pavadai',
    subtitle: 'Pure Silk Skirts & Blouses for Little Princesses',
    description: 'South Indian heirloom pavadai sets crafted with soft inner cotton linings and rich traditional zari borders.',
  },
};

export default function CollectionDetailPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const meta = collectionMetadata[String(slug)] || {
    title: 'Couture Creations',
    subtitle: 'Dhigaa Fashions Atelier',
    description: 'Explore our artisanal handloom collections handcrafted in Erode and Kanchipuram.',
  };

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          const filtered = data.products.filter((p: any) => {
            const pCat = p.category?.slug?.toLowerCase() || '';
            const querySlug = String(slug).toLowerCase();
            return pCat.includes(querySlug) || querySlug.includes(pCat);
          });
          setProducts(filtered.length > 0 ? filtered : data.products.slice(0, 12));
        }
      });
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-card border border-[#B8924A]/30 text-center space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8924A]/5 to-transparent pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">
          {meta.subtitle}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          {meta.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] max-w-xl mx-auto font-light leading-relaxed">
          {meta.description}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setSelectedProduct(p)}
          />
        ))}
      </div>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

