'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gift, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function GiftFinderPage() {
  const [recipient, setRecipient] = useState<'mother' | 'wife' | 'sister'>('mother');
  const [occasion, setOccasion] = useState<'wedding' | 'festival' | 'birthday'>('wedding');
  const [budget, setBudget] = useState<'under5k' | 'mid' | 'luxury'>('luxury');

  const recommendations = [
    {
      name: 'Thangam Golden Ivory Bridal Muhurtham Saree',
      fabric: 'Pure Heavy Kanchipuram Silk & Pure Gold 3G Zari',
      price: 26500,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      tag: 'Grand Heirloom Gift',
      slug: 'thangam-golden-ivory-bridal-silk',
    },
    {
      name: 'Padmavathi Antique Kemp Stone Choker Set',
      fabric: '22K Gold Plated with Ruby Hydro Kemp Stones',
      price: 3450,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      tag: 'Royal Temple Jewellery',
      slug: 'padmavathi-antique-kemp-choker',
    },
    {
      name: 'Swarnam Mustard Traditional Chettinad Cotton',
      fabric: '100% Combed Handloom Cotton with Temple Border',
      price: 2450,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      tag: 'Authentic Heritage Everyday',
      slug: 'swarnam-mustard-chettinad-cotton',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <Gift className="w-3.5 h-3.5" />
          <span>Curated Gifting Concierge</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Luxury Gift Finder
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8]">
          Find the perfect South Indian handloom creation wrapped in our signature gold-embossed keepsake box with a personalized note.
        </p>
      </div>

      {/* Selectors */}
      <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#B8924A] block mb-2">
            1. Who are you gifting for?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'mother', label: 'Beloved Mother' },
              { id: 'wife', label: 'Wife / Bride' },
              { id: 'sister', label: 'Sister / Daughter' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRecipient(r.id as any)}
                className={`py-3 rounded-2xl text-xs font-semibold transition-all border ${
                  recipient === r.id
                    ? 'bg-[#B8924A] text-[#1B1512] border-[#B8924A] shadow-gold-glow'
                    : 'border-gray-200 dark:border-gray-800 text-[#6A5446] dark:text-[#E8D5C8]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#B8924A] block mb-2">
            2. What celebration is this for?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'wedding', label: 'Wedding / Muhurtham' },
              { id: 'festival', label: 'Pongal / Diwali' },
              { id: 'birthday', label: 'Birthday / Anniversary' },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => setOccasion(o.id as any)}
                className={`py-3 rounded-2xl text-xs font-semibold transition-all border ${
                  occasion === o.id
                    ? 'bg-[#B8924A] text-[#1B1512] border-[#B8924A] shadow-gold-glow'
                    : 'border-gray-200 dark:border-gray-800 text-[#6A5446] dark:text-[#E8D5C8]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Gifts */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2] text-center">
          Tailored Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-3xl glass-card border border-[#B8924A]/30 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5EEE2]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-[#2B211C]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#B8924A]/40">
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8] mt-1">{item.fabric}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#B8924A]/20 flex items-center justify-between">
                <span className="font-bold text-base text-[#2B211C] dark:text-[#F5EEE2]">
                  {formatINR(item.price)}
                </span>
                <Link
                  href={`/products/${item.slug}`}
                  className="px-4 py-2 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] text-xs font-semibold flex items-center gap-1 hover:bg-[#6A5446] transition-colors"
                >
                  <span>Select Gift</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

