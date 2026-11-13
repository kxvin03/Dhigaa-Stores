'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Check, MessageCircle, MapPin } from 'lucide-react';

export default function BridalBookingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('2027-01-20');
  const [appointmentDate, setAppointmentDate] = useState('2026-11-25');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Dhigaa Fashions! I would like to book a VIP Bridal Consultation for my wedding on ${weddingDate}. Patron: ${name}, Appointment Date: ${appointmentDate} at ${timeSlot}.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Bridal Atelier</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          VIP Bridal Trousseau Consultation
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          Reserve private salon styling at our Erode boutique or through live video consultation. Explore pure Kanchipuram 3G gold zari muhurtham sarees, reception lehengas and family ensembles.
        </p>
      </div>

      {confirmed ? (
        <div className="p-8 rounded-3xl glass-card border border-[#B8924A] text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Consultation Confirmed!
          </h2>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            We look forward to hosting you on <strong>{appointmentDate} ({timeSlot})</strong>. Our head stylist will connect with you on WhatsApp ({phone}).
          </p>
          <a
            href={`https://wa.me/919092806555?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow hover:bg-[#20ba5a] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirm on WhatsApp Concierge</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Bride / Family Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Soundarya Vaitheeswaran"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">WhatsApp Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 90928 06555"
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Auspicious Wedding / Muhurtham Date</label>
              <input
                type="date"
                required
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Preferred Appointment Date</label>
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Preferred Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
              >
                <option value="10:30 AM - 12:30 PM">Morning Slot (10:30 AM - 12:30 PM)</option>
                <option value="02:30 PM - 04:30 PM">Afternoon Slot (02:30 PM - 04:30 PM)</option>
                <option value="05:30 PM - 07:30 PM">Evening Golden Hour Slot (05:30 PM - 07:30 PM)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">
                Trousseau Preferences / Color Palette Desired
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Traditional Mustard & Crimson Korvai Muhurtham silk, Reception velvet lehenga..."
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-gold-glow active:scale-95"
            >
              Reserve VIP Bridal Salon Consultation
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

