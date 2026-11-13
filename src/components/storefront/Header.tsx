'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  Scissors,
  Video,
  MapPin,
  ChevronDown,
  Moon,
  Sun,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import AnnouncementBar from './AnnouncementBar';

export default function Header() {
  const pathname = usePathname();
  const { totalItemsCount, openDrawer } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const { theme, toggleDarkMode } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll detection for glassmorphism elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not render consumer header if inside admin dashboard
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
    }
  };

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-luxury py-2'
            : 'bg-[#FAF7F2]/90 dark:bg-[#1B1512]/90 backdrop-blur-md py-3'
        } border-b border-[#B8924A]/20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-3 group text-center lg:text-left">
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full border border-[#B8924A]/40 p-0.5 bg-[#F5EEE2] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/logo.png"
                alt="Dhigaa Fashions Logo"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-wider text-[#2B211C] dark:text-[#F5EEE2] group-hover:text-[#B8924A] transition-colors">
                DHIGAA <span className="font-light italic text-[#B8924A]">Fashions</span>
              </span>
              <span className="text-[10px] md:text-[11px] tracking-widest text-[#6A5446] dark:text-[#E8D5C8] font-light -mt-1 hidden sm:block">
                where every thread has a story
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium tracking-wide">
            <Link
              href="/shop"
              className={`hover:text-[#B8924A] transition-colors ${
                pathname === '/shop' ? 'text-[#B8924A] font-semibold' : 'text-[#2B211C] dark:text-[#F5EEE2]'
              }`}
            >
              All Creations
            </Link>
            <Link
              href="/collections/sarees"
              className="text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors"
            >
              Sarees
            </Link>
            <Link
              href="/collections/bridal-wear"
              className="text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors flex items-center gap-1"
            >
              <span>Bridal Trousseau</span>
              <span className="text-[10px] bg-[#B8924A]/20 text-[#B8924A] px-1.5 py-0.5 rounded-full font-serif font-bold">
                Royal
              </span>
            </Link>
            <Link
              href="/collections/salwar-suits"
              className="text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors"
            >
              Salwars
            </Link>
            <Link
              href="/collections/kurtis"
              className="text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors"
            >
              Kurtis
            </Link>
            <Link
              href="/collections/kids-pattu-pavadai"
              className="text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors"
            >
              Pattu Pavadai
            </Link>

            {/* Bespoke Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className="flex items-center gap-1 text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors py-2"
                aria-expanded={servicesDropdown}
              >
                <span>Bespoke Atelier</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full -left-12 w-64 glass-card shadow-luxury rounded-xl p-3 border border-[#B8924A]/30 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/custom-stitching"
                      onClick={() => setServicesDropdown(false)}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#B8924A]/10 text-xs text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
                    >
                      <Scissors className="w-4 h-4 text-[#B8924A] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold">Custom Blouse Stitching</div>
                        <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]">
                          Precision measurements & master tailor crafting
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/bridal-booking"
                      onClick={() => setServicesDropdown(false)}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#B8924A]/10 text-xs text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#B8924A] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold">Bridal Consultation</div>
                        <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]">
                          Private styling appointment for brides & families
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/live-video-shopping"
                      onClick={() => setServicesDropdown(false)}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#B8924A]/10 text-xs text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
                    >
                      <Video className="w-4 h-4 text-[#B8924A] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold">Live Video Shopping</div>
                        <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]">
                          Inspect sarees live from Erode store via WhatsApp
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/home-trial"
                      onClick={() => setServicesDropdown(false)}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#B8924A]/10 text-xs text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#B8924A] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold">Doorstep Home Trial (Erode)</div>
                        <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]">
                          Try selections in the comfort of your home
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/visit-store"
              className="text-[#6A5446] dark:text-[#E8D5C8] hover:text-[#B8924A] transition-colors flex items-center gap-1 text-xs uppercase tracking-widest font-semibold"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Visit Erode</span>
            </Link>
          </nav>

          {/* Action Icons (Search, Dark Mode, Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#B8924A]/10 text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#B8924A]/10 text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
              aria-label="Toggle Theme"
            >
              {theme.isDarkMode ? <Sun className="w-4 h-4 text-[#B8924A]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#B8924A]/10 text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B8924A] text-white text-[10px] font-bold flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account / Admin Switch */}
            {user ? (
              <div className="relative group">
                <Link
                  href={user.role === 'ADMIN' ? '/admin' : '/account'}
                  className="flex items-center gap-1.5 py-1 px-2.5 rounded-full border border-[#B8924A]/30 text-xs font-medium text-[#2B211C] dark:text-[#F5EEE2] hover:border-[#B8924A] transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#B8924A]" />
                  <span className="hidden md:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  {user.role === 'ADMIN' && (
                    <span className="bg-[#6A5446] text-[#F5EEE2] text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">
                      Admin
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1 py-1.5 px-3 rounded-full border border-[#B8924A]/40 text-xs font-semibold text-[#2B211C] dark:text-[#F5EEE2] hover:bg-[#B8924A] hover:text-white transition-all duration-200"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={openDrawer}
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#2B211C] text-[#F5EEE2] hover:bg-[#6A5446] dark:bg-[#B8924A] dark:text-[#2B211C] transition-all shadow-md active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B8924A] text-white dark:bg-[#2B211C] dark:text-[#F5EEE2] text-xs font-bold flex items-center justify-center animate-bounce shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        {searchOpen && (
          <div className="border-t border-[#B8924A]/20 bg-[#FAF7F2] dark:bg-[#1B1512] py-3 px-4 shadow-inner animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pure silk sarees, Chettinad cotton, temple jewellery, bridal wear..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#B8924A]/40 bg-white/80 dark:bg-[#2B211C] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8924A]"
                  autoFocus
                />
              </form>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#6A5446] dark:text-[#E8D5C8] hover:text-[#2B211C] dark:hover:text-white"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-4/5 max-w-sm bg-[#FAF7F2] dark:bg-[#1B1512] h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-6 border-r border-[#B8924A]/30">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8924A]/20">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 relative rounded-full overflow-hidden border border-[#B8924A]">
                  <Image src="/assets/logo.png" alt="Dhigaa Logo" fill className="object-cover" />
                </div>
                <div className="font-serif font-bold text-lg text-[#2B211C] dark:text-[#F5EEE2]">
                  DHIGAA Fashions
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 py-6 text-sm font-medium">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#2B211C] dark:text-[#F5EEE2] border-b border-gray-100 dark:border-gray-800"
              >
                All Creations
              </Link>
              <Link
                href="/collections/sarees"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#2B211C] dark:text-[#F5EEE2] border-b border-gray-100 dark:border-gray-800"
              >
                Kanchipuram & Chettinad Sarees
              </Link>
              <Link
                href="/collections/bridal-wear"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#2B211C] dark:text-[#F5EEE2] border-b border-gray-100 dark:border-gray-800 flex justify-between items-center"
              >
                <span>Bridal Trousseau</span>
                <span className="text-[10px] bg-[#B8924A] text-white px-2 py-0.5 rounded-full">Heirloom</span>
              </Link>
              <Link
                href="/collections/salwar-suits"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#2B211C] dark:text-[#F5EEE2] border-b border-gray-100 dark:border-gray-800"
              >
                Salwar Sets & Anarkalis
              </Link>
              <Link
                href="/collections/kurtis"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#2B211C] dark:text-[#F5EEE2] border-b border-gray-100 dark:border-gray-800"
              >
                Kurtis & Tunics
              </Link>
              <Link
                href="/collections/kids-pattu-pavadai"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#2B211C] dark:text-[#F5EEE2] border-b border-gray-100 dark:border-gray-800"
              >
                Kids Pattu Pavadai
              </Link>

              <div className="pt-2 text-xs uppercase tracking-widest text-[#B8924A] font-semibold">
                Bespoke Services
              </div>
              <Link
                href="/custom-stitching"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 text-xs text-[#2B211C] dark:text-[#F5EEE2]"
              >
                <Scissors className="w-4 h-4 text-[#B8924A]" />
                <span>Custom Blouse Stitching</span>
              </Link>
              <Link
                href="/bridal-booking"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 text-xs text-[#2B211C] dark:text-[#F5EEE2]"
              >
                <Sparkles className="w-4 h-4 text-[#B8924A]" />
                <span>Book Bridal Consultation</span>
              </Link>
              <Link
                href="/live-video-shopping"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 text-xs text-[#2B211C] dark:text-[#F5EEE2]"
              >
                <Video className="w-4 h-4 text-[#B8924A]" />
                <span>Live Video Call Shopping</span>
              </Link>
              <Link
                href="/home-trial"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 text-xs text-[#2B211C] dark:text-[#F5EEE2]"
              >
                <MapPin className="w-4 h-4 text-[#B8924A]" />
                <span>Erode Doorstep Home Trial</span>
              </Link>
              <Link
                href="/visit-store"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 text-xs text-[#2B211C] dark:text-[#F5EEE2]"
              >
                <MapPin className="w-4 h-4 text-[#B8924A]" />
                <span>Visit Our Erode Atelier</span>
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-[#B8924A]/20 flex flex-col gap-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">Signed in as {user.name}</div>
                  <Link
                    href={user.role === 'ADMIN' ? '/admin' : '/account'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg bg-[#2B211C] text-white dark:bg-[#B8924A] dark:text-[#2B211C] text-xs font-semibold"
                  >
                    {user.role === 'ADMIN' ? 'Go to Admin Suite' : 'My Orders & Account'}
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-[#2B211C] text-white dark:bg-[#B8924A] dark:text-[#2B211C] text-xs font-semibold"
                >
                  Sign In / Create Account
                </Link>
              )}

              <a
                href="https://wa.me/919092806555"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-[#B8924A] text-[#B8924A] text-xs font-medium"
              >
                <span>WhatsApp: +91 9092806555</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

