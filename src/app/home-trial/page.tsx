'use client';

import React, { useState } from 'react';
import { MapPin, Sparkles, Check, MessageCircle } from 'lucide-react';

export default function HomeTrialPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('638011');
  const [preferredDate, setPreferredDate] = useState('2026-11-22');
  const [sareePreferences, setSareePreferences] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I would like to book a Doorstep Home Trial in Erode. Name: ${name}, Address: ${address}, Pincode: ${pincode}, Preferences: ${sareePreferences}.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Exclusive to Erode District</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Doorstep Saree Home Trial
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          Experience our pure silk sarees in the comfort of your living room. Select up to 5 creations, and our stylist will bring them to your home in Erode for you and your family to preview before making a purchase.
        </p>
      </div>

      {confirmed ? (
        <div className="p-8 rounded-3xl glass-card border border-[#B8924A] text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Home Trial Booked!
          </h2>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            Our concierge will arrive at your residence on {preferredDate}. We will confirm timing on WhatsApp ({phone}).
          </p>
          <a
            href={`https://wa.me/919092806555?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow hover:bg-[#20ba5a] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kavitha Natarajan"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 90928 06555"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Residence Address in Erode</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Door No., Street, Colony, Landmark"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Erode PIN Code</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="638011"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Preferred Date</label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">
                Sarees & Colors You Wish to View
              </label>
              <textarea
                rows={3}
                value={sareePreferences}
                onChange={(e) => setSareePreferences(e.target.value)}
                placeholder="e.g. 3 Kanchipuram silks in Red, Mustard and Teal with pure gold zari borders"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-gold-glow active:scale-95"
            >
              Book Doorstep Home Trial
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

