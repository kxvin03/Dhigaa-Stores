'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Contact Our Atelier
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8]">
          Our client concierge is at your service 7 days a week from our flagship boutique in Erode, Tamil Nadu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Flagship Atelier
          </h2>

          <div className="space-y-4 text-xs text-[#6A5446] dark:text-[#E8D5C8]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2B211C] dark:text-[#F5EEE2] block text-sm">Location:</strong>
                <span>Dhigaa Fashions, 128 Nethaji Road, Erode, Tamil Nadu 638001</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2B211C] dark:text-[#F5EEE2] block text-sm">Direct Phone:</strong>
                <a href="tel:+919092806555" className="hover:text-[#B8924A]">
                  +91 9092806555
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2B211C] dark:text-[#F5EEE2] block text-sm">Email:</strong>
                <a href="mailto:dhigaafashions@gmail.com" className="hover:text-[#B8924A]">
                  dhigaafashions@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/919092806555"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-all shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-card border border-[#B8924A]/30">
          {sent ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">Message Dispatched</h3>
              <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
                Thank you, {name}. Our stylist team will respond to your inquiry promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-serif text-xl font-bold text-[#2B211C] dark:text-[#F5EEE2] mb-2">
                Send an Enquiry
              </h2>

              <div>
                <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Ramachandran"
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90928 06555"
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about saree weaves, custom stitching, bridal orders or store visits..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6A5446] transition-all shadow-md active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message to Atelier</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

