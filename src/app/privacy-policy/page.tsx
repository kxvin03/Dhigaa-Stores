import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 text-xs sm:text-sm text-[#6A5446] dark:text-[#E8D5C8] leading-relaxed">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Privacy Policy
        </h1>
        <p className="text-xs">Last Updated: November 2026 &bull; Dhigaa Fashions Atelier, Erode</p>
      </div>

      <div className="p-8 rounded-3xl glass-card border border-[#B8924A]/30 space-y-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2] mb-2">1. Commitment to Patron Privacy</h2>
          <p>
            Dhigaa Fashions (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we look after your personal information when you visit our website (dhigaafashions.com) or interact with our concierge.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2] mb-2">2. Information We Collect</h2>
          <p>
            We collect personal identity data including name, shipping address, telephone number, WhatsApp contact, email address, custom tailoring body measurements, and transaction logs. We never collect or store card numbers or UPI PINs; all digital payments are securely processed by Razorpay.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2] mb-2">3. Use of Personal Information</h2>
          <p>
            Your information is used strictly to fulfill your orders, provide tailoring consultations, communicate delivery status via email or WhatsApp, and extend privilege loyalty rewards. We do not sell or rent patron data to any third-party marketing brokers.
          </p>
        </div>
      </div>
    </div>
  );
}

