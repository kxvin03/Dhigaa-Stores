'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Heart, Award, MapPin, Scissors, LogOut, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatINR } from '@/lib/currency';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<'orders' | 'measurements' | 'addresses'>('orders');

  const orders = [
    {
      id: 'DHI-2026-9081',
      date: '12 Nov 2026',
      total: 19499,
      status: 'STITCHING',
      item: 'Aadya Royal Crimson Kanchipuram Silk Saree',
      delivery: 'Erode Same-Day Delivery',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Patron Hero */}
      <div className="p-8 rounded-3xl glass-card border border-[#B8924A]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#B8924A]/20 border-2 border-[#B8924A] flex items-center justify-center text-[#B8924A]">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                {user?.name || 'Priya Ramachandran'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B8924A] text-[#1B1512]">
                {user?.loyaltyTier || 'GOLD'} PATRON
              </span>
            </div>
            <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-0.5">
              {user?.email || 'priya@example.com'} &bull; Erode, Tamil Nadu
            </p>
          </div>
        </div>

        {/* Loyalty Points Pill */}
        <div className="flex items-center gap-4 bg-white/60 dark:bg-[#1E1714] p-4 rounded-2xl border border-[#B8924A]/30">
          <Award className="w-8 h-8 text-[#B8924A]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6A5446] dark:text-[#E8D5C8]">
              Privilege Balance
            </div>
            <div className="font-serif text-2xl font-bold text-[#B8924A]">
              {user?.loyaltyPoints || 1250} Pts
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#B8924A]/20 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'orders' ? 'bg-[#B8924A] text-[#1B1512]' : 'text-[#6A5446] dark:text-[#E8D5C8]'
          }`}
        >
          My Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('measurements')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'measurements' ? 'bg-[#B8924A] text-[#1B1512]' : 'text-[#6A5446] dark:text-[#E8D5C8]'
          }`}
        >
          Saved Tailoring Measurements
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'addresses' ? 'bg-[#B8924A] text-[#1B1512]' : 'text-[#6A5446] dark:text-[#E8D5C8]'
          }`}
        >
          Delivery Addresses
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#B8924A]/20 gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#B8924A]">{o.id}</span>
                  <div className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">Placed on {o.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                    {formatINR(o.total)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-400 border border-amber-500/40">
                    {o.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#2B211C] dark:text-[#F5EEE2] font-semibold">
                {o.item}
              </div>

              <div className="flex justify-between items-center text-xs text-[#6A5446] dark:text-[#E8D5C8]">
                <span>{o.delivery}</span>
                <Link
                  href={`/order-success/${o.id}`}
                  className="text-[#B8924A] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View Timeline & Invoice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'measurements' && (
        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-3 text-xs">
          <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2] flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#B8924A]" />
            <span>Master Blouse Profile: Standard Festive Cut</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[#6A5446] dark:text-[#E8D5C8] pt-2">
            <div>Bust: <strong className="text-[#2B211C] dark:text-[#F5EEE2]">36&quot;</strong></div>
            <div>Waist: <strong className="text-[#2B211C] dark:text-[#F5EEE2]">30&quot;</strong></div>
            <div>Length: <strong className="text-[#2B211C] dark:text-[#F5EEE2]">14.5&quot;</strong></div>
            <div>Sleeve: <strong className="text-[#2B211C] dark:text-[#F5EEE2]">11.0&quot;</strong></div>
            <div>Front Neck: <strong className="text-[#2B211C] dark:text-[#F5EEE2]">6.5&quot;</strong></div>
            <div>Back Neck: <strong className="text-[#2B211C] dark:text-[#F5EEE2]">9.0&quot;</strong></div>
          </div>
          <div className="pt-3">
            <Link href="/custom-stitching" className="text-xs text-[#B8924A] font-semibold hover:underline">
              Update Tailoring Profile &rarr;
            </Link>
          </div>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B8924A]" />
              <span>Primary Residence (Erode)</span>
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              Default
            </span>
          </div>
          <p className="text-[#6A5446] dark:text-[#E8D5C8]">14, Perundurai Road, Near Collector Office, Maruti Nagar</p>
          <p className="text-[#6A5446] dark:text-[#E8D5C8]">Erode, Tamil Nadu &ndash; 638011</p>
          <p className="text-[#6A5446] dark:text-[#E8D5C8]">Phone: +91 98840 98765</p>
        </div>
      )}

      <div className="pt-6 border-t border-[#B8924A]/20 flex justify-between items-center">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Account</span>
        </button>
      </div>
    </div>
  );
}

