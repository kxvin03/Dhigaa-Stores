'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck, Scissors, Gift, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/currency';

const availableAddOns = [
  { id: '1', code: 'BLOUSE_STITCH', name: 'Custom Blouse Stitching', price: 999 },
  { id: '2', code: 'FALL_PICO', name: 'Fall & Pico Hemming', price: 150 },
  { id: '3', code: 'PETTICOAT', name: 'Matching Cotton Petticoat', price: 450 },
  { id: '4', code: 'GIFT_WRAP', name: 'Luxury Gift Packaging', price: 250 },
];

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    toggleAddOn,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    hasFreeShipping,
  } = useCart();

  if (!isDrawerOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping bag drawer"
          className="w-screen max-w-md bg-[#FAF7F2] dark:bg-[#1B1512] shadow-2xl flex flex-col border-l border-[#B8924A]/30 animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#B8924A]/20 flex items-center justify-between bg-[#F5EEE2] dark:bg-[#2B211C]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B8924A]" />
              <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#6A5446] dark:text-[#E8D5C8] transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#FAF7F2] dark:bg-[#231A16] border-b border-[#B8924A]/15">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 font-medium text-[#2B211C] dark:text-[#F5EEE2]">
                <Truck className="w-3.5 h-3.5 text-[#B8924A]" />
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
              <span className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E8D5C8] dark:bg-[#3C2F28] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B8924A] to-[#D4AF37] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5EEE2] dark:bg-[#2B211C] border border-[#B8924A]/40 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-[#B8924A]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] max-w-xs">
                  Discover our pure Kanchipuram silk sarees and handcrafted artisanal creations.
                </p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="px-6 py-2.5 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#2B211C] text-xs font-semibold hover:bg-[#6A5446] transition-colors"
                >
                  Explore Sarees
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const addOnsCost = item.selectedAddOns.reduce((s, a) => s + a.price, 0);
                const itemTotal = (item.price + addOnsCost) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white dark:bg-[#231A16] border border-[#B8924A]/25 shadow-sm space-y-3"
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-[#B8924A]/20 bg-[#F5EEE2]">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm font-semibold text-[#2B211C] dark:text-[#F5EEE2] line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {item.variantTitle && (
                            <p className="text-[11px] text-[#B8924A] font-medium mt-0.5">
                              {item.variantTitle}
                            </p>
                          )}
                          {item.fabric && (
                            <p className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]">
                              {item.fabric}
                            </p>
                          )}
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                            {formatINR(itemTotal)}
                          </div>

                          <div className="flex items-center border border-[#B8924A]/30 rounded-lg overflow-hidden bg-[#FAF7F2] dark:bg-[#1B1512]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-[#B8924A]/20 text-[#2B211C] dark:text-[#F5EEE2] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-[#2B211C] dark:text-[#F5EEE2]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={item.quantity >= item.stock}
                              className="p-1 hover:bg-[#B8924A]/20 text-[#2B211C] dark:text-[#F5EEE2] transition-colors disabled:opacity-40"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add-ons for Sarees */}
                    <div className="pt-2 border-t border-[#B8924A]/15">
                      <div className="text-[11px] font-semibold text-[#6A5446] dark:text-[#E8D5C8] mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#B8924A]" />
                        <span>Optional Finishing & Add-ons:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {availableAddOns.map((addon) => {
                          const isSelected = item.selectedAddOns.some((a) => a.code === addon.code);
                          return (
                            <button
                              key={addon.code}
                              onClick={() => toggleAddOn(item.id, addon)}
                              className={`text-[10px] text-left px-2 py-1.5 rounded-md border transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#B8924A]/15 border-[#B8924A] text-[#2B211C] dark:text-[#F5EEE2] font-semibold'
                                  : 'bg-[#FAF7F2] dark:bg-[#1B1512] border-gray-200 dark:border-gray-800 text-[#6A5446] dark:text-[#E8D5C8]'
                              }`}
                            >
                              <span className="truncate">{addon.name}</span>
                              <span className="shrink-0 ml-1 font-bold text-[#B8924A]">+{formatINR(addon.price)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#B8924A]/20 bg-[#F5EEE2] dark:bg-[#231A16] space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#6A5446] dark:text-[#E8D5C8]">Subtotal</span>
                <span className="font-serif font-bold text-lg text-[#2B211C] dark:text-[#F5EEE2]">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]">
                Taxes (GST) & express insured shipping calculated at checkout.
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full py-3 px-4 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#2B211C] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#6A5446] transition-all shadow-md active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="w-full py-2 text-center text-xs font-semibold text-[#6A5446] dark:text-[#E8D5C8] hover:text-[#B8924A] transition-colors"
                >
                  View Full Cart & Pincode Delivery Options
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

