'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
  Tag,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/currency';
import { isErodePincode } from '@/lib/utils';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    toggleAddOn,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    hasFreeShipping,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState('');
  const [pincode, setPincode] = useState('638001');

  const isErode = isErodePincode(pincode);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponMessage('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, cartAmount: subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setDiscount(data.discount);
        setCouponMessage(data.message);
      } else {
        setDiscount(0);
        setCouponError(data.error || 'Invalid coupon code');
      }
    } catch {
      setCouponError('Failed to validate coupon');
    }
  };

  const shippingCost = hasFreeShipping ? 0 : 150;
  const taxableAmount = Math.max(0, subtotal - discount);
  const taxGst = Math.round(taxableAmount * 0.05); // 5% GST
  const grandTotal = taxableAmount + taxGst + shippingCost;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F5EEE2] dark:bg-[#1E1714] border border-[#B8924A]/40 flex items-center justify-center mx-auto text-[#B8924A]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] max-w-sm mx-auto">
          Explore our handcrafted pure Kanchipuram silk sarees and Chettinad handlooms.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] text-xs font-semibold uppercase tracking-wider hover:bg-[#6A5446] transition-all shadow-md"
        >
          <span>Explore Boutique Creations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
        </h1>
        <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] mt-1">
          Review your chosen sarees, add bespoke custom stitching, and select express delivery.
        </p>
      </div>

      {/* Free Shipping Strip */}
      <div className="p-4 rounded-2xl bg-[#F5EEE2] dark:bg-[#1E1714] border border-[#B8924A]/25 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#2B211C] dark:text-[#F5EEE2] font-medium">
          <Truck className="w-4 h-4 text-[#B8924A]" />
          {hasFreeShipping ? (
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              You unlocked Complimentary Insured Shipping!
            </span>
          ) : (
            <span>
              Add <strong className="text-[#B8924A]">{formatINR(freeShippingRemaining)}</strong> more for Free Shipping
            </span>
          )}
        </div>
        <span className="text-[11px] text-[#B8924A] font-bold">
          Threshold: {formatINR(freeShippingThreshold)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const addOnsCost = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
            const lineTotal = (item.price + addOnsCost) * item.quantity;

            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-32 rounded-2xl overflow-hidden shrink-0 border border-[#B8924A]/30 bg-[#F5EEE2]">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2] hover:text-[#B8924A] transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.variantTitle && (
                        <p className="text-xs text-[#B8924A] font-medium mt-0.5">
                          {item.variantTitle}
                        </p>
                      )}
                      {item.fabric && (
                        <p className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]">
                          {item.fabric}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="font-bold text-base text-[#2B211C] dark:text-[#F5EEE2]">
                        {formatINR(lineTotal)}
                      </div>

                      <div className="flex items-center border border-[#B8924A]/40 rounded-xl overflow-hidden bg-white dark:bg-[#1E1714]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1.5 hover:bg-[#B8924A]/20 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="px-3 py-1.5 hover:bg-[#B8924A]/20 transition-colors disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Add-ons Display */}
                {item.selectedAddOns.length > 0 && (
                  <div className="pt-3 border-t border-[#B8924A]/20 text-xs">
                    <span className="font-semibold text-[#6A5446] dark:text-[#E8D5C8]">
                      Included Bespoke Add-ons:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {item.selectedAddOns.map((a) => (
                        <span
                          key={a.code}
                          className="px-2.5 py-1 rounded-lg bg-[#B8924A]/15 border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] text-[11px] font-medium"
                        >
                          {a.name} (+{formatINR(a.price)})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Order Summary & Checkout (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Code Input */}
          <div className="p-5 rounded-3xl glass-card border border-[#B8924A]/30 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B8924A] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Privilege Coupon Code</span>
            </h3>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="e.g. DHIGAA10, WELCOME500"
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-xs font-mono uppercase text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs hover:bg-[#6A5446] transition-colors"
              >
                Apply
              </button>
            </form>

            {couponMessage && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {couponMessage}
              </p>
            )}
            {couponError && (
              <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">
                {couponError}
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#6A5446] dark:text-[#E8D5C8]">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{formatINR(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Privilege Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#6A5446] dark:text-[#E8D5C8]">
                <span>Estimated 5% GST</span>
                <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{formatINR(taxGst)}</span>
              </div>

              <div className="flex justify-between text-[#6A5446] dark:text-[#E8D5C8]">
                <span>Insured Express Delivery</span>
                <span>{hasFreeShipping ? <span className="text-emerald-600 font-semibold">FREE</span> : formatINR(150)}</span>
              </div>

              {isErode && (
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-[11px] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Erode District: Same-Day Delivery Qualified</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#B8924A]/20 flex justify-between items-baseline text-sm">
                <span className="font-bold text-[#2B211C] dark:text-[#F5EEE2]">Total Payable</span>
                <span className="font-serif font-bold text-2xl text-[#2B211C] dark:text-[#F5EEE2]">
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-gold-glow active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#6A5446] dark:text-[#E8D5C8]/80 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Razorpay 256-bit Encrypted Checkout &bull; UPI, Cards, Netbanking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

