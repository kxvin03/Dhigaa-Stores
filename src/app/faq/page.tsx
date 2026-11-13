'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I know the sarees are pure silk?',
      a: 'All our silk creations carry the official Silk Mark India certification issued by the Central Silk Board, Government of India. You can test a loose thread or inspect the Silk Mark QR code attached to each garment.',
    },
    {
      q: 'Do you offer same-day delivery in Erode?',
      a: 'Yes! For all PIN codes within Erode (638001 to 638115), orders placed before 1:00 PM are delivered the very same evening by our local boutique concierge.',
    },
    {
      q: 'How does custom blouse stitching work online?',
      a: 'You can submit your body measurements (bust, waist, sleeve length, neck depth) on our Custom Stitching page or during checkout. Our master tailor will review them and connect on WhatsApp if any adjustments are advised.',
    },
    {
      q: 'Can I inspect sarees on video call before buying?',
      a: 'Absolutely. We offer live WhatsApp video shopping where our stylist will showcase any saree, unfold the pallu, and demonstrate the zari reflection under natural studio lighting.',
    },
    {
      q: 'What payment methods are supported on Dhigaa?',
      a: 'We accept all major payment methods powered by Razorpay: UPI (Google Pay, PhonePe, Paytm, BHIM), Debit & Credit cards (Visa, MasterCard, RuPay), Netbanking, and Cash on Delivery (COD).',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Atelier Guidance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8]">
          Everything you need to know about our handloom silks, custom stitching, and boutique services.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card border border-[#B8924A]/25 cursor-pointer transition-all"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                  {f.q}
                </h3>
                <ChevronDown className={`w-4 h-4 text-[#B8924A] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </div>
              {isOpen && (
                <p className="text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] mt-3 leading-relaxed border-t border-[#B8924A]/15 pt-3">
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

