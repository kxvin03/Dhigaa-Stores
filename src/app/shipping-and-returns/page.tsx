'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function ShippingAndReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Shipping, Delivery & Returns
        </h1>
        <p className="text-xs md:text-sm text-[#6A5446] dark:text-[#E8D5C8]">
          Transparent, insured, and concierge-level fulfillment directly from our Erode flagship.
        </p>
      </div>

      {/* Shipping Section */}
      <div className="p-8 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#B8924A]/20">
          <Truck className="w-6 h-6 text-[#B8924A]" />
          <h2 className="font-serif text-xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            Insured Shipping Policies
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          <div className="p-4 rounded-2xl bg-[#B8924A]/10 border border-[#B8924A]/30 space-y-1">
            <h3 className="font-bold text-[#2B211C] dark:text-[#F5EEE2] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B8924A]" />
              <span>Erode District Express (Same-Day / Next-Day)</span>
            </h3>
            <p className="text-xs">
              Orders placed before 1:00 PM for PIN codes 638001 through 638115 are delivered on the same day by our dedicated boutique concierge in signature rigid gift packaging.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#2B211C] dark:text-[#F5EEE2] text-sm">Pan-India Express Air Shipping</h3>
            <p className="mt-1">
              Dispatched via premium insured courier partners (Bluedart, DTDC Express). Typical delivery timeframe is 3 to 5 business days across major Indian metros and towns.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#2B211C] dark:text-[#F5EEE2] text-sm">Complimentary Shipping Threshold</h3>
            <p className="mt-1">
              All orders with a subtotal above ₹2,500 qualify for 100% complimentary insured shipping. For orders below ₹2,500, a nominal standard flat rate of ₹150 applies.
            </p>
          </div>
        </div>
      </div>

      {/* Returns Section */}
      <div className="p-8 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#B8924A]/20">
          <RotateCcw className="w-6 h-6 text-[#B8924A]" />
          <h2 className="font-serif text-xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
            7-Day Exchange & Return Guarantee
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
          <p>
            We take immense pride in the heirloom quality of every saree. If for any reason your selected drape does not meet your expectations, we offer a hassle-free 7-day exchange window from the date of delivery.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>The saree must remain unwashed, unpleated and unworn with original Silk Mark tags intact.</li>
            <li>Custom stitched blouses and customized saree alterations are tailored specifically to your measurements and cannot be returned unless a manufacturing defect exists.</li>
            <li>To initiate an exchange, simply ping our concierge on WhatsApp at <strong>+91 9092806555</strong> with your Order ID.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

