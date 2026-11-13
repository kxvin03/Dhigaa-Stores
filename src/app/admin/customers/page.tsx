'use client';

import React, { useState } from 'react';
import { Users, Search, Award, Heart, ShoppingBag, Phone, Mail } from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const [patrons, setPatrons] = useState([
    {
      id: '1',
      name: 'Priya Ramachandran',
      email: 'priya@example.com',
      phone: '+91 98840 98765',
      city: 'Erode, Tamil Nadu',
      tier: 'PLATINUM',
      points: 1250,
      totalSpend: 84500,
      ordersCount: 4,
      birthday: '18 Apr',
      anniversary: '24 Nov',
    },
    {
      id: '2',
      name: 'Ananya Sridharan',
      email: 'ananya.s@gmail.com',
      phone: '+91 98402 33445',
      city: 'Coimbatore, Tamil Nadu',
      tier: 'GOLD',
      points: 850,
      totalSpend: 42000,
      ordersCount: 2,
      birthday: '12 Sep',
      anniversary: '08 Feb',
    },
    {
      id: '3',
      name: 'Soundarya Vaitheeswaran',
      email: 'soundarya.v@gmail.com',
      phone: '+91 98402 11223',
      city: 'Chennai, Tamil Nadu',
      tier: 'SILVER',
      points: 300,
      totalSpend: 26500,
      ordersCount: 1,
      birthday: '03 Jan',
      anniversary: '-',
    },
  ]);

  const filtered = patrons.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[#B8924A]" />
          <span>Boutique Patrons & Loyalty Tiers</span>
        </h2>
        <p className="text-xs text-[#E8D5C8]/80 mt-1">
          Manage patron relationships, loyalty reward balances, and milestone celebrations.
        </p>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patron name, phone, email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#140D0B] border border-[#B8924A]/30 text-xs text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#140D0B] text-[#E8D5C8]/70 border-b border-[#B8924A]/20 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Patron</th>
                <th className="py-3.5 px-4">Loyalty Tier</th>
                <th className="py-3.5 px-4">Reward Points</th>
                <th className="py-3.5 px-4">Total Orders & Spend</th>
                <th className="py-3.5 px-4">Milestones</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8924A]/15 text-[#F5EEE2]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#251D19] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{p.name}</div>
                    <div className="text-[10px] text-[#B8924A]">{p.phone} &bull; {p.email}</div>
                    <div className="text-[10px] text-[#E8D5C8]/60">{p.city}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        p.tier === 'PLATINUM'
                          ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                          : p.tier === 'GOLD'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {p.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#B8924A]">
                    {p.points} Pts
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{formatINR(p.totalSpend)}</div>
                    <div className="text-[10px] text-[#E8D5C8]/60">{p.ordersCount} completed orders</div>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-[#E8D5C8]">
                    <div>B&apos;day: {p.birthday}</div>
                    <div>Anniv: {p.anniversary}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        const msg = encodeURIComponent(
                          `Vanakkam ${p.name}! We have credited 100 privilege loyalty points to your Dhigaa account. Explore our new Kanchipuram silk curations.`
                        );
                        window.open(`https://wa.me/${p.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
                      }}
                      className="px-3 py-1 rounded bg-[#25D366]/20 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition-colors"
                    >
                      WhatsApp
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

