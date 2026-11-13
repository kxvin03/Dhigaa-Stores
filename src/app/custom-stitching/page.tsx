'use client';

import React, { useState } from 'react';
import { Scissors, Check, Sparkles, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function CustomStitchingPage() {
  const [garmentType, setGarmentType] = useState('BLOUSE');
  const [neckDesign, setNeckDesign] = useState('Boat Neck with Temple Cutwork');
  const [sleeveType, setSleeveType] = useState('Elbow Length Maggam Embroidery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bust, setBust] = useState('36');
  const [waist, setWaist] = useState('30');
  const [blouseLength, setBlouseLength] = useState('14.5');
  const [frontNeck, setFrontNeck] = useState('6.5');
  const [backNeck, setBackNeck] = useState('9.0');
  const [sleeveLength, setSleeveLength] = useState('11.0');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/stitching/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          garmentType,
          neckDesign,
          sleeveType,
          bust,
          waist,
          blouseLength,
          frontNeck,
          backNeck,
          sleeveLength,
          notes,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Vanakkam Master Tailor at Dhigaa Fashions! I would like assistance with my bespoke blouse measurements (${neckDesign}, ${sleeveType}). My name is ${customerName || 'a patron'}.`
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/40 text-xs font-semibold text-[#B8924A]">
          <Scissors className="w-3.5 h-3.5" />
          <span>Bespoke Atelier Tailoring</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Custom Blouse & Salwar Studio
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          Crafted by our master tailors in Erode. Every blouse is cut with premium interlining, reinforced hook plackets, and artisanal neck piping tailored precisely to your silhouette.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl glass-card border border-[#B8924A] text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Measurements Received!
          </h2>
          <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
            Our Master Artisan Meena Sundaram has received your measurements. We will connect with you on WhatsApp ({phone}) to confirm fitting details before commencing stitch work.
          </p>
          <a
            href={`https://wa.me/919092806555?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow hover:bg-[#20ba5a] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect with Master Tailor on WhatsApp</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Left (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Garment Type & Design */}
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                1. Garment & Neckline Styling
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">
                    Front & Back Neckline Style
                  </label>
                  <select
                    value={neckDesign}
                    onChange={(e) => setNeckDesign(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                  >
                    <option value="Boat Neck with Temple Cutwork">Boat Neck with Temple Cutwork</option>
                    <option value="Deep U-Neck with Zari Piping">Deep U-Neck with Zari Piping</option>
                    <option value="Potli Button High Mandarin Collar">Potli Button High Mandarin Collar</option>
                    <option value="Sweetheart Neckline with Maggam">Sweetheart Neckline with Maggam</option>
                    <option value="Keyhole Back with Dori Tassels">Keyhole Back with Dori Tassels</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">
                    Sleeve Architecture
                  </label>
                  <select
                    value={sleeveType}
                    onChange={(e) => setSleeveType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                  >
                    <option value="Elbow Length Maggam Embroidery (11-12 inches)">Elbow Length Maggam Embroidery (11-12&quot;)</option>
                    <option value="Traditional Puff Sleeve with Zari Border">Traditional Puff Sleeve with Zari Border</option>
                    <option value="Cap Sleeve (4-5 inches)">Cap Sleeve (4-5&quot;)</option>
                    <option value="Full Length Sheer Sleeve (20 inches)">Full Length Sheer Sleeve (20&quot;)</option>
                    <option value="Sleeveless with Wide Shoulder Strap">Sleeveless with Wide Shoulder Strap</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Anatomical Measurements */}
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                  2. Precision Body Measurements (Inches)
                </h3>
                <span className="text-[10px] text-[#B8924A] font-semibold">Standard Measuring Tape</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Bust / Chest (&quot;)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Under-Bust Waist (&quot;)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Blouse Length (&quot;)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={blouseLength}
                    onChange={(e) => setBlouseLength(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Front Neck Depth (&quot;)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={frontNeck}
                    onChange={(e) => setFrontNeck(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Back Neck Depth (&quot;)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={backNeck}
                    onChange={(e) => setBackNeck(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Sleeve Length (&quot;)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={sleeveLength}
                    onChange={(e) => setSleeveLength(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>
              </div>
            </div>

            {/* Patron Contact */}
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                3. Patron Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Priya Ramachandran"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
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
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">
                    Special Tailoring Notes / Padding / Cup Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Add soft cups, side zipper, include matching dori tassels"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Right (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                Bespoke Tailoring Estimate
              </h3>

              <div className="space-y-2 text-xs text-[#6A5446] dark:text-[#E8D5C8]">
                <div className="flex justify-between">
                  <span>Master Blouse Tailoring</span>
                  <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">₹999</span>
                </div>
                <div className="flex justify-between">
                  <span>Pure Cotton Inner Lining</span>
                  <span className="text-emerald-600 font-semibold">INCLUDED</span>
                </div>
                <div className="flex justify-between">
                  <span>Double Reinforced Seams</span>
                  <span className="text-emerald-600 font-semibold">INCLUDED</span>
                </div>
                <div className="flex justify-between">
                  <span>Turnaround Time</span>
                  <span className="font-semibold text-[#B8924A]">3 - 4 Days</span>
                </div>

                <div className="pt-3 border-t border-[#B8924A]/20 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-[#2B211C] dark:text-[#F5EEE2]">Total Estimate</span>
                  <span className="font-serif font-bold text-2xl text-[#2B211C] dark:text-[#F5EEE2]">
                    ₹999
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-gold-glow active:scale-95"
              >
                <span>{submitting ? 'Registering Measurements...' : 'Confirm & Assign Master Tailor'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 border-t border-[#B8924A]/15 text-center">
                <span className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8] block mb-2">
                  Need tailor assistance with measuring tape?
                </span>
                <a
                  href={`https://wa.me/919092806555?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Request Tailor Call / Video Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

