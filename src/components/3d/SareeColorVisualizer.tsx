'use client';

import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/currency';

const bodyColors = [
  { name: 'Royal Crimson Red', hex: '#8B1E2E' },
  { name: 'Peacock Deep Teal', hex: '#0D5C63' },
  { name: 'Swarnam Mustard Gold', hex: '#D49A3D' },
  { name: 'Maragatham Emerald', hex: '#134E37' },
  { name: 'Rose Petal Blush', hex: '#C98C93' },
  { name: 'Obsidian Midnight Black', hex: '#1C1614' },
];

const borderStyles = [
  { name: 'Traditional Korvai Temple Border', zari: 'Pure 2G Gold Zari', delta: 0 },
  { name: 'Grand Mayil Peacock Brocade Border', zari: 'Antique Copper Zari', delta: 1200 },
  { name: 'Contrast Silver Kadwa Zari Border', zari: 'Tested Shimmer Silver', delta: 800 },
];

const palluDesigns = [
  { name: 'Annapakshi & Yali Heritage Brocade', detail: 'Dense 3-Shuttle Weft Weave' },
  { name: 'Kamalam Lotus & Floral Jaal', detail: 'Intricate Meenakari Accents' },
  { name: 'Geometric Chevron Ikat Interlock', detail: 'Artisanal Double Warp' },
];

export default function SareeColorVisualizer() {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(bodyColors[0]);
  const [selectedBorder, setSelectedBorder] = useState(borderStyles[0]);
  const [selectedPallu, setSelectedPallu] = useState(palluDesigns[0]);
  const [added, setAdded] = useState(false);

  const basePrice = 18500;
  const totalPrice = basePrice + selectedBorder.delta;

  const handleAddToCart = () => {
    addItem({
      productId: 'custom-visualizer-saree',
      name: `Custom Atelier Saree (${selectedColor.name})`,
      slug: 'custom-bespoke-kanchipuram-silk',
      price: totalPrice,
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      fabric: 'Pure Mulberry Kanchipuram Silk',
      variantTitle: `${selectedBorder.name} • ${selectedPallu.name}`,
      color: selectedColor.name,
      quantity: 1,
      stock: 5,
      selectedAddOns: [],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappText = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I customized a saree on your 3D Visualizer:\n` +
    `- Body Color: ${selectedColor.name}\n` +
    `- Border Style: ${selectedBorder.name} (${selectedBorder.zari})\n` +
    `- Pallu Design: ${selectedPallu.name}\n` +
    `Estimated Price: ${formatINR(totalPrice)}. Can we schedule a loom weaving for this?`
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] dark:bg-[#16100D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/15 border border-[#B8924A]/30 text-xs font-semibold text-[#B8924A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Atelier Studio</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Custom Saree & Zari Visualizer
          </h2>
          <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
            Choose your signature body silk shade, authentic temple korvai border and heirloom pallu. See your bespoke creation manifest in real time.
          </p>
        </div>

        {/* Visualizer Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Saree Canvas Representation (Works on all mobile devices with 0 lag) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B8924A]/40 bg-[#1E1714] p-6 flex flex-col justify-between">
              {/* Saree Pallu Section (Top/Side Drape) */}
              <div
                className="w-full h-32 rounded-2xl p-4 shadow-md relative overflow-hidden flex flex-col justify-end text-white border border-[#B8924A]"
                style={{
                  background: `linear-gradient(135deg, #B8924A 0%, #755427 100%)`,
                }}
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FAF7F2_2px,transparent_2px)] [background-size:12px_12px]" />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5EEE2]/90">
                    Grand Pallu
                  </span>
                  <div className="font-serif text-sm font-bold">{selectedPallu.name}</div>
                  <div className="text-[10px] text-[#F5EEE2]/80">{selectedPallu.detail}</div>
                </div>
              </div>

              {/* Saree Body Section */}
              <div
                className="flex-1 my-3 rounded-2xl p-6 shadow-inner relative overflow-hidden flex items-center justify-center transition-colors duration-500 border border-white/10"
                style={{
                  backgroundColor: selectedColor.hex,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20 pointer-events-none" />
                <div className="text-center text-white/90 relative z-10">
                  <div className="font-serif text-xl font-bold tracking-wide">
                    Pure Kanchipuram Mulberry Silk
                  </div>
                  <div className="text-xs opacity-90 mt-1">{selectedColor.name}</div>
                </div>
              </div>

              {/* Saree Korvai Border (Bottom) */}
              <div
                className="w-full h-20 rounded-2xl p-3 shadow-md relative overflow-hidden flex items-center justify-between text-[#1B1512] font-bold border border-[#B8924A]"
                style={{
                  background: 'linear-gradient(90deg, #D4AF37 0%, #B8924A 50%, #997334 100%)',
                }}
              >
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#1B1512]/80">
                    Temple Korvai Border
                  </div>
                  <div className="text-xs font-serif">{selectedBorder.name}</div>
                </div>
                <span className="text-[10px] bg-[#1B1512] text-[#F5EEE2] px-2 py-0.5 rounded-full">
                  {selectedBorder.zari}
                </span>
              </div>
            </div>
          </div>

          {/* Configuration Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Body Color */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#B8924A] flex items-center gap-1.5">
                <span>1. Select Pure Silk Body Color:</span>
                <span className="text-black dark:text-white capitalize font-medium">({selectedColor.name})</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {bodyColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color.name}`}
                    className={`h-12 rounded-xl flex items-center justify-center transition-all ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-[#B8924A] scale-105 shadow-md'
                        : 'hover:scale-102 opacity-85'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor.name === color.name && (
                      <Check className="w-5 h-5 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Border Work */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#B8924A]">
                2. Select Border & Zari Craftsmanship:
              </label>
              <div className="space-y-2">
                {borderStyles.map((border) => (
                  <button
                    key={border.name}
                    onClick={() => setSelectedBorder(border)}
                    className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between text-xs ${
                      selectedBorder.name === border.name
                        ? 'bg-[#B8924A]/20 border-[#B8924A] text-[#2B211C] dark:text-[#F5EEE2] font-semibold'
                        : 'bg-white dark:bg-[#1E1714] border-gray-200 dark:border-gray-800 text-[#6A5446] dark:text-[#E8D5C8]'
                    }`}
                  >
                    <div>
                      <div>{border.name}</div>
                      <div className="text-[10px] text-[#B8924A]">{border.zari}</div>
                    </div>
                    {border.delta > 0 && (
                      <span className="text-[11px] font-bold text-[#B8924A]">+{formatINR(border.delta)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pallu Motif */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#B8924A]">
                3. Choose Heritage Pallu Brocade:
              </label>
              <div className="space-y-2">
                {palluDesigns.map((pallu) => (
                  <button
                    key={pallu.name}
                    onClick={() => setSelectedPallu(pallu)}
                    className={`w-full p-3 rounded-xl text-left border transition-all text-xs ${
                      selectedPallu.name === pallu.name
                        ? 'bg-[#B8924A]/20 border-[#B8924A] text-[#2B211C] dark:text-[#F5EEE2] font-semibold'
                        : 'bg-white dark:bg-[#1E1714] border-gray-200 dark:border-gray-800 text-[#6A5446] dark:text-[#E8D5C8]'
                    }`}
                  >
                    <div>{pallu.name}</div>
                    <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]/70">{pallu.detail}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Actions */}
            <div className="p-5 rounded-2xl bg-[#F5EEE2] dark:bg-[#1E1714] border border-[#B8924A]/30 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">Bespoke Artisan Total:</span>
                <span className="font-serif font-bold text-2xl text-[#2B211C] dark:text-[#F5EEE2]">
                  {formatINR(totalPrice)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="w-full py-3 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#2B211C] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#6A5446] transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Bag!' : 'Order Custom Drape'}</span>
                </button>

                <a
                  href={`https://wa.me/919092806555?text=${whatsappText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#20ba5a] transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

