'use client';

import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Scissors, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('DHI-2026-9081');
  const [result, setResult] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    if (query.trim().toUpperCase() === 'DHI-2026-9081' || query.trim() === '4412') {
      setResult({
        id: 'DHI-2026-9081',
        customer: 'Priya Ramachandran',
        item: 'Aadya Royal Crimson Kanchipuram Silk Saree',
        deliveryType: 'Erode Same-Day Delivery Concierge',
        status: 'CONFIRMED',
        estimatedDelivery: 'Tomorrow by 2:00 PM',
        trackingNumber: 'DHI-EXP-ERD-4412',
        stages: [
          { name: 'Order Verified & Seeded', done: true, time: '11:20 AM' },
          { name: 'Pure Silk Mark Hallmark Audit', done: true, time: '11:45 AM' },
          { name: 'Master Blouse Tailoring', active: true, time: 'In Progress' },
          { name: 'Dispatched with Concierge', done: false, time: 'Pending' },
        ],
      });
    } else {
      setResult({
        id: query.trim().toUpperCase(),
        customer: 'Valued Patron',
        item: 'Handcrafted Heritage Creation',
        deliveryType: 'Insured Courier Express',
        status: 'IN TRANSIT',
        estimatedDelivery: '3 - 4 Business Days',
        trackingNumber: `EXP-${Math.floor(100000 + Math.random() * 900000)}`,
        stages: [
          { name: 'Order Received', done: true, time: 'Confirmed' },
          { name: 'Quality Inspection', done: true, time: 'Passed' },
          { name: 'Handed to Courier Partner', active: true, time: 'In Transit' },
          { name: 'Out for Delivery', done: false, time: 'Expected Soon' },
        ],
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Track Your Atelier Order
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8]">
          Enter your Dhigaa Order Number (e.g. DHI-2026-9081) or Courier Waybill to track real-time tailoring and dispatch progress.
        </p>
      </div>

      <form onSubmit={handleTrack} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. DHI-2026-9081)"
            className="w-full pl-10 pr-4 py-3 rounded-full border border-[#B8924A]/40 bg-white dark:bg-[#1E1714] text-xs font-mono uppercase text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] text-xs font-semibold hover:bg-[#6A5446] transition-colors"
        >
          Track
        </button>
      </form>

      {searched && result && (
        <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#B8924A]/20 gap-2">
            <div>
              <span className="font-mono text-sm font-bold text-[#B8924A]">{result.id}</span>
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                {result.item}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8] block">Tracking No:</span>
              <span className="font-mono text-xs font-bold text-white bg-[#2B211C] px-2 py-0.5 rounded">
                {result.trackingNumber}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            <div>
              <span className="font-bold text-[#2B211C] dark:text-[#F5EEE2] block">Delivery Method:</span>
              <span>{result.deliveryType}</span>
            </div>
            <div>
              <span className="font-bold text-[#2B211C] dark:text-[#F5EEE2] block">Estimated Arrival:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{result.estimatedDelivery}</span>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B8924A] mb-4">
              Real-Time Waypoint Progress
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {result.stages.map((st: any, idx: number) => (
                <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                      st.done
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : st.active
                        ? 'bg-[#B8924A] text-[#1B1512] border-[#B8924A] animate-pulse font-bold'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {st.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2B211C] dark:text-[#F5EEE2]">{st.name}</div>
                    <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]/80">{st.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

