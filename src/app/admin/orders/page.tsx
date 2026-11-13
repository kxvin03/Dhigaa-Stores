'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  FileText,
  Truck,
  Scissors,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Eye,
} from 'lucide-react';
import { formatINR } from '@/lib/currency';

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const [orders, setOrders] = useState([
    {
      id: 'DHI-2026-9081',
      date: '2026-11-12 11:20 AM',
      customerName: 'Priya Ramachandran',
      customerPhone: '+91 98840 98765',
      customerEmail: 'priya@example.com',
      deliveryType: 'ERODE_SAMEDAY',
      address: '14, Perundurai Road, Maruti Nagar, Erode, Tamil Nadu 638011',
      items: [
        {
          name: 'Aadya Royal Crimson Kanchipuram Silk Saree',
          quantity: 1,
          price: 18500,
          addOns: ['Custom Blouse Stitching (₹999)'],
        },
      ],
      subtotal: 18500,
      addOnTotal: 999,
      taxGst: 925,
      totalAmount: 19499,
      paymentMethod: 'RAZORPAY',
      paymentStatus: 'PAID',
      status: 'STITCHING',
      trackingNumber: 'DHI-EXP-ERD-4412',
    },
    {
      id: 'DHI-2026-9080',
      date: '2026-11-12 09:45 AM',
      customerName: 'Ananya Sridharan',
      customerPhone: '+91 98402 33445',
      customerEmail: 'ananya.s@gmail.com',
      deliveryType: 'STANDARD',
      address: '42, Race Course Road, Coimbatore, Tamil Nadu 641018',
      items: [
        {
          name: 'Mayura Teal & Gold Pure Silk Saree',
          quantity: 1,
          price: 16200,
          addOns: ['Fall & Pico Hemming (₹150)'],
        },
      ],
      subtotal: 16200,
      addOnTotal: 150,
      taxGst: 810,
      totalAmount: 17160,
      paymentMethod: 'RAZORPAY',
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
      trackingNumber: 'BLUEDART-882910',
    },
    {
      id: 'DHI-2026-9079',
      date: '2026-11-11 04:15 PM',
      customerName: 'Deepa Vaitheeswaran',
      customerPhone: '+91 94432 11998',
      customerEmail: 'deepa.v@yahoo.com',
      deliveryType: 'STANDARD',
      address: '8, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028',
      items: [
        {
          name: 'Thangam Golden Ivory Bridal Muhurtham Saree',
          quantity: 1,
          price: 26500,
          addOns: ['Custom Blouse Stitching (₹999)', 'Matching Cotton Petticoat (₹450)'],
        },
      ],
      subtotal: 26500,
      addOnTotal: 1449,
      taxGst: 1325,
      totalAmount: 29274,
      paymentMethod: 'RAZORPAY',
      paymentStatus: 'PAID',
      status: 'DISPATCHED',
      trackingNumber: 'DTDC-TN-990182',
    },
  ]);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDownloadInvoicePDF = (order: any) => {
    const lines: string[] = [
      '================================================================',
      '             DHIGAA FASHIONS - TAX INVOICE',
      '     where every thread has a story',
      '     128 Nethaji Road, Erode, Tamil Nadu 638001',
      '     GSTIN: 33AAACD1234F1Z8  |  Ph: +91 9092806555',
      '================================================================',
      '',
      `Invoice No : ${order.id}`,
      `Date       : ${order.date}`,
      '',
      '--- Billed To ---',
      `Name       : ${order.customerName}`,
      `Address    : ${order.address}`,
      `Phone      : ${order.customerPhone}`,
      `Payment    : ${order.paymentMethod} (PAID)`,
      '',
      '----------------------------------------------------------------',
      'Item Description                             Qty   Amount (INR)',
      '----------------------------------------------------------------',
      ...(order.items || []).map(
        (item: any) =>
          `${String(item.name).substring(0, 44).padEnd(44)} ${String(item.quantity).padStart(3)}   ${('₹' + Number(item.price).toLocaleString('en-IN')).padStart(12)}`
      ),
      '',
      '----------------------------------------------------------------',
      `${'Subtotal:'.padEnd(50)} ₹${Number(order.subtotal || 0).toLocaleString('en-IN')}`,
      ...(order.addOnTotal ? [`${'Bespoke Add-ons:'.padEnd(50)} ₹${Number(order.addOnTotal).toLocaleString('en-IN')}`] : []),
      `${'GST (5% Silk Handloom):'.padEnd(50)} ₹${Number(order.taxGst || 0).toLocaleString('en-IN')}`,
      '================================================================',
      `${'TOTAL PAID:'.padEnd(50)} ₹${Number(order.totalAmount || 0).toLocaleString('en-IN')}`,
      '================================================================',
      '',
      'Thank you for celebrating South Indian heritage with Dhigaa Fashions.',
      'Visit: dhigaafashions.com | Instagram: @dhigaa_fashions',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dhigaa_Invoice_${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendWhatsAppUpdate = (order: any) => {
    const text = encodeURIComponent(
      `Vanakkam ${order.customerName}! 🌸\n` +
      `Your Dhigaa Fashions order *${order.id}* is currently: *${order.status}*.\n` +
      `Tracking / Courier: ${order.trackingNumber || 'Local Erode Concierge'}\n` +
      `Delivery Type: ${order.deliveryType}\n\n` +
      `Dhigaa Atelier Concierge: +91 9092806555`
    );
    window.open(`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B8924A]" />
            <span>Order Fulfillment & Dispatch</span>
          </h2>
          <p className="text-xs text-[#E8D5C8]/80 mt-1">
            Track customer orders, manage custom tailoring stages, and issue tax invoices
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8924A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order number, patron name, phone..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#140D0B] border border-[#B8924A]/30 text-xs text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['ALL', 'CONFIRMED', 'STITCHING', 'DISPATCHED', 'DELIVERED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? 'bg-[#B8924A] text-[#1B1512]'
                  : 'bg-[#140D0B] text-[#E8D5C8]/80 hover:text-white border border-[#B8924A]/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#1E1714] border border-[#B8924A]/25 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#140D0B] text-[#E8D5C8]/70 border-b border-[#B8924A]/20 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Patron Details</th>
                <th className="py-3.5 px-4">Delivery Type</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Fulfillment Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8924A]/15 text-[#F5EEE2]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#251D19] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-white">{order.id}</div>
                    <div className="text-[10px] text-[#E8D5C8]/60 mt-0.5">{order.date}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{order.customerName}</div>
                    <div className="text-[10px] text-[#B8924A]">{order.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        order.deliveryType === 'ERODE_SAMEDAY'
                          ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {order.deliveryType === 'ERODE_SAMEDAY' ? 'Erode Same-Day' : 'Courier (India)'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {formatINR(order.totalAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="px-2.5 py-1 rounded bg-[#140D0B] border border-[#B8924A]/40 text-[11px] font-semibold text-[#B8924A] focus:outline-none"
                    >
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="STITCHING">STITCHING</option>
                      <option value="DISPATCHED">DISPATCHED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownloadInvoicePDF(order)}
                        title="Download GST Invoice PDF"
                        className="p-1.5 rounded-lg bg-[#2B211C] hover:bg-[#3C2F28] text-[#B8924A] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSendWhatsAppUpdate(order)}
                        title="Send WhatsApp Update"
                        className="p-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

