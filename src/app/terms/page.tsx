import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Terms of Service
        </h1>
        <p className="text-xs">Dhigaa Fashions Atelier, 128 Nethaji Road, Erode, Tamil Nadu 638001</p>
      </div>

      <div className="p-8 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2] mb-2">1. Authentic Handloom Craftsmanship</h2>
          <p>
            Due to the handcrafted artisanal nature of pure silk pit-loom weaving, slight variations in thread weave, selvedge texture, and natural color shade are inherent hallmarks of authentic Indian handlooms, not defects.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2] mb-2">2. Pricing, Taxes & Payment Verification</h2>
          <p>
            All listed prices on the storefront are denominated in Indian Rupees (INR) and are inclusive of 5% Goods and Services Tax (GST) as applicable on handloom silk garments. Orders placed online require payment authorization via Razorpay or approval of Cash on Delivery terms.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2] mb-2">3. Jurisdiction & Dispute Resolution</h2>
          <p>
            Any disputes arising in connection with orders or boutique services shall be subject to the exclusive jurisdiction of the competent courts in Erode, Tamil Nadu, India.
          </p>
        </div>
      </div>
    </div>
  );
}

