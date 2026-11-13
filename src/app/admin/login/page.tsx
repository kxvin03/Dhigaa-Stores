'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('dhigaafashions@gmail.com');
  const [password, setPassword] = useState('Dhigaa@2026');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setError(res.error || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#140D0B] flex flex-col items-center justify-center p-4 relative overflow-hidden text-[#F5EEE2]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B8924A]/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#1E1714] border border-[#B8924A]/40 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#B8924A] bg-[#F5EEE2] shadow-luxury p-1">
            <Image src="/assets/logo.png" alt="Dhigaa Logo" fill className="object-cover rounded-full" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-wide text-white">
            DHIGAA <span className="font-light italic text-[#B8924A]">Fashions</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#E8D5C8]/80">
            Executive Suite & Atelier Control
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dhigaafashions@gmail.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140D0B] border border-[#B8924A]/40 text-sm focus:outline-none focus:border-[#B8924A]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#E8D5C8] block mb-1.5">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140D0B] border border-[#B8924A]/40 text-sm focus:outline-none focus:border-[#B8924A]"
              />
            </div>
            <div className="flex justify-between items-center mt-1 text-[11px] text-[#B8924A]/90">
              <span>Default seed: Dhigaa@2026</span>
              <span>Requires change on first login</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-gold-glow active:scale-98"
          >
            <span>{submitting ? 'Verifying Atelier Credentials...' : 'Authenticate to Admin Suite'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#B8924A]/20 flex items-center justify-center gap-2 text-xs text-[#E8D5C8]/60">
          <ShieldCheck className="w-4 h-4 text-[#B8924A]" />
          <span>256-bit Encrypted Boutique Console &bull; Erode HQ</span>
        </div>
      </div>
    </div>
  );
}

