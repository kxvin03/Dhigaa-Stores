'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Send, ShoppingCart, Sparkles, Check } from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function AdminMarketingPage() {
  const [coupons, setCoupons] = useState([
    { code: 'DHIGAA10', type: 'PERCENTAGE', value: 10, minOrder: 5000, maxDiscount: 2000, uses: 34 },
    { code: 'WELCOME500', type: 'FIXED', value: 500, minOrder: 3000, maxDiscount: 500, uses: 58 },
    { code: 'ERODE100', type: 'FIXED', value: 100, minOrder: 1000, maxDiscount: 100, uses: 19 },
    { code: 'BRIDAL2026', type: 'PERCENTAGE', value: 15, minOrder: 25000, maxDiscount: 5000, uses: 12 },
  ]);

  const [abandonedCarts, setAbandonedCarts] = useState([
    {
      id: 'CART-901',
      customer: 'Geetha M',
      phone: '+91 97890 12345',
      items: 'Maragatham Emerald Green Banarasi Brocade Saree',
      total: 14800,
      abandonedTime: '2 hours ago',
    },
    {
      id: 'CART-902',
      customer: 'Sujatha R',
      phone: '+91 98401 55443',
      items: 'Swarnam Mustard Traditional Chettinad Cotton Saree',
      total: 2450,
      abandonedTime: '5 hours ago',
    },
  ]);

  const [newCode, setNewCode] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newMin, setNewMin] = useState('3000');
  const [msg, setMsg] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setCoupons([
      ...coupons,
      {
        code: newCode.trim().toUpperCase(),
        type: 'PERCENTAGE',
        value: parseFloat(newValue) || 10,
        minOrder: parseFloat(newMin) || 3000,
        maxDiscount: 2000,
        uses: 0,
      },
    ]);
    setNewCode('');
    setNewValue('');
    setMsg('Coupon created successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleRecoverCart = (cart: any) => {
    const text = encodeURIComponent(
      `Vanakkam ${cart.customer}! You left your ${cart.items} in your Dhigaa shopping bag. Use code *WELCOME500* for ₹500 privilege savings: https://dhigaafashions.com/cart`
    );
    window.open(`https://wa.me/${cart.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#B8924A]" />
          <span>Marketing & Campaign Management</span>
        </h2>
        <p className="text-xs text-[#E8D5C8]/80 mt-1">
          Create promotional voucher codes, festival discounts and recover abandoned shopping bags.
        </p>
      </div>

      {msg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{msg}</span>
        </div>
      )}

      {/* Two columns: Coupons on left, Abandoned Carts on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Coupons */}
        <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
          <h3 className="font-serif text-base font-bold text-white flex items-center justify-between">
            <span>Privilege Coupons</span>
            <span className="text-xs text-[#B8924A]">{coupons.length} Active</span>
          </h3>

          <form onSubmit={handleAddCoupon} className="p-3 rounded-xl bg-[#140D0B] border border-[#B8924A]/20 flex flex-wrap gap-2">
            <input
              type="text"
              required
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="CODE (e.g. PONGAL20)"
              className="flex-1 min-w-[120px] px-3 py-1.5 rounded-lg bg-[#1E1714] border border-[#B8924A]/30 text-xs text-white uppercase focus:outline-none"
            />
            <input
              type="number"
              required
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="% Off"
              className="w-20 px-3 py-1.5 rounded-lg bg-[#1E1714] border border-[#B8924A]/30 text-xs text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-[#B8924A] text-[#1B1512] font-bold text-xs hover:bg-[#997334] transition-colors"
            >
              Add Coupon
            </button>
          </form>

          <div className="space-y-2">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-3 rounded-xl bg-[#140D0B] border border-[#B8924A]/20 flex items-center justify-between"
              >
                <div>
                  <span className="font-mono font-bold text-xs text-white bg-[#B8924A]/20 px-2 py-0.5 rounded border border-[#B8924A]/40">
                    {c.code}
                  </span>
                  <div className="text-[11px] text-[#E8D5C8]/70 mt-1">
                    {c.type === 'PERCENTAGE' ? `${c.value}% discount` : `₹${c.value} flat off`} on orders &gt; {formatINR(c.minOrder)}
                  </div>
                </div>
                <div className="text-right text-[10px] text-[#E8D5C8]/60">
                  <div>{c.uses} redemptions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abandoned Cart Recovery */}
        <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
          <h3 className="font-serif text-base font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#B8924A]" />
              <span>Abandoned Bag Recovery</span>
            </span>
            <span className="text-xs text-amber-400">{abandonedCarts.length} Pending</span>
          </h3>

          <div className="space-y-3">
            {abandonedCarts.map((cart) => (
              <div
                key={cart.id}
                className="p-3.5 rounded-xl bg-[#140D0B] border border-[#B8924A]/20 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-semibold text-white">{cart.customer}</h4>
                    <span className="text-[10px] text-[#B8924A]">{cart.phone}</span>
                  </div>
                  <span className="text-xs font-bold text-white">{formatINR(cart.total)}</span>
                </div>
                <div className="text-[11px] text-gray-400 truncate">{cart.items}</div>
                <div className="flex justify-between items-center pt-1 border-t border-gray-800">
                  <span className="text-[10px] text-[#E8D5C8]/50">{cart.abandonedTime}</span>
                  <button
                    onClick={() => handleRecoverCart(cart)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#25D366]/20 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send WhatsApp Recovery</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

