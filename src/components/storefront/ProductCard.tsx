'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, MessageCircle, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatINR } from '@/lib/currency';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    imageUrl?: string;
    images?: { url: string }[];
    category?: { name: string } | string;
    fabric?: string;
    zariType?: string | null;
    stock?: number;
    isFeatured?: boolean;
    isBestSeller?: boolean;
    isFestivalSpecial?: boolean;
    rating?: number;
  };
  onQuickView?: (product: any) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const primaryImage =
    product.imageUrl ||
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;

  const inWish = isInWishlist(product.id);
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: primaryImage,
      fabric: product.fabric,
      quantity: 1,
      stock: product.stock || 10,
      selectedAddOns: [],
    });
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: primaryImage,
      category: categoryName,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I am interested in ${product.name} (SKU/Price: ${formatINR(product.price)}). Can you share video/availability?`
  );
  const whatsappUrl = `https://wa.me/919092806555?text=${whatsappMessage}`;

  return (
    <div className="group relative rounded-2xl overflow-hidden glass-card transition-all duration-300 flex flex-col border border-[#B8924A]/25 hover:border-[#B8924A]/60">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-[#2B211C] text-[#F5EEE2] text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[#B8924A]/40 shadow-sm">
            Best Seller
          </span>
        )}
        {product.isFestivalSpecial && (
          <span className="bg-[#B8924A] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm">
            Festival Edit
          </span>
        )}
        {discountPercent && (
          <span className="bg-red-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-[#2B211C]/80 backdrop-blur-md border border-[#B8924A]/30 flex items-center justify-center text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-transform duration-200 hover:scale-110 active:scale-95 shadow-sm"
      >
        <Heart className={`w-4 h-4 ${inWish ? 'fill-[#B8924A] text-[#B8924A]' : ''}`} />
      </button>

      {/* Product Image Frame */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-[#F5EEE2]">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Quick Action Floating Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 gap-2">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="py-2 px-3 rounded-lg bg-white/90 text-[#2B211C] text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1 shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="py-2 px-3 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-colors flex items-center gap-1 shadow-md"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </Link>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Fabric */}
          <div className="flex items-center justify-between text-[11px] text-[#6A5446] dark:text-[#E8D5C8] mb-1 font-medium">
            <span className="uppercase tracking-wider">{categoryName || 'Sarees'}</span>
            {product.fabric && (
              <span className="truncate max-w-[120px] text-right text-[10px] text-[#B8924A]">
                {product.fabric}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-sm font-semibold text-[#2B211C] dark:text-[#F5EEE2] line-clamp-2 hover:text-[#B8924A] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Zari details if present */}
          {product.zariType && (
            <p className="text-[11px] text-[#6A5446]/80 dark:text-[#E8D5C8]/80 mt-1 flex items-center gap-1 line-clamp-1">
              <Sparkles className="w-3 h-3 text-[#B8924A] shrink-0" />
              <span>{product.zariType}</span>
            </p>
          )}
        </div>

        {/* Pricing & Add To Cart Button */}
        <div className="pt-3 mt-2 border-t border-[#B8924A]/15 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm md:text-base text-[#2B211C] dark:text-[#F5EEE2]">
                {formatINR(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
            </div>
            {product.stock && product.stock <= 3 && (
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                Only {product.stock} left!
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            aria-label="Add to cart"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#2B211C] hover:bg-[#6A5446] transition-transform duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

