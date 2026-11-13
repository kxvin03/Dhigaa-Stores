import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if a given 6-digit Indian PIN code belongs to the Erode district / headquarters.
 * Standard Erode PIN range: 638001 through 638115
 */
export function isErodePincode(pincode: string): boolean {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) return false;
  const num = parseInt(clean, 10);
  return num >= 638001 && num <= 638115;
}

export function getEstimatedDeliveryByPincode(pincode: string): {
  isErode: boolean;
  estimate: string;
  badge: string;
} {
  if (isErodePincode(pincode)) {
    return {
      isErode: true,
      estimate: 'Today or Tomorrow (Express Local Concierge)',
      badge: 'Erode Same-Day / Next-Day Delivery Available',
    };
  }
  return {
    isErode: false,
    estimate: '3 - 5 Business Days via Insured Bluedart/DTDC',
    badge: 'Standard All-India Insured Express',
  };
}

/**
 * Generates an order number like DHI-2026-8921
 */
export function generateOrderNumber(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DHI-2026-${random}`;
}

