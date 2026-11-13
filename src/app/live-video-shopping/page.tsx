'use client';

import React, { useState } from 'react';
import { Video, Sparkles, MessageCircle, Check, Phone } from 'lucide-react';

export default function LiveVideoShoppingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-20');
  const [time, setTime] = useState('11:00 AM');
  const [category, setCategory] = useState('Kanchipuram Silk Sarees');
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I would like to schedule a Live Video Call on WhatsApp to view ${category}. My name is ${name}, requested slot: ${date} at ${time}.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <Video className="w-3.5 h-3.5" />
          <span>Virtual Atelier Experience</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Live WhatsApp Video Shopping
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          Shop our flagship collection from anywhere in the world. Our personal stylist will walk through the store with you, draping sarees, zooming into zari borders, and answering questions in real time.
        </p>
      </div>

      {booked ? (
        <div className="p-8 rounded-3xl glass-card border border-[#B8924A] text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Video Call Scheduled!
          </h2>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            We will initiate the video session on {date} at {time} on WhatsApp ({phone}).
          </p>
          <a
            href={`https://wa.me/919092806555?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow hover:bg-[#20ba5a] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
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
                placeholder="e.g. Ananya Sridharan"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">WhatsApp Mobile Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 90928 06555"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Preferred Time</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              >
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">
                Creations to Feature on the Call
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              >
                <option value="Pure Kanchipuram Silk Sarees">Pure Kanchipuram Silk Sarees</option>
                <option value="Bridal Muhurtham Trousseau">Bridal Muhurtham Trousseau</option>
                <option value="Chettinad Handloom Cottons">Chettinad Handloom Cottons</option>
                <option value="Salwar Suits & Anarkalis">Salwar Suits & Anarkalis</option>
                <option value="Kids Pattu Pavadai">Kids Pattu Pavadai</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-gold-glow active:scale-95"
            >
              Confirm Live Video Shopping Appointment
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

