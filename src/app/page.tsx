'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Scissors,
  Video,
  MapPin,
  Heart,
  Star,
  Instagram,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react';
import SilkClothHero from '@/components/3d/SilkClothHero';
import SareeColorVisualizer from '@/components/3d/SareeColorVisualizer';
import WeavingLoomStory from '@/components/3d/WeavingLoomStory';
import ProductCard from '@/components/storefront/ProductCard';
import QuickViewModal from '@/components/storefront/QuickViewModal';
import { formatINR } from '@/lib/currency';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);

  const budgetTiers = [
    {
      title: 'Everyday Handloom Luxury',
      subtitle: 'Chettinad Cottons & Daily Silks',
      priceText: 'Under ₹2,500',
      link: '/shop?maxPrice=2500',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Festive & Family Celebrations',
      subtitle: 'Soft Silks, Tussar & Banarasi',
      priceText: '₹2,500 - ₹8,000',
      link: '/shop?minPrice=2500&maxPrice=8000',
      image: 'https://images.unsplash.com/photo-1596783074418-c41ab81142bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Royal Bridal Muhurtham Silks',
      subtitle: 'Pure Kanchipuram Gold Zari',
      priceText: 'Premium ₹12,000+',
      link: '/shop?category=bridal-wear',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const festivalCollections = [
    { name: 'Pongal & Sankranti Edit', tag: 'Traditional Silks & Pavadai', count: '18 Creations', link: '/collections/sarees' },
    { name: 'Tamil New Year & Chithirai', tag: 'Vibrant Temple Borders', count: '14 Creations', link: '/collections/sarees' },
    { name: 'Bridal Muhurtham Trousseau', tag: 'Pure 3G Tested Gold Zari', count: '12 Creations', link: '/collections/bridal-wear' },
    { name: 'Aadi & Varalakshmi Vratham', tag: 'Auspicious Red & Yellow Silks', count: '16 Creations', link: '/collections/sarees' },
  ];

  const testimonials = [
    {
      name: 'Dr. Keerthi Sundaram',
      location: 'Coimbatore, Tamil Nadu',
      rating: 5,
      comment: 'Dhigaa Fashions made my wedding day unforgettable. The Kanchipuram silk saree has a pure heavy gold zari drape that caught every light in the mandapam. The custom blouse stitching was flawless!',
    },
    {
      name: 'Rajeswari Natarajan',
      location: 'Erode, Tamil Nadu',
      rating: 5,
      comment: 'Ordered through their Erode doorstep trial service. Two master consultants brought 5 sarees to our home so my grandmother could touch and feel the weave. Outstanding bespoke luxury!',
    },
    {
      name: 'Priya Ramachandran',
      location: 'Chennai, Tamil Nadu',
      rating: 5,
      comment: 'Their WhatsApp video shopping is seamless. We inspected the korvai border and pallu live from the Erode store before ordering. Express courier arrived in 24 hours!',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section with 3D Silk Shader Canvas */}
      <section className="relative overflow-hidden">
        <SilkClothHero />

        {/* Hero Editorial Overlay Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/80 dark:bg-[#2B211C]/80 backdrop-blur-md border border-[#B8924A]/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B8924A]" />
              <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">
                Erode Flagship Atelier &bull; Handcrafted Looms
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B211C] dark:text-[#F5EEE2] drop-shadow-sm leading-tight">
              Where Grace <br />
              <span className="font-light italic text-[#B8924A]">Meets Grandeur</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6A5446] dark:text-[#E8D5C8] max-w-xl mx-auto leading-relaxed font-light">
              Where every thread has a story. Handwoven pure Kanchipuram silks, Chettinad cottons and bespoke bridal couture directly from the legendary weavers of Tamil Nadu.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="px-8 py-3.5 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-[#F5EEE2] dark:text-[#1B1512] font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-[#6A5446] hover:scale-105 active:scale-95 transition-all shadow-luxury"
              >
                <span>Explore Creations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/bridal-booking"
                className="px-7 py-3.5 rounded-full bg-white/80 dark:bg-[#2B211C]/80 backdrop-blur-md text-[#2B211C] dark:text-[#F5EEE2] border border-[#B8924A]/40 font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                <span>Book Bridal Consult</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Festival Curations Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {festivalCollections.map((col, idx) => (
            <Link
              key={idx}
              href={col.link}
              className="p-5 rounded-2xl glass-card border border-[#B8924A]/25 hover:border-[#B8924A]/70 group transition-all"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8924A] block mb-1">
                {col.tag}
              </span>
              <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2] group-hover:text-[#B8924A] transition-colors">
                {col.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-3 pt-2 border-t border-[#B8924A]/15">
                <span>{col.count}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B8924A] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Shop by Budget Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">Curated by Occasion</span>
          <h2 className="font-serif text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">Shop by Budget</h2>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            Discover heirloom elegance thoughtfully priced for every celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {budgetTiers.map((tier, idx) => (
            <Link
              key={idx}
              href={tier.link}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border border-[#B8924A]/30 flex flex-col justify-end p-6"
            >
              <Image
                src={tier.image}
                alt={tier.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-1.5 text-white">
                <span className="text-xs font-bold text-[#B8924A] uppercase tracking-wider">
                  {tier.priceText}
                </span>
                <h3 className="font-serif text-xl font-bold">{tier.title}</h3>
                <p className="text-xs text-[#E8D5C8]/80 font-light">{tier.subtitle}</p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#B8924A]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers & New Loom Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">Heirloom Icons</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
              Best Selling Creations
            </h2>
            <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-1">
              Cherished sarees woven in pure Kanchipuram mulberry silk & Chettinad combed cotton.
            </p>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B8924A] hover:underline"
          >
            <span>View All Creations ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. 3D Real-time Saree Fabric & Zari Visualizer */}
      <SareeColorVisualizer />

      {/* 6. Heritage Weaving Loom Storytelling */}
      <WeavingLoomStory />

      {/* 7. Bespoke Services Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">Atelier Concierge</span>
          <h2 className="font-serif text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Bespoke Services
          </h2>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            Experience tailored luxury whether visiting our Erode flagship or shopping from home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/custom-stitching"
            className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 flex flex-col justify-between space-y-4 group hover:border-[#B8924A] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center text-[#B8924A] group-hover:scale-110 transition-transform">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                Custom Blouse Stitching
              </h3>
              <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-1.5 leading-relaxed font-light">
                Submit precision measurements online. Our master tailor crafts Maggam, boat neck, and potli designs.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#B8924A] flex items-center gap-1">
              <span>Start Tailoring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/bridal-booking"
            className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 flex flex-col justify-between space-y-4 group hover:border-[#B8924A] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center text-[#B8924A] group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                VIP Bridal Consultation
              </h3>
              <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-1.5 leading-relaxed font-light">
                Reserve a private salon appointment at our Erode flagship with our chief couture stylist.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#B8924A] flex items-center gap-1">
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/live-video-shopping"
            className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 flex flex-col justify-between space-y-4 group hover:border-[#B8924A] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center text-[#B8924A] group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                Live Video Shopping
              </h3>
              <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-1.5 leading-relaxed font-light">
                Connect via WhatsApp video call. View real silk drapes, pallus, and textures live from our atelier.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#B8924A] flex items-center gap-1">
              <span>Schedule Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/home-trial"
            className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 flex flex-col justify-between space-y-4 group hover:border-[#B8924A] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#B8924A]/15 border border-[#B8924A]/40 flex items-center justify-center text-[#B8924A] group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                Doorstep Home Trial (Erode)
              </h3>
              <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-1.5 leading-relaxed font-light">
                Erode patrons can book up to 5 sarees brought to their residence with a styling assistant.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#B8924A] flex items-center gap-1">
              <span>Book Home Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 8. Patron Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">Patron Love</span>
          <h2 className="font-serif text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Words from Our Discerning Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card border border-[#B8924A]/25 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-[#B8924A]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B8924A]" />
                  ))}
                </div>
                <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed italic font-serif">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#B8924A]/15">
                <h4 className="font-serif text-sm font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                  {t.name}
                </h4>
                <p className="text-[11px] text-[#B8924A]">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Instagram Feed & Follow Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">
              Follow Our Atelier
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
              @dhigaa_fashions on Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/dhigaa_fashions/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B8924A] text-[#B8924A] text-xs font-semibold hover:bg-[#B8924A] hover:text-white transition-all w-fit"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
          ].map((url, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/dhigaa_fashions/"
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-[#B8924A]/20"
            >
              <Image
                src={url}
                alt="Dhigaa Saree Instagram"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

