'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Save, Download, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('Dhigaa Fashions');
  const [phone, setPhone] = useState('+91 9092806555');
  const [whatsapp, setWhatsapp] = useState('919092806555');
  const [email, setEmail] = useState('dhigaafashions@gmail.com');
  const [address, setAddress] = useState('Dhigaa Fashions Atelier, 128 Nethaji Road, Erode, Tamil Nadu 638001');
  const [gstin, setGstin] = useState('33AAACD1234F1Z8');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('2500');
  const [erodeSameDay, setErodeSameDay] = useState(true);
  const [codActive, setCodActive] = useState(true);
  const [razorpayKeyId, setRazorpayKeyId] = useState('rzp_test_DhigaaBoutique123');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState('••••••••••••••••');
  const [isTestMode, setIsTestMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportAllData = () => {
    const backupData = {
      storeName,
      phone,
      whatsapp,
      email,
      address,
      gstin,
      freeShippingThreshold,
      erodeSameDay,
      codActive,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dhigaa_fashions_backup_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#B8924A]" />
            <span>Atelier Operational & Gateway Settings</span>
          </h2>
          <p className="text-xs text-[#E8D5C8]/80 mt-1">
            Configure Erode fulfillment policies, Razorpay checkout parameters and store credentials.
          </p>
        </div>

        <button
          onClick={handleExportAllData}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2B211C] border border-[#B8924A]/40 text-xs font-semibold text-[#E8D5C8] hover:bg-[#3C2F28] transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#B8924A]" />
          <span>Export All Data Backup</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Store settings successfully updated and committed!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Boutique Profile */}
        <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
          <h3 className="font-serif text-base font-bold text-white">Flagship Boutique Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#E8D5C8] font-semibold block mb-1">Boutique Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#E8D5C8] font-semibold block mb-1">Official GSTIN</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#E8D5C8] font-semibold block mb-1">Phone & Mobile</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#E8D5C8] font-semibold block mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[#E8D5C8] font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[#E8D5C8] font-semibold block mb-1">Flagship Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Rules */}
        <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
          <h3 className="font-serif text-base font-bold text-white">Shipping & Regional Rules</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#E8D5C8] font-semibold block mb-1">
                Free Insured Shipping Threshold (INR)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-[#E8D5C8]">
                <input
                  type="checkbox"
                  checked={erodeSameDay}
                  onChange={(e) => setErodeSameDay(e.target.checked)}
                  className="rounded border-gray-700 accent-[#B8924A]"
                />
                <span className="font-semibold">Enable Same-Day Delivery in Erode (638001 - 638115)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#E8D5C8] mt-2">
                <input
                  type="checkbox"
                  checked={codActive}
                  onChange={(e) => setCodActive(e.target.checked)}
                  className="rounded border-gray-700 accent-[#B8924A]"
                />
                <span className="font-semibold">Enable Cash on Delivery (COD) across India</span>
              </label>
            </div>
          </div>
        </div>

        {/* Razorpay Online Payment Settings */}
        <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B8924A]" />
              <span>Razorpay Online Payment Gateway</span>
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold">
              {isTestMode ? 'Test Mode Active' : 'Live Production'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#E8D5C8] font-semibold block mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={razorpayKeyId}
                onChange={(e) => setRazorpayKeyId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#E8D5C8] font-semibold block mb-1">Razorpay Key Secret</label>
              <input
                type="password"
                value={razorpayKeySecret}
                onChange={(e) => setRazorpayKeySecret(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#140D0B] border border-[#B8924A]/30 text-white font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B8924A] text-[#1B1512] font-bold text-xs hover:bg-[#997334] transition-colors shadow-gold-glow"
          >
            <Save className="w-4 h-4" />
            <span>Save All Atelier Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}

