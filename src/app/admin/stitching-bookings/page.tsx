'use client';

import React, { useState } from 'react';
import { Scissors, Sparkles, Video, MapPin, Calendar, Clock, Check, User } from 'lucide-react';

export default function AdminStitchingBookingsPage() {
  const [tab, setTab] = useState<'stitching' | 'bridal' | 'hometrial'>('stitching');

  const [stitchingOrders, setStitchingOrders] = useState([
    {
      id: 'STITCH-881',
      customer: 'Priya Ramachandran',
      phone: '+91 98840 98765',
      saree: 'Aadya Royal Crimson Kanchipuram Silk',
      design: 'Boat Neck with Temple Cutwork & Elbow Length Maggam',
      measurements: 'Bust: 36" | Waist: 30" | Length: 14.5" | Front Neck: 6.5" | Back Neck: 9"',
      tailor: 'Meena Sundaram (Master Artisan)',
      status: 'IN_PROGRESS',
    },
    {
      id: 'STITCH-880',
      customer: 'Soundarya V',
      phone: '+91 98402 11223',
      saree: 'Thangam Golden Ivory Bridal Silk',
      design: 'Bridal Heavily Embellished Zardozi Motif Back',
      measurements: 'Bust: 38" | Waist: 32" | Length: 15.0" | Front Neck: 7.0" | Back Neck: 10"',
      tailor: 'Meena Sundaram (Master Artisan)',
      status: 'MEASUREMENTS_CONFIRMED',
    },
  ]);

  const [bridalBookings, setBridalBookings] = useState([
    {
      id: 'BOOK-101',
      name: 'Dr. Keerthi Sundaram',
      phone: '+91 98941 22334',
      date: '2026-11-18',
      timeSlot: '03:00 PM - 04:30 PM',
      type: 'VIP In-Store Atelier Styling',
      notes: 'Muhurtham wedding on Jan 2027. Seeking pure 3G gold zari Kanchipuram silks.',
    },
    {
      id: 'BOOK-102',
      name: 'Rajeswari N',
      phone: '+91 94432 55667',
      date: '2026-11-19',
      timeSlot: '11:00 AM - 12:00 PM',
      type: 'Live WhatsApp Video Shopping',
      notes: 'Customer residing in Singapore, choosing wedding reception sarees.',
    },
  ]);

  const [homeTrials, setHomeTrials] = useState([
    {
      id: 'TRIAL-01',
      customer: 'Kavitha Natarajan',
      phone: '+91 98427 99001',
      address: 'Plot 12, Sampath Nagar, Erode 638011',
      date: 'Tomorrow, 04:00 PM',
      requestedStyles: '3 Pure Kanchipuram Silks (Crimson, Mustard, Teal) for family preview',
      status: 'DISPATCH_SCHEDULED',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
          <Scissors className="w-5 h-5 text-[#B8924A]" />
          <span>Bespoke Tailoring & Patron Appointments</span>
        </h2>
        <p className="text-xs text-[#E8D5C8]/80 mt-1">
          Manage custom blouse stitching measurements, master tailor allocations, bridal appointments and Erode home trials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#B8924A]/20 pb-2">
        <button
          onClick={() => setTab('stitching')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            tab === 'stitching' ? 'bg-[#B8924A] text-[#1B1512]' : 'text-[#E8D5C8]/80 hover:text-white'
          }`}
        >
          Custom Stitching ({stitchingOrders.length})
        </button>
        <button
          onClick={() => setTab('bridal')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            tab === 'bridal' ? 'bg-[#B8924A] text-[#1B1512]' : 'text-[#E8D5C8]/80 hover:text-white'
          }`}
        >
          Bridal & Video Appointments ({bridalBookings.length})
        </button>
        <button
          onClick={() => setTab('hometrial')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            tab === 'hometrial' ? 'bg-[#B8924A] text-[#1B1512]' : 'text-[#E8D5C8]/80 hover:text-white'
          }`}
        >
          Erode Doorstep Home Trials ({homeTrials.length})
        </button>
      </div>

      {/* Stitching Tab */}
      {tab === 'stitching' && (
        <div className="space-y-4">
          {stitchingOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-2xl bg-[#1E1714] border border-[#B8924A]/30 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#B8924A]/15 pb-2">
                <div>
                  <div className="font-mono text-xs font-bold text-white">{order.id}</div>
                  <div className="text-xs font-semibold text-[#B8924A]">{order.customer} &bull; {order.phone}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#E8D5C8]/70">Assigned Tailor:</span>
                  <span className="text-xs font-bold text-white bg-[#140D0B] px-2.5 py-1 rounded border border-[#B8924A]/30">
                    {order.tailor}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#E8D5C8]/70 font-medium">Garment & Design Style:</div>
                  <div className="text-white font-semibold mt-0.5">{order.design}</div>
                  <div className="text-[11px] text-[#B8924A] mt-1">{order.saree}</div>
                </div>
                <div>
                  <div className="text-[#E8D5C8]/70 font-medium">Recorded Anatomical Measurements:</div>
                  <div className="text-[#F5EEE2] bg-[#140D0B] p-2 rounded-lg border border-[#B8924A]/20 font-mono text-[11px] mt-0.5">
                    {order.measurements}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#B8924A]/15">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/40">
                  {order.status}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Vanakkam ${order.customer}! Your bespoke blouse stitching for ${order.saree} is progressing beautifully at Dhigaa Atelier.`
                      );
                      window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
                    }}
                    className="px-3 py-1 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold"
                  >
                    WhatsApp Patron
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#B8924A] text-[#1B1512] text-xs font-semibold">
                    Mark Ready
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bridal Tab */}
      {tab === 'bridal' && (
        <div className="space-y-4">
          {bridalBookings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-[#1E1714] border border-[#B8924A]/30 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-base font-bold text-white">{b.name}</h4>
                  <div className="text-xs text-[#B8924A] font-medium">{b.phone}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40">
                  {b.type}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#E8D5C8]/80">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B8924A]" />
                  <span>{b.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B8924A]" />
                  <span>{b.timeSlot}</span>
                </div>
              </div>

              <div className="text-xs text-[#E8D5C8] bg-[#140D0B] p-2.5 rounded-xl border border-[#B8924A]/20">
                {b.notes}
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Vanakkam ${b.name}! We look forward to hosting your ${b.type} on ${b.date} at ${b.timeSlot}. Dhigaa Fashions Atelier, Erode.`
                    );
                    window.open(`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold"
                >
                  Confirm on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Home Trial Tab */}
      {tab === 'hometrial' && (
        <div className="space-y-4">
          {homeTrials.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-[#1E1714] border border-[#B8924A]/30 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-base font-bold text-white">{t.customer}</h4>
                  <div className="text-xs text-[#B8924A]">{t.phone}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                  {t.status}
                </span>
              </div>

              <div className="flex items-start gap-2 text-xs text-[#E8D5C8]">
                <MapPin className="w-4 h-4 text-[#B8924A] shrink-0 mt-0.5" />
                <span>{t.address}</span>
              </div>

              <div className="text-xs text-[#E8D5C8] bg-[#140D0B] p-2.5 rounded-xl border border-[#B8924A]/20">
                <strong>Selection requested:</strong> {t.requestedStyles}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

