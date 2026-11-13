'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Truck, Phone } from 'lucide-react';

const announcements = [
  {
    icon: Truck,
    text: 'Complimentary Insured Shipping Across India on Orders Above ₹2,500',
    link: '/shop',
  },
  {
    icon: MapPin,
    text: 'Erode Patrons: Same-Day Doorstep Express & Store Pickup Available',
    link: '/visit-store',
  },
  {
    icon: Sparkles,
    text: 'The Royal Pongal & Wedding Muhurtham Silk Edit 2026 is Live',
    link: '/collections/sarees',
  },
  {
    icon: Phone,
    text: 'Bespoke Tailoring & Live WhatsApp Video Shopping: +91 9092806555',
    link: 'https://wa.me/919092806555',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  return (
    <aside aria-label="Boutique announcements" className="bg-[#2B211C] text-[#F5EEE2] text-xs py-2 px-4 border-b border-[#B8924A]/25 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-[#E8D5C8]/80 text-[11px] tracking-wider uppercase">
          <MapPin className="w-3.5 h-3.5 text-[#B8924A]" />
          <span>Erode Atelier &bull; Tamil Nadu</span>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link
            href={current.link}
            className="flex items-center gap-2 hover:text-[#B8924A] transition-colors duration-200 text-center font-medium"
          >
            <IconComponent className="w-3.5 h-3.5 text-[#B8924A] animate-pulse" />
            <span className="tracking-wide text-xs md:text-sm">{current.text}</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs">
          <Link
            href="/track-order"
            className="text-[#E8D5C8]/90 hover:text-[#B8924A] transition-colors"
          >
            Track Order
          </Link>
          <span className="text-[#B8924A]/40">|</span>
          <a
            href="tel:+919092806555"
            className="text-[#E8D5C8]/90 hover:text-[#B8924A] transition-colors flex items-center gap-1"
          >
            +91 9092806555
          </a>
        </div>
      </div>
    </aside>
  );
}

