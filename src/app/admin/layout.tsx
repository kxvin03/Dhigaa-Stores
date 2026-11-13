'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Palette,
  Layers,
  Scissors,
  Users,
  Tag,
  Settings,
  Eye,
  LogOut,
  Bell,
  Menu,
  X,
  AlertTriangle,
  KeyRound,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout, refreshUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Forced password change modal state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [isChangingPwd, setIsChangingPwd] = useState(false);

  // Keyboard shortcut for quick actions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('admin-quick-search');
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Stock', href: '/admin/products', icon: Package },
    { label: 'Orders & Invoices', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Visual CMS Builder', href: '/admin/cms', icon: Layers },
    { label: 'Theme & 3D Editor', href: '/admin/theme-editor', icon: Palette },
    { label: 'Bespoke & Bookings', href: '/admin/stitching-bookings', icon: Scissors },
    { label: 'Patrons & Loyalty', href: '/admin/customers', icon: Users },
    { label: 'Marketing & Coupons', href: '/admin/marketing', icon: Tag },
    { label: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (newPassword !== confirmPassword) {
      setPwdError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPwdError('Password must be at least 6 characters');
      return;
    }

    setIsChangingPwd(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwdSuccess('Password changed successfully! Welcome to the executive suite.');
        await refreshUser();
        setTimeout(() => {
          setPwdSuccess('');
        }, 1500);
      } else {
        setPwdError(data.error || 'Failed to update password');
      }
    } catch (err: any) {
      setPwdError(err.message || 'Error occurred');
    } finally {
      setIsChangingPwd(false);
    }
  };

  // If loading or not admin on /admin (except /admin/login)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B1512] flex items-center justify-center text-[#F5EEE2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#B8924A] border-t-transparent rounded-full animate-spin" />
          <span className="font-serif text-sm tracking-widest text-[#B8924A]">Loading Dhigaa Suite...</span>
        </div>
      </div>
    );
  }

  // Allow login page without layout wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#16100D] text-[#F5EEE2] flex flex-col md:flex-row antialiased">
      {/* Forced Password Change Modal */}
      {user && user.mustChangePassword && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#231A16] border border-[#B8924A] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#B8924A]/30">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-[#B8924A] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">First Login: Change Password</h3>
                <p className="text-xs text-[#E8D5C8]/80">
                  Dhigaa Security Policy: You must set a new confidential password before proceeding.
                </p>
              </div>
            </div>

            {pwdError && (
              <div className="p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-xs text-red-200">
                {pwdError}
              </div>
            )}
            {pwdSuccess && (
              <div className="p-3 rounded-lg bg-emerald-900/40 border border-emerald-500/50 text-xs text-emerald-200">
                {pwdSuccess}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#E8D5C8]">Initial Temporary Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="e.g. Dhigaa@2026"
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1B1512] border border-[#B8924A]/40 text-sm focus:outline-none focus:border-[#B8924A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E8D5C8]">New Strong Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1B1512] border border-[#B8924A]/40 text-sm focus:outline-none focus:border-[#B8924A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E8D5C8]">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setCurrentPassword ? setConfirmPassword(e.target.value) : null}
                  placeholder="Re-enter new password"
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1B1512] border border-[#B8924A]/40 text-sm focus:outline-none focus:border-[#B8924A]"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPwd}
                className="w-full mt-2 py-2.5 rounded-lg bg-[#B8924A] hover:bg-[#997334] text-[#1B1512] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                {isChangingPwd ? 'Updating Security Credentials...' : 'Set Confidential Password & Continue'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#1E1714] border-b border-[#B8924A]/30">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#B8924A]">
            <Image src="/assets/logo.png" alt="Dhigaa Admin" fill className="object-cover" />
          </div>
          <span className="font-serif text-sm font-bold text-white tracking-wide">
            DHIGAA <span className="text-[#B8924A] font-light">Admin</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#E8D5C8] hover:text-[#B8924A]"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Futuristic Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1B1512] border-r border-[#B8924A]/25 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        <div>
          {/* Atelier Brand Identity */}
          <div className="p-5 border-b border-[#B8924A]/20 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B8924A]/60 bg-[#F5EEE2] shrink-0">
                <Image src="/assets/logo.png" alt="Dhigaa Logo" fill className="object-cover" />
              </div>
              <div>
                <h1 className="font-serif text-base font-bold text-white tracking-wide">
                  DHIGAA <span className="text-[#B8924A] font-light italic">Suite</span>
                </h1>
                <p className="text-[10px] text-[#E8D5C8]/70 tracking-widest uppercase">
                  Erode Atelier Console
                </p>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#B8924A] text-[#1B1512] font-semibold shadow-gold-glow'
                      : 'text-[#E8D5C8]/80 hover:bg-[#2B211C] hover:text-[#B8924A]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="p-4 border-t border-[#B8924A]/20 space-y-3 bg-[#16100D]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#2B211C] hover:bg-[#3C2F28] border border-[#B8924A]/40 text-xs text-[#F5EEE2] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#B8924A]" />
            <span>Preview Storefront</span>
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-[#B8924A] uppercase tracking-wider">
                {user?.role || 'ADMIN'}
              </span>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Global Command Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-[#1B1512]/80 backdrop-blur-md border-b border-[#B8924A]/20">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
            <input
              id="admin-quick-search"
              type="text"
              placeholder="Search products, orders, patrons... (Ctrl+K)"
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#231A16] border border-[#B8924A]/30 text-xs text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
            />
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Razorpay Active (Test Mode)</span>
            </div>

            <div className="text-[#E8D5C8]/80">
              Erode Local Delivery: <strong className="text-white">Active</strong>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

