'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  ShieldCheck,
  Award,
  Sparkles,
  Truck,
  RotateCcw,
  Lock,
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#2B211C] text-[#F5EEE2] pt-16 pb-8 border-t border-[#B8924A]/30 relative overflow-hidden">
      {/* Subtle gold glow behind footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#B8924A]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#B8924A]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#B8924A]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Silk Mark Certified</h4>
              <p className="text-[11px] text-[#E8D5C8]/70">100% Pure Natural Mulberry Silk</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#B8924A]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Erode Same-Day</h4>
              <p className="text-[11px] text-[#E8D5C8]/70">Express local & pan-India courier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#B8924A]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Master Artisans</h4>
              <p className="text-[11px] text-[#E8D5C8]/70">Direct from Tamil Nadu looms</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#B8924A]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white">Secure Razorpay</h4>
              <p className="text-[11px] text-[#E8D5C8]/70">UPI, Cards, EMI & COD Available</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#B8924A]/20">
          {/* Brand Info & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#B8924A]/50 bg-[#F5EEE2]">
                <Image
                  src="/assets/logo.png"
                  alt="Dhigaa Fashions Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-wide text-white">
                  DHIGAA <span className="font-light italic text-[#B8924A]">Fashions</span>
                </h3>
                <p className="text-xs text-[#B8924A] font-serif italic tracking-wide">
                  where every thread has a story
                </p>
              </div>
            </div>

            <p className="text-xs text-[#E8D5C8]/80 leading-relaxed max-w-sm pt-1">
              Where grace meets grandeur. Handcrafted pure Kanchipuram silks, Chettinad cottons, and bespoke bridal couture rooted in the timeless artisan heritage of Tamil Nadu.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#E8D5C8]/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8924A] shrink-0 mt-0.5" />
                <span>Dhigaa Fashions Atelier, 128 Nethaji Road, Erode, Tamil Nadu 638001, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8924A] shrink-0" />
                <a href="tel:+919092806555" className="hover:text-[#B8924A] transition-colors">
                  +91 9092806555
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8924A] shrink-0" />
                <a href="mailto:dhigaafashions@gmail.com" className="hover:text-[#B8924A] transition-colors">
                  dhigaafashions@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-4">
              <a
                href="https://www.instagram.com/dhigaa_fashions/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3C2F28] border border-[#B8924A]/40 flex items-center justify-center text-[#B8924A] hover:bg-[#B8924A] hover:text-white transition-all shadow"
                aria-label="Dhigaa Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919092806555"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#3C2F28] border border-[#B8924A]/40 flex items-center justify-center text-[#B8924A] hover:bg-[#B8924A] hover:text-white transition-all shadow text-xs font-bold"
                aria-label="Dhigaa WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Couture Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B8924A]">Collections</h4>
            <ul className="space-y-2 text-xs text-[#E8D5C8]/80">
              <li>
                <Link href="/collections/sarees" className="hover:text-[#B8924A] transition-colors">
                  Kanchipuram Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/collections/sarees" className="hover:text-[#B8924A] transition-colors">
                  Chettinad Cotton Sarees
                </Link>
              </li>
              <li>
                <Link href="/collections/bridal-wear" className="hover:text-[#B8924A] transition-colors">
                  Bridal Muhurtham Trousseau
                </Link>
              </li>
              <li>
                <Link href="/collections/salwar-suits" className="hover:text-[#B8924A] transition-colors">
                  Chanderi Salwar Suits
                </Link>
              </li>
              <li>
                <Link href="/collections/kurtis" className="hover:text-[#B8924A] transition-colors">
                  Handloom Kurtis
                </Link>
              </li>
              <li>
                <Link href="/collections/kids-pattu-pavadai" className="hover:text-[#B8924A] transition-colors">
                  Kids Pattu Pavadai
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jewellery" className="hover:text-[#B8924A] transition-colors">
                  Temple Kemp Jewellery
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B8924A]">Bespoke Services</h4>
            <ul className="space-y-2 text-xs text-[#E8D5C8]/80">
              <li>
                <Link href="/custom-stitching" className="hover:text-[#B8924A] transition-colors">
                  Custom Blouse Stitching
                </Link>
              </li>
              <li>
                <Link href="/bridal-booking" className="hover:text-[#B8924A] transition-colors">
                  VIP Bridal Styling Consult
                </Link>
              </li>
              <li>
                <Link href="/live-video-shopping" className="hover:text-[#B8924A] transition-colors">
                  Live WhatsApp Video Shopping
                </Link>
              </li>
              <li>
                <Link href="/home-trial" className="hover:text-[#B8924A] transition-colors">
                  Doorstep Home Trial (Erode)
                </Link>
              </li>
              <li>
                <Link href="/visit-store" className="hover:text-[#B8924A] transition-colors">
                  Visit Flagship Atelier (Erode)
                </Link>
              </li>
              <li>
                <Link href="/gift-finder" className="hover:text-[#B8924A] transition-colors">
                  Luxury Gift Finder
                </Link>
              </li>
              <li>
                <Link href="/our-weavers" className="hover:text-[#B8924A] transition-colors">
                  Our Weaving Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Patrons & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B8924A]">Patrons & Care</h4>
            <ul className="space-y-2 text-xs text-[#E8D5C8]/80">
              <li>
                <Link href="/track-order" className="hover:text-[#B8924A] transition-colors">
                  Track Your Shipment
                </Link>
              </li>
              <li>
                <Link href="/shipping-and-returns" className="hover:text-[#B8924A] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#B8924A] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B8924A] transition-colors">
                  Contact Atelier
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#B8924A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#B8924A] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-white/40 hover:text-[#B8924A] transition-colors flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Boutique Admin Suite</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D5C8]/60 gap-4">
          <p>&copy; {new Date().getFullYear()} Dhigaa Fashions. All Rights Reserved. Crafted with pride in Erode, Tamil Nadu.</p>
          <div className="flex items-center space-x-4">
            <span className="text-[#B8924A]">GSTIN: 33AAACD1234F1Z8</span>
            <span>&bull;</span>
            <span>Silk Mark Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

