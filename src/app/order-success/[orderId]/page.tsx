'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  FileText,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Scissors,
} from 'lucide-react';
import { formatINR } from '@/lib/currency';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  const { orderId } = useParams();

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B8924A', '#6A5446', '#D4AF37', '#E8D5C8'],
      });
    } catch {}
  }, []);

  const order = {
    id: String(orderId || 'DHI-2026-9081'),
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    customerName: 'Priya Ramachandran',
    phone: '+91 98840 98765',
    email: 'priya@example.com',
    status: 'CONFIRMED',
    deliveryType: 'ERODE_SAMEDAY',
    estimatedDelivery: 'Tomorrow by 2:00 PM via Dhigaa Express Concierge',
    address: '14, Perundurai Road, Maruti Nagar, Erode, Tamil Nadu 638011',
    items: [
      {
        name: 'Aadya Royal Crimson Kanchipuram Silk Saree',
        fabric: 'Pure Mulberry Silk • Pure Gold Tested Zari',
        price: 18500,
        quantity: 1,
        addOns: ['Custom Blouse Stitching (₹999)'],
      },
    ],
    subtotal: 18500,
    addOnsTotal: 999,
    taxGst: 925,
    shipping: 0,
    total: 19499,
    paymentMethod: 'RAZORPAY',
    paymentStatus: 'PAID',
    trackingNumber: 'DHI-EXP-ERD-4412',
  };

  const steps = [
    { label: 'Order Placed', time: 'Completed', done: true, icon: CheckCircle2 },
    { label: 'Payment Confirmed', time: 'Razorpay Verified', done: true, icon: CheckCircle2 },
    { label: 'Master Tailor & Stitching', time: 'In Progress', active: true, icon: Scissors },
    { label: 'Dispatched from Erode', time: 'Expected Today', done: false, icon: Truck },
    { label: 'Delivered', time: 'Tomorrow 2 PM', done: false, icon: Package },
  ];

  const handleDownloadInvoice = () => {
    // Pure canvas-based PDF without jspdf dependency issues
    const lines: string[] = [
      '================================================================',
      '             DHIGAA FASHIONS - TAX INVOICE',
      '     where every thread has a story',
      '     128 Nethaji Road, Erode, Tamil Nadu 638001',
      '     GSTIN: 33AAACD1234F1Z8  |  Ph: +91 9092806555',
      '================================================================',
      '',
      `Invoice No : ${order.id}`,
      `Date       : ${order.date}`,
      '',
      '--- Billed To ---',
      `Name       : ${order.customerName}`,
      `Address    : ${order.address}`,
      `Phone      : ${order.phone}`,
      `Payment    : ${order.paymentMethod} (PAID)`,
      '',
      '----------------------------------------------------------------',
      'Item Description                             Qty   Amount (INR)',
      '----------------------------------------------------------------',
      ...order.items.map(
        (item) =>
          `${item.name.substring(0, 44).padEnd(44)} ${String(item.quantity).padStart(3)}   ${('₹' + item.price.toLocaleString('en-IN')).padStart(12)}`
      ),
      '',
      '----------------------------------------------------------------',
      `${'Subtotal:'.padEnd(50)} ₹${order.subtotal.toLocaleString('en-IN')}`,
      `${'Bespoke Add-ons:'.padEnd(50)} ₹${order.addOnsTotal.toLocaleString('en-IN')}`,
      `${'GST (5%):'.padEnd(50)} ₹${order.taxGst.toLocaleString('en-IN')}`,
      `${'Erode Express Delivery:'.padEnd(50)} FREE`,
      '================================================================',
      `${'GRAND TOTAL PAID:'.padEnd(50)} ₹${order.total.toLocaleString('en-IN')}`,
      '================================================================',
      '',
      'Thank you for celebrating heritage with Dhigaa Fashions.',
      'Visit us: dhigaafashions.com | Instagram: @dhigaa_fashions',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dhigaa_Invoice_${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I placed order *${order.id}* for *${order.items[0].name}*. Please share live tailoring / dispatch status updates on WhatsApp.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Success Hero */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-luxury">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Payment Verified & Confirmed</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Thank You for Celebrating Heritage
        </h1>

        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8] max-w-lg mx-auto leading-relaxed">
          Your order <strong className="text-[#B8924A]">{order.id}</strong> has been received by our Erode master artisans. A confirmation email and tax invoice have been dispatched to {order.email}.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs hover:bg-[#6A5446] transition-all shadow"
          >
            <FileText className="w-4 h-4" />
            <span>Download GST Tax Invoice (PDF)</span>
          </button>

          <a
            href={`https://wa.me/919092806555?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20ba5a] transition-all shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Get WhatsApp Tracking Updates</span>
          </a>
        </div>
      </div>

      {/* Live Order Timeline */}
      <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
        <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2] flex items-center justify-between">
          <span>Live Fulfillment Timeline</span>
          <span className="text-xs font-mono text-[#B8924A] font-bold">Tracking: {order.trackingNumber}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                    s.done
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : s.active
                      ? 'bg-[#B8924A] text-[#1B1512] border-[#B8924A] animate-pulse'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2B211C] dark:text-[#F5EEE2]">{s.label}</div>
                  <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]/80">{s.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary & Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-3">
          <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#B8924A]" />
            <span>Delivery Destination</span>
          </h3>
          <div className="text-xs space-y-1 text-[#6A5446] dark:text-[#E8D5C8]">
            <p className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{order.customerName}</p>
            <p>{order.address}</p>
            <p>Phone: {order.phone}</p>
            <div className="pt-2 text-emerald-700 dark:text-emerald-400 font-semibold">
              {order.estimatedDelivery}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-3">
          <h3 className="font-serif text-base font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Total Paid
          </h3>
          <div className="space-y-1.5 text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            <div className="flex justify-between">
              <span>Item: {order.items[0].name}</span>
              <span>{formatINR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Custom Blouse Stitching</span>
              <span>{formatINR(order.addOnsTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>{formatINR(order.taxGst)}</span>
            </div>
            <div className="flex justify-between">
              <span>Erode Express Delivery</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
            <div className="pt-2 border-t border-[#B8924A]/20 flex justify-between font-bold text-sm text-[#2B211C] dark:text-[#F5EEE2]">
              <span>Grand Total</span>
              <span className="font-serif text-lg text-[#B8924A]">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B8924A] hover:underline"
        >
          <span>Continue Exploring Creations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

