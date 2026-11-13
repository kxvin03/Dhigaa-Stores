'use client';

import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function VisitStorePage() {
  const address = 'Dhigaa Fashions Atelier, 128 Nethaji Road, Erode, Tamil Nadu 638001';
  const googleMapsUrl = 'https://maps.google.com/?q=Erode+Tamil+Nadu';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Flagship Boutique &bull; Erode</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Visit Our Erode Atelier
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          Step into our flagship haven in Erode, Tamil Nadu. Experience the luster of pure mulberry silk, feel the textured finesse of Chettinad weaves, and consult with our master stylists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Left (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
              Atelier Location & Hours
            </h3>

            <div className="space-y-4 text-xs text-[#6A5446] dark:text-[#E8D5C8]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2B211C] dark:text-[#F5EEE2] block text-sm">Physical Address:</strong>
                  <span>{address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2B211C] dark:text-[#F5EEE2] block text-sm">Boutique Timings:</strong>
                  <span>Monday &ndash; Sunday: 9:30 AM &ndash; 9:00 PM</span>
                  <span className="block text-[11px] text-[#B8924A] mt-0.5">Open all 7 days for wedding shoppers</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2B211C] dark:text-[#F5EEE2] block text-sm">Concierge Telephone:</strong>
                  <a href="tel:+919092806555" className="hover:text-[#B8924A] transition-colors">
                    +91 9092806555
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2B211C] dark:text-[#F5EEE2] block text-sm">Email:</strong>
                  <a href="mailto:dhigaafashions@gmail.com" className="hover:text-[#B8924A] transition-colors">
                    dhigaafashions@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#6A5446] transition-colors shadow"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions on Google Maps</span>
              </a>

              <Link
                href="/bridal-booking"
                className="w-full py-3 rounded-xl border border-[#B8924A] text-[#B8924A] hover:bg-[#B8924A]/10 font-semibold text-xs flex items-center justify-center gap-2 transition-colors text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Styling Appointment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Map Right (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl border border-[#B8924A]/40 h-[480px] bg-[#1E1714] relative">
          <iframe
            title="Dhigaa Fashions Erode Atelier Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62635.80789723233!2d77.6833979!3d11.3410364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f46762f46bd%3A0x6b8dd0e11894d076!2sErode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

