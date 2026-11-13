'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl =
    'https://wa.me/919092806555?text=' +
    encodeURIComponent('Vanakkam Dhigaa Fashions! I would like to enquire about your handloom silk sarees and bespoke collections.');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="mb-2.5 hidden sm:flex items-center gap-2 bg-[#2B211C] text-[#F5EEE2] text-xs py-2 px-3.5 rounded-2xl shadow-luxury border border-[#B8924A]/40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-[#B8924A] shrink-0" />
          <span>Enquire with our Erode Stylist on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#E8D5C8]/60 hover:text-white ml-1 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Pill Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-luxury hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-gold-glow"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}

