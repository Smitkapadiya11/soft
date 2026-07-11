"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";

export type CartItem = {
  id: string;
  variant: string;
  quantity: number;
  price: number;
  name: string;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
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
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration
        setItems(JSON.parse(saved));
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

  const addToCart = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
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

  const cartTotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
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
