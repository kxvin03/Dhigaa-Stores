'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('priya@example.com');
  const [password, setPassword] = useState('Customer@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        if (res.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/account');
        }
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-3">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#B8924A] bg-[#F5EEE2] mx-auto p-1 shadow">
          <Image src="/assets/logo.png" alt="Dhigaa Logo" fill className="object-cover" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">
          Sign In to Dhigaa
        </h1>
        <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
          Access your privilege loyalty rewards, saved drapes and order tracking.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-900/40 border border-red-500/50 text-xs text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#6A5446] dark:text-[#E8D5C8] block mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-xs text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#6A5446] dark:text-[#E8D5C8] block mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-xs text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6A5446] transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-xs text-[#6A5446] dark:text-[#E8D5C8]">
          <span>Are you boutique administrator? </span>
          <Link href="/admin/login" className="text-[#B8924A] font-semibold hover:underline">
            Admin Suite Login &rarr;
          </Link>
        </div>
      </form>
    </div>
  );
}

