'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('An error occurred during registration');
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
          Create Patron Account
        </h1>
        <p className="text-xs text-[#6A5446] dark:text-[#E8D5C8]">
          Enjoy 100 complimentary loyalty welcome points & personalized draping consultations.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-900/40 border border-red-500/50 text-xs text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4 text-xs">
        <div>
          <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Ramachandran"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">WhatsApp Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 90928 06555"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#2B211C] dark:bg-[#B8924A] text-white dark:text-[#1B1512] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6A5446] transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          <span>{loading ? 'Creating Account...' : 'Register as Patron'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-xs text-[#6A5446] dark:text-[#E8D5C8]">
          <span>Already registered? </span>
          <Link href="/login" className="text-[#B8924A] font-semibold hover:underline">
            Sign In &rarr;
          </Link>
        </div>
      </form>
    </div>
  );
}

