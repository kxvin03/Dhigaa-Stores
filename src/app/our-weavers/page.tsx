'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, HeartHandshake, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function OurWeaversPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <Award className="w-3.5 h-3.5" />
          <span>Heirloom Handloom Legacy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Our Master Weavers & Heritage
        </h1>
        <p className="text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] font-light leading-relaxed">
          At Dhigaa Fashions, &ldquo;where every thread has a story&rdquo; is more than our tagline &mdash; it is our lifelong pact with the artisan weaver families of Tamil Nadu.
        </p>
      </div>

      {/* Feature Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury border border-[#B8924A]/30">
          <Image
            src="https://images.unsplash.com/photo-1610030469668-932454b66dfd?auto=format&fit=crop&w=1200&q=85"
            alt="Tamil Nadu Pit Loom Artisan"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            The 3-Shuttle Korvai Interlock
          </h2>
          <p>
            In traditional Kanchipuram weaving, joining the body of the saree to a contrasting pure zari border is a labor of intense devotion. Two weavers sit shoulder to shoulder across a wooden pit loom, timing their foot pedals with split-second coordination.
          </p>
          <p>
            Using three separate flying shuttles, they interweave the warp and weft to create the serrated &ldquo;mottu&rdquo; (temple spire) interlock. This ancient technique ensures that the border and body will never separate, creating an heirloom that survives generations.
          </p>
          <div className="pt-2 flex items-center gap-3 text-xs font-bold text-[#B8924A]">
            <Sparkles className="w-4 h-4" />
            <span>Over 45 Days of Handcrafting per Bridal Saree</span>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/25 space-y-3">
          <Award className="w-8 h-8 text-[#B8924A]" />
          <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Silk Mark Certified
          </h3>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
            Every pure silk saree carries the Government of India Silk Mark tag, guaranteeing 100% natural mulberry filament without synthetic adulteration.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/25 space-y-3">
          <HeartHandshake className="w-8 h-8 text-[#B8924A]" />
          <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Fair Artisan Compensation
          </h3>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
            We partner directly with cooperative loom clusters in Erode, Chettinad, and Kanchipuram, ensuring weavers receive dignified wages and healthcare.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/25 space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#B8924A]" />
          <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Tested 2G & 3G Gold Zari
          </h3>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
            Our bridal collections use certified silver threads electroplated with pure gold, maintaining brilliant luster through generations of celebrations.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs uppercase tracking-wider hover:bg-[#6A5446] transition-all shadow-md"
        >
          <span>Explore Weaver Creations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

