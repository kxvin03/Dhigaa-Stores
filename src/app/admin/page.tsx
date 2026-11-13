'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Sparkles,
  Share2,
  FileSpreadsheet,
  Scissors,
  CheckCircle2,
} from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    salesToday: 48950,
    salesWeek: 312400,
    salesMonth: 1245000,
    ordersCount: 42,
    pendingFulfillment: 6,
    activeTailoring: 4,
    lowStockCount: 3,
    patronsCount: 184,
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'DHI-2026-9081',
      customer: 'Priya Ramachandran',
      city: 'Erode (Same-Day)',
      amount: 19499,
      status: 'STITCHING',
      time: '18 mins ago',
      item: 'Aadya Royal Crimson Kanchipuram Silk',
    },
    {
      id: 'DHI-2026-9080',
      customer: 'Ananya Sridharan',
      city: 'Coimbatore',
      amount: 16200,
      status: 'CONFIRMED',
      time: '1 hour ago',
      item: 'Mayura Teal & Gold Pure Silk Saree',
    },
    {
      id: 'DHI-2026-9079',
      customer: 'Deepa Vaitheeswaran',
      city: 'Chennai',
      amount: 26500,
      status: 'DISPATCHED',
      time: '3 hours ago',
      item: 'Thangam Golden Ivory Bridal Muhurtham Saree',
    },
  ]);

  const [lowStockItems, setLowStockItems] = useState([
    { name: 'Thangam Golden Ivory Bridal Muhurtham Saree', stock: 2, sku: 'DHI-KAN-003', price: 26500 },
    { name: 'Indira Crimson Red Pure Silk Brocade Lehenga', stock: 1, sku: 'DHI-LEH-001', price: 34000 },
    { name: 'Karpagam Heritage Black & Copper Zari Silk Saree', stock: 2, sku: 'DHI-KAN-004', price: 19800 },
  ]);

  const handleSendDailyWhatsAppSummary = () => {
    const text = encodeURIComponent(
      `*DHIGAA FASHIONS — DAILY EXECUTIVE BRIEFING*\n` +
      `Date: ${new Date().toLocaleDateString('en-IN')}\n\n` +
      `*Revenue Today:* ${formatINR(metrics.salesToday)}\n` +
      `*Weekly Total:* ${formatINR(metrics.salesWeek)}\n` +
      `*Orders Awaiting Fulfillment:* ${metrics.pendingFulfillment}\n` +
      `*Active Custom Blouse Tailoring:* ${metrics.activeTailoring}\n` +
      `*Low Stock Alerts:* ${metrics.lowStockCount} items\n\n` +
      `_Dhigaa Fashions Atelier &bull; Erode_`
    );
    window.open(`https://wa.me/919092806555?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Atelier Executive Console
          </h2>
          <p className="text-xs text-[#E8D5C8]/80 mt-1">
            Real-time operations, artisan orders and boutique performance at Erode.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSendDailyWhatsAppSummary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send WhatsApp Sales Report</span>
          </button>

          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B8924A] text-[#1B1512] font-semibold text-xs hover:bg-[#997334] transition-colors shadow-gold-glow"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#1E1714] border border-[#B8924A]/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#E8D5C8]/80">
            <span>Today&apos;s Gross Sales</span>
            <TrendingUp className="w-4 h-4 text-[#B8924A]" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {formatINR(metrics.salesToday)}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.8% vs yesterday</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#1E1714] border border-[#B8924A]/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#E8D5C8]/80">
            <span>This Month</span>
            <ShoppingBag className="w-4 h-4 text-[#B8924A]" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {formatINR(metrics.salesMonth)}
          </div>
          <div className="text-[11px] text-[#E8D5C8]/70">
            Total 42 orders fulfilled
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#1E1714] border border-[#B8924A]/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#E8D5C8]/80">
            <span>Active Tailoring Units</span>
            <Scissors className="w-4 h-4 text-[#B8924A]" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {metrics.activeTailoring} Blouses
          </div>
          <div className="text-[11px] text-amber-400">
            Assigned to Master Tailor Meena
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#1E1714] border border-[#B8924A]/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#E8D5C8]/80">
            <span>Low Stock Critical</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {metrics.lowStockCount} Sarees
          </div>
          <div className="text-[11px] text-amber-400 font-semibold">
            Under 3 pieces remaining
          </div>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Stream (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#B8924A]" />
              <span>Live Order Stream</span>
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs text-[#B8924A] hover:underline flex items-center gap-1"
            >
              <span>View All 42 Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#B8924A]/15">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">{order.id}</span>
                    <span className="text-[10px] text-[#E8D5C8]/60">&bull; {order.time}</span>
                  </div>
                  <div className="text-xs text-[#E8D5C8] font-medium truncate">
                    {order.customer} &bull; <span className="text-[#B8924A]">{order.city}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 truncate">{order.item}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-white">{formatINR(order.amount)}</div>
                  <span
                    className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.status === 'STITCHING'
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-600/40'
                        : order.status === 'CONFIRMED'
                        ? 'bg-blue-900/60 text-blue-300 border border-blue-600/40'
                        : 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/40'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts & Fast Replenish (1 col) */}
        <div className="p-6 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Stock Alerts</span>
            </h3>
            <span className="text-xs text-amber-400 font-bold">Action Needed</span>
          </div>

          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div
                key={item.sku}
                className="p-3 rounded-xl bg-[#140D0B] border border-amber-500/30 space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-semibold text-white line-clamp-1">{item.name}</h4>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">
                    Only {item.stock} left
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#E8D5C8]/80">
                  <span>SKU: {item.sku}</span>
                  <span className="font-bold text-[#B8924A]">{formatINR(item.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/products"
            className="w-full py-2.5 rounded-xl border border-[#B8924A]/40 text-[#B8924A] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#B8924A]/10 transition-colors"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Update Loom Inventory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

