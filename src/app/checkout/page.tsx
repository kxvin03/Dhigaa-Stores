'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatINR } from '@/lib/currency';
import { isErodePincode } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, hasFreeShipping, clearCart } = useCart();
  const { user } = useAuth();

  // Form State
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Erode');
  const [state, setState] = useState('Tamil Nadu');
  const [pincode, setPincode] = useState('638001');

  // Delivery & Payment
  const [deliveryMethod, setDeliveryMethod] = useState<'STANDARD' | 'ERODE_SAMEDAY' | 'STORE_PICKUP'>('STANDARD');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD' | 'STORE_PICKUP'>('RAZORPAY');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isErode = isErodePincode(pincode);

  useEffect(() => {
    if (isErode) {
      setDeliveryMethod('ERODE_SAMEDAY');
    } else {
      setDeliveryMethod('STANDARD');
    }
  }, [pincode, isErode]);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2B211C] dark:text-[#F5EEE2]">Your Bag is Empty</h2>
        <button
          onClick={() => router.push('/shop')}
          className="px-6 py-2.5 rounded-full bg-[#B8924A] text-[#1B1512] font-semibold text-xs"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const shippingCost = deliveryMethod === 'STORE_PICKUP' ? 0 : hasFreeShipping ? 0 : 150;
  const codFee = paymentMethod === 'COD' ? 99 : 0;
  const taxGst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + taxGst + shippingCost + codFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    try {
      // 1. Create order on server
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          address: {
            name: customerName,
            phone: customerPhone,
            addressLine,
            locality,
            city,
            state,
            pincode,
          },
          items,
          paymentMethod,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to initialize order');
      }

      // 2. Handle Razorpay Checkout
      if (paymentMethod === 'RAZORPAY') {
        const options = {
          key: orderData.razorpayKeyId,
          amount: Math.round(orderData.totalAmount * 100),
          currency: 'INR',
          name: 'Dhigaa Fashions',
          description: `Order ${orderData.orderNumber} - Luxury Handloom`,
          image: '/assets/logo.png',
          order_id: orderData.razorpayOrderId.startsWith('order_') ? undefined : orderData.razorpayOrderId,
          handler: async function (response: any) {
            // Verify signature
            await fetch('/api/checkout/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpayOrderId: response.razorpay_order_id || orderData.razorpayOrderId,
                razorpayPaymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
                razorpaySignature: response.razorpay_signature || 'mock_signature',
              }),
            });
            clearCart();
            router.push(`/order-success/${orderData.orderId}`);
          },
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
          },
          theme: {
            color: '#B8924A',
          },
        };

        if (typeof (window as any).Razorpay !== 'undefined') {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } else {
          // If Razorpay SDK not loaded in test mode, simulate direct fulfillment
          setTimeout(() => {
            clearCart();
            router.push(`/order-success/${orderData.orderId}`);
          }, 1000);
        }
      } else {
        // COD or Store Pickup
        clearCart();
        router.push(`/order-success/${orderData.orderId}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment processing failed');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B8924A] font-bold">
            Fast & Insured Express Checkout
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2B211C] dark:text-[#F5EEE2] mt-1">
            Complete Your Atelier Order
          </h1>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-xs text-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Information */}
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                1. Patron Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Priya Ramachandran"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 90928 06555"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Email (For Invoices)</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="dhigaafashions@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                2. Delivery Destination
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="House / Flat No., Apartment, Street"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">Locality / Landmark</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="Near Perundurai Road"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">6-Digit PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="638001"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] font-mono focus:outline-none focus:border-[#B8924A]"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#6A5446] dark:text-[#E8D5C8] font-semibold block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1714] border border-[#B8924A]/40 text-[#2B211C] dark:text-[#F5EEE2] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-3">
              <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                3. Delivery Method
              </h2>

              <div className="space-y-2">
                {isErode && (
                  <label className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${deliveryMethod === 'ERODE_SAMEDAY' ? 'bg-[#B8924A]/20 border-[#B8924A]' : 'border-gray-200 dark:border-gray-800'
                    }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'ERODE_SAMEDAY'}
                        onChange={() => setDeliveryMethod('ERODE_SAMEDAY')}
                        className="accent-[#B8924A]"
                      />
                      <div>
                        <div className="font-semibold text-xs text-[#2B211C] dark:text-[#F5EEE2] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#B8924A]" />
                          <span>Erode Express Same-Day / Next-Day Delivery</span>
                        </div>
                        <div className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80">
                          Hand-delivered by Dhigaa Concierge in signature fragrance packaging
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">FREE</span>
                  </label>
                )}

                <label className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${deliveryMethod === 'STANDARD' ? 'bg-[#B8924A]/20 border-[#B8924A]' : 'border-gray-200 dark:border-gray-800'
                  }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'STANDARD'}
                      onChange={() => setDeliveryMethod('STANDARD')}
                      className="accent-[#B8924A]"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#2B211C] dark:text-[#F5EEE2]">
                        Insured Express Air Courier (All India)
                      </div>
                      <div className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80">
                        Dispatched via Bluedart / DTDC with live tracking (3-5 days)
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                    {hasFreeShipping ? 'FREE' : formatINR(150)}
                  </span>
                </label>

                <label className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${deliveryMethod === 'STORE_PICKUP' ? 'bg-[#B8924A]/20 border-[#B8924A]' : 'border-gray-200 dark:border-gray-800'
                  }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'STORE_PICKUP'}
                      onChange={() => setDeliveryMethod('STORE_PICKUP')}
                      className="accent-[#B8924A]"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#2B211C] dark:text-[#F5EEE2]">
                        Store Pickup at Erode Atelier
                      </div>
                      <div className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80">
                        128 Nethaji Road, Erode &bull; Ready within 2 hours
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">FREE</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-3">
              <h2 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                4. Select Payment Method
              </h2>

              <div className="space-y-2">
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'RAZORPAY' ? 'bg-[#B8924A]/20 border-[#B8924A]' : 'border-gray-200 dark:border-gray-800'
                  }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'RAZORPAY'}
                      onChange={() => setPaymentMethod('RAZORPAY')}
                      className="accent-[#B8924A]"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#2B211C] dark:text-[#F5EEE2] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#B8924A]" />
                        <span>Razorpay Online Payment (Instant Confirmation)</span>
                      </div>
                      <div className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80">
                        UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, Netbanking & EMI
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'COD' ? 'bg-[#B8924A]/20 border-[#B8924A]' : 'border-gray-200 dark:border-gray-800'
                  }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#B8924A]"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#2B211C] dark:text-[#F5EEE2]">
                        Cash on Delivery (COD)
                      </div>
                      <div className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80">
                        Pay cash to the courier representative upon delivery (+₹99 handling fee)
                      </div>
                    </div>
                  </div>
                </label>

                {deliveryMethod === 'STORE_PICKUP' && (
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'STORE_PICKUP' ? 'bg-[#B8924A]/20 border-[#B8924A]' : 'border-gray-200 dark:border-gray-800'
                    }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'STORE_PICKUP'}
                        onChange={() => setPaymentMethod('STORE_PICKUP')}
                        className="accent-[#B8924A]"
                      />
                      <div>
                        <div className="font-semibold text-xs text-[#2B211C] dark:text-[#F5EEE2]">
                          Pay at Store (Erode Atelier)
                        </div>
                        <div className="text-[11px] text-[#6A5446] dark:text-[#E8D5C8]/80">
                          Pay by cash, card or UPI during pickup at 128 Nethaji Road
                        </div>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary & Confirm (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl glass-card border border-[#B8924A]/30 space-y-4 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                Order Summary ({items.length} items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#B8924A]/15 max-h-60 overflow-y-auto space-y-2 pr-1">
                {items.map((i) => (
                  <div key={i.id} className="pt-2 flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-[#B8924A]/20 bg-[#F5EEE2]">
                      <Image src={i.imageUrl} alt={i.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="font-semibold text-[#2B211C] dark:text-[#F5EEE2] truncate">
                        {i.name}
                      </div>
                      <div className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]">
                        Qty: {i.quantity} &bull; {i.variantTitle || 'Standard'}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#2B211C] dark:text-[#F5EEE2]">
                      {formatINR(i.price * i.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#B8924A]/20 text-xs">
                <div className="flex justify-between text-[#6A5446] dark:text-[#E8D5C8]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{formatINR(subtotal)}</span>
                </div>

                <div className="flex justify-between text-[#6A5446] dark:text-[#E8D5C8]">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-[#2B211C] dark:text-[#F5EEE2]">{formatINR(taxGst)}</span>
                </div>

                <div className="flex justify-between text-[#6A5446] dark:text-[#E8D5C8]">
                  <span>Delivery ({deliveryMethod})</span>
                  <span>{shippingCost === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : formatINR(shippingCost)}</span>
                </div>

                {codFee > 0 && (
                  <div className="flex justify-between text-[#6A5446] dark:text-[#E8D5C8]">
                    <span>COD Handling Fee</span>
                    <span>{formatINR(codFee)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#B8924A]/20 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-[#2B211C] dark:text-[#F5EEE2]">Grand Total</span>
                  <span className="font-serif font-bold text-2xl text-[#2B211C] dark:text-[#F5EEE2]">
                    {formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B8924A] to-[#997334] text-[#140D0B] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-gold-glow active:scale-95 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? 'Securing Transaction...' : `Confirm & Pay ${formatINR(grandTotal)}`}</span>
              </button>

              <div className="pt-1 text-center">
                <p className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8]/70">
                  By confirming, you agree to Dhigaa Fashions terms & conditions and 7-day exchange policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

