'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Award, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function WeavingLoomStory() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Pure Mulberry Silk & 3-Ply Warp',
      desc: 'Sourced from the finest sericulture harvests in South India, each thread is degummed and hand-twisted into double-warp strength to resist tearing across generations.',
      tag: 'Step 1: Sericulture & Spindle',
    },
    {
      title: 'Tested Gold & Silver Zari',
      desc: 'Real silver wire electroplated with pure 24-karat gold wound around red and yellow silk cores. Tested with the highest hallmark certifications.',
      tag: 'Step 2: Zari Refining',
    },
    {
      title: 'Ancient 3-Shuttle Korvai Interlock',
      desc: 'Two master weavers sit side by side on a pit loom, intertwining the body and the contrast border with interlocking temple spikes (mottu) that will never unravel.',
      tag: 'Step 3: Pit Loom Artistry',
    },
    {
      title: 'Erode Atelier Finishing & Silk Mark Tagging',
      desc: 'Every completed saree is carefully steamed, hand-folded, and authenticated with the Silk Mark India hologram before reaching your wardrobe.',
      tag: 'Step 4: Quality & Certification',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2B211C] text-[#F5EEE2] relative overflow-hidden">
      {/* Background Motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8924A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Heritage Story</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">
            Where Every Thread Has a Story
          </h2>
          <p className="text-xs md:text-sm text-[#E8D5C8]/80 leading-relaxed font-light">
            Behind every Dhigaa creation is an enduring tradition of master handloom craftsmanship passed down through generations in Erode and Kanchipuram.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Loom Graphic */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#B8924A]/30 bg-[#1E1714]">
            <Image
              src="https://images.unsplash.com/photo-1610030469668-932454b66dfd?auto=format&fit=crop&w=1200&q=85"
              alt="Artisan Weaving Silk Loom"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#E8D5C8]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#B8924A]" />
                <span>Govt. Silk Mark Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#B8924A]" />
                <span>Fair-Wage Artisan Looms</span>
              </div>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="space-y-4">
            {steps.map((s, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={s.tag}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1E1714] border-[#B8924A] shadow-gold-glow'
                      : 'bg-[#1E1714]/40 border-[#B8924A]/15 hover:border-[#B8924A]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8924A]">
                      {s.tag}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-[#140D0B] text-[#B8924A] text-xs font-bold flex items-center justify-center border border-[#B8924A]/30">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-[#E8D5C8]/80 mt-1.5 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

