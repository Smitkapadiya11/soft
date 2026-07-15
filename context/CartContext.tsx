"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { PRODUCT_PRICE } from "@/lib/constants";

export type CartItem = {
  id: string;
  variant: string;
  quantity: number;
  price: number;
  name: string;
};

type AddToCartOptions = {
  openDrawer?: boolean;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem, options?: AddToCartOptions) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Hydrate cart from localStorage after mount (client-only)
    const saved = localStorage.getItem("silk-room-cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration
        setItems(
          parsed.map((item) => ({
            ...item,
            price: PRODUCT_PRICE,
          }))
        );
      } catch {
        /* ignore corrupt cart */
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("silk-room-cart", JSON.stringify(items));
    }, 500);
    return () => clearTimeout(timeout);
  }, [items]);

  const addToCart = useCallback((newItem: CartItem, options?: AddToCartOptions) => {
    const openDrawer = options?.openDrawer !== false;
    const priced: CartItem = { ...newItem, price: PRODUCT_PRICE };
    setItems((prev) => {
      const existing = prev.find((i) => i.id === priced.id);
      if (existing) {
        return prev.map((i) =>
          i.id === priced.id ? { ...i, quantity: i.quantity + priced.quantity, price: PRODUCT_PRICE } : i
        );
      }
      return [...prev, priced];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    }
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartTotal = useMemo(
    () => items.reduce((total, item) => total + PRODUCT_PRICE * item.quantity, 0),
    [items]
  );
  const cartCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
