'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  Award,
  MessageCircle,
  MapPin,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Scissors,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatINR } from '@/lib/currency';
import { getEstimatedDeliveryByPincode } from '@/lib/utils';
import ProductViewer3D from '@/components/3d/ProductViewer3D';

const availableAddOns = [
  { id: '1', code: 'BLOUSE_STITCH', name: 'Custom Blouse Stitching', price: 999, desc: 'Tailored to your body measurements with soft cotton lining' },
  { id: '2', code: 'FALL_PICO', name: 'Fall & Pico Hemming', price: 150, desc: 'Soft matching cotton fall with precision pico hem' },
  { id: '3', code: 'PETTICOAT', name: 'Matching Pure Cotton Petticoat', price: 450, desc: '100% breathable combed cotton with drawstring' },
  { id: '4', code: 'GIFT_WRAP', name: 'Luxury Gift Box & Note', price: 250, desc: 'Gold-embossed rigid keepsake box and handwritten calligraphy card' },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [viewMode, setViewMode] = useState<'PHOTO' | '3D'>('PHOTO');
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('638001'); // Default Erode
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const found = (data.products || []).find((p: any) => p.slug === slug);
        if (found) {
          setProduct(found);
          const initialImg = found.imageUrl || found.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';
          setSelectedImage(initialImg);
          if (found.variants && found.variants.length > 0) {
            setSelectedVariant(found.variants[0]);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (pincode && pincode.length === 6) {
      setDeliveryInfo(getEstimatedDeliveryByPincode(pincode));
    }
  }, [pincode]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-serif text-[#B8924A]">
        Loading handcrafted saree details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">Creation Not Found</h2>
        <Link href="/shop" className="px-6 py-2.5 rounded-full bg-[#B8924A] text-[#1B1512] font-semibold text-xs">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const currentPrice = product.price + (selectedVariant?.priceDelta || 0);
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const finalUnitPrice = currentPrice + addOnsTotal;

  const toggleAddOnItem = (addon: any) => {
    const exists = selectedAddOns.some((a) => a.code === addon.code);
    if (exists) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.code !== addon.code));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: currentPrice,
      imageUrl: selectedImage,
      fabric: product.fabric,
      variantId: selectedVariant?.id || null,
      variantTitle: selectedVariant?.size || null,
      quantity,
      stock: product.stock || 10,
      selectedAddOns,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I am inquiring about *${product.name}* (SKU: ${product.sku}, Price: ${formatINR(finalUnitPrice)}).\n` +
    `Can you send a high-res video of the zari drape and confirm availability?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-[#6A5446] dark:text-[#E8D5C8]">
        <Link href="/" className="hover:text-[#B8924A]">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#B8924A]" />
        <Link href="/shop" className="hover:text-[#B8924A]">Creations</Link>
        <ChevronRight className="w-3 h-3 text-[#B8924A]" />
        <span className="text-[#B8924A] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Gallery / 3D Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mode Switcher Pills */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('PHOTO')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'PHOTO'
                  ? 'bg-[#2B211C] text-white dark:bg-[#B8924A] dark:text-[#2B211C]'
                  : 'bg-black/5 dark:bg-white/5 text-[#6A5446] dark:text-[#E8D5C8]'
              }`}
            >
              Editorial High-Res Gallery
            </button>
            <button
              onClick={() => setViewMode('3D')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === '3D'
                  ? 'bg-[#2B211C] text-white dark:bg-[#B8924A] dark:text-[#2B211C]'
                  : 'bg-black/5 dark:bg-white/5 text-[#6A5446] dark:text-[#E8D5C8]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>360&deg; 3D Drape Viewer</span>
            </button>
          </div>

          {viewMode === 'PHOTO' ? (
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#B8924A]/30 bg-[#F5EEE2] group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() =>
                  toggleWishlist({
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    imageUrl: selectedImage,
                  })
                }
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/80 dark:bg-[#2B211C]/80 backdrop-blur-md border border-[#B8924A]/30 flex items-center justify-center text-[#2B211C] dark:text-[#F5EEE2] shadow"
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-[#B8924A] text-[#B8924A]' : ''}`} />
              </button>
            </div>
          ) : (
            <ProductViewer3D
              productName={product.name}
              primaryColor={product.colorHex || '#8B1E2E'}
              zariType={product.zariType || 'Pure Gold Tested Zari'}
            />
          )}

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setViewMode('PHOTO');
                  }}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img.url ? 'border-[#B8924A] scale-102' : 'border-transparent opacity-70'
                  }`}
                >
                  <Image src={img.url} alt={`Angle ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details & Purchase Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8924A]">
                {product.category?.name || 'Silk Heritage'}
              </span>
              <span className="text-gray-400">&bull;</span>
              <span className="text-[11px] font-mono text-[#6A5446] dark:text-[#E8D5C8]">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2] leading-snug">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-serif font-bold text-3xl text-[#2B211C] dark:text-[#F5EEE2]">
                {formatINR(finalUnitPrice)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-base text-gray-400 line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                Inclusive of 5% GST
              </span>
            </div>
          </div>

          {/* Textile Specs Pill Matrix */}
          <div className="p-4 rounded-2xl bg-[#F5EEE2]/70 dark:bg-[#1E1714] border border-[#B8924A]/25 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#6A5446] dark:text-[#E8D5C8]/70 block text-[10px] uppercase font-bold">Fabric</span>
              <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{product.fabric}</span>
            </div>
            <div>
              <span className="text-[#6A5446] dark:text-[#E8D5C8]/70 block text-[10px] uppercase font-bold">Zari Grade</span>
              <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{product.zariType || 'Pure Tested Zari'}</span>
            </div>
            <div>
              <span className="text-[#6A5446] dark:text-[#E8D5C8]/70 block text-[10px] uppercase font-bold">Border Type</span>
              <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{product.borderType || 'Korvai Temple Border'}</span>
            </div>
            <div>
              <span className="text-[#6A5446] dark:text-[#E8D5C8]/70 block text-[10px] uppercase font-bold">Origin Looms</span>
              <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">Tamil Nadu Handloom</span>
            </div>
          </div>

          {/* Variant Selection if available */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#B8924A]">
                Select Draping / Tailoring Option:
              </label>
              <div className="space-y-2">
                {product.variants.map((v: any) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`w-full p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      selectedVariant?.id === v.id
                        ? 'bg-[#B8924A]/20 border-[#B8924A] text-[#2B211C] dark:text-[#F5EEE2] font-semibold'
                        : 'bg-white dark:bg-[#1E1714] border-gray-200 dark:border-gray-800 text-[#6A5446] dark:text-[#E8D5C8]'
                    }`}
                  >
                    <span>{v.size}</span>
                    {v.priceDelta > 0 && (
                      <span className="font-bold text-[#B8924A]">+{formatINR(v.priceDelta)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Optional Add-Ons Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#B8924A]">
              <span className="flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span>Bespoke Add-Ons & Finishing</span>
              </span>
              <span className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8] lowercase">optional</span>
            </div>

            <div className="space-y-2">
              {availableAddOns.map((addon) => {
                const isSelected = selectedAddOns.some((a) => a.code === addon.code);
                return (
                  <div
                    key={addon.code}
                    onClick={() => toggleAddOnItem(addon)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-[#B8924A]/15 border-[#B8924A] text-[#2B211C] dark:text-[#F5EEE2]'
                        : 'bg-white dark:bg-[#1E1714] border-gray-200 dark:border-gray-800 text-[#6A5446] dark:text-[#E8D5C8]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold flex items-center gap-1.5">
                        <span className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                          isSelected ? 'bg-[#B8924A] border-[#B8924A] text-white' : 'border-gray-400'
                        }`}>
                          {isSelected && '✓'}
                        </span>
                        <span>{addon.name}</span>
                      </div>
                      <p className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]/70 pl-5.5">
                        {addon.desc}
                      </p>
                    </div>
                    <span className="font-bold text-[#B8924A] shrink-0 ml-2">
                      +{formatINR(addon.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pincode Delivery Estimator */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/25 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#2B211C] dark:text-[#F5EEE2]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#B8924A]" />
                <span>Delivery Estimator:</span>
              </span>
              <span className="text-[11px] text-[#B8924A]">Erode: 638001 - 638115</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit PIN code"
                className="flex-1 px-3 py-1.5 rounded-lg border border-[#B8924A]/40 bg-transparent text-xs text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              />
            </div>

            {deliveryInfo && (
              <div className="text-xs pt-1 flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {deliveryInfo.badge}
                  </div>
                  <div className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80">
                    Estimated: {deliveryInfo.estimate}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#B8924A]/40 rounded-xl overflow-hidden bg-white dark:bg-[#1E1714]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[#2B211C] dark:text-[#F5EEE2] hover:bg-[#B8924A]/20 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="px-3 py-2 text-[#2B211C] dark:text-[#F5EEE2] hover:bg-[#B8924A]/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#6A5446] transition-all shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag &bull; {formatINR(finalUnitPrice * quantity)}</span>
              </button>
            </div>

            {/* Buy Now & WhatsApp */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-xs sm:text-sm shadow-gold-glow hover:opacity-95 transition-all active:scale-95 text-center"
              >
                Buy Now (Fast Checkout)
              </button>

              <a
                href={`https://wa.me/919092806555?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Return policy notice near buy button */}
            <div className="flex items-center gap-2 text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80 pt-1">
              <RotateCcw className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Hassle-free 7-day exchange guarantee &bull; 100% Insured Transit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

