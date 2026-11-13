'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartAddOn {
  id: string;
  name: string;
  code: string;
  price: number;
}

export interface CartItemType {
  id: string; // unique item id in cart
  productId: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  fabric?: string;
  variantId?: string | null;
  variantTitle?: string | null;
  color?: string | null;
  size?: string | null;
  quantity: number;
  stock: number;
  selectedAddOns: CartAddOn[];
}

interface CartContextType {
  items: CartItemType[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItemType, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleAddOn: (cartItemId: string, addOn: CartAddOn) => void;
  subtotal: number;
  totalItemsCount: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  hasFreeShipping: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2500;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dhigaa_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem('dhigaa_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, initialized]);

  const addItem = (newItem: Omit<CartItemType, 'id'>) => {
    setItems((prev) => {
      // Find if an identical product + variant + identical addOns already exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.variantId === newItem.variantId &&
          JSON.stringify(i.selectedAddOns.map((a) => a.code).sort()) ===
            JSON.stringify(newItem.selectedAddOns.map((a) => a.code).sort())
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity;
        const maxStock = updated[existingIndex].stock || 10;
        updated[existingIndex].quantity = Math.min(currentQty + newItem.quantity, maxStock);
        return updated;
      } else {
        const id = `${newItem.productId}_${newItem.variantId || 'std'}_${Date.now()}`;
        return [...prev, { ...newItem, id }];
      }
    });

    setIsDrawerOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            const maxStock = item.stock || 10;
            return { ...item, quantity: Math.min(nextQty, maxStock) };
          }
          return item;
        })
        .filter(Boolean) as CartItemType[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleAddOn = (cartItemId: string, addOn: CartAddOn) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const exists = item.selectedAddOns.some((a) => a.code === addOn.code);
          const newAddOns = exists
            ? item.selectedAddOns.filter((a) => a.code !== addOn.code)
            : [...item.selectedAddOns, addOn];
          return { ...item, selectedAddOns: newAddOns };
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((acc, item) => {
    const addOnTotal = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    return acc + (item.price + addOnTotal) * item.quantity;
  }, 0);

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        toggleAddOn,
        subtotal,
        totalItemsCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        hasFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

