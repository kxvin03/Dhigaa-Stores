'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Heart, MessageCircle, Sparkles, Check, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatINR } from '@/lib/currency';

interface QuickViewModalProps {
  product: any;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const primaryImage =
    product.imageUrl ||
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: primaryImage,
      fabric: product.fabric,
      quantity: 1,
      stock: product.stock || 10,
      selectedAddOns,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I am inquiring about ${product.name} (Price: ${formatINR(product.price)}). Is this available for order?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#FAF7F2] dark:bg-[#1B1512] rounded-3xl overflow-hidden shadow-2xl border border-[#B8924A]/40 z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 dark:bg-[#2B211C]/80 backdrop-blur-md flex items-center justify-center text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto h-72 md:h-full bg-[#F5EEE2]">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#B8924A] font-semibold mb-1">
                {product.category?.name || product.category || 'Couture Handloom'}
              </div>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-bold text-xl text-[#2B211C] dark:text-[#F5EEE2]">
                  {formatINR(product.price)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatINR(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {product.fabric && (
                <div className="mt-3 p-2.5 rounded-xl bg-[#F5EEE2] dark:bg-[#231A16] border border-[#B8924A]/20 text-xs">
                  <span className="font-semibold text-[#6A5446] dark:text-[#E8D5C8]">Fabric: </span>
                  <span className="text-[#2B211C] dark:text-[#F5EEE2]">{product.fabric}</span>
                  {product.zariType && (
                    <div className="mt-1">
                      <span className="font-semibold text-[#6A5446] dark:text-[#E8D5C8]">Zari: </span>
                      <span className="text-[#2B211C] dark:text-[#F5EEE2]">{product.zariType}</span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 mt-2 font-medium">
                <Truck className="w-3.5 h-3.5" />
                <span>Erode Same-Day Delivery / 3-5 Days Pan-India</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-4 border-t border-[#B8924A]/20">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="w-full py-3 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#2B211C] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#6A5446] transition-all shadow-md active:scale-95"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag &bull; {formatINR(product.price)}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/919092806555?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-xl border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] hover:bg-[#B8924A]/10 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B8924A]" />
                  <span>Full Details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

