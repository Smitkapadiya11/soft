"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { PRODUCT_PRICE } from "@/lib/constants";
import { trackAddToCart } from "@/lib/meta-pixel";

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
  /** False until localStorage cart has been read (avoids empty checkout flash) */
  cartReady: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const MAX_QTY = 10;

function persistCart(items: CartItem[]) {
  try {
    localStorage.setItem("silk-room-cart", JSON.stringify(items));
  } catch {
    /* private mode */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("silk-room-cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration
        setItems(
          parsed.map((item) => ({
            ...item,
            price: PRODUCT_PRICE,
            quantity: Math.min(MAX_QTY, Math.max(1, item.quantity || 1)),
          }))
        );
      } catch {
        /* ignore corrupt cart */
      }
    }
    setCartReady(true);
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    persistCart(items);
  }, [items, cartReady]);

  const addToCart = useCallback((newItem: CartItem, options?: AddToCartOptions) => {
    const openDrawer = options?.openDrawer !== false;
    const priced: CartItem = {
      ...newItem,
      price: PRODUCT_PRICE,
      quantity: Math.min(MAX_QTY, Math.max(1, newItem.quantity)),
    };
    setItems((prev) => {
      const existing = prev.find((i) => i.id === priced.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) =>
          i.id === priced.id
            ? {
                ...i,
                quantity: Math.min(MAX_QTY, i.quantity + priced.quantity),
                price: PRODUCT_PRICE,
              }
            : i
        );
      } else {
        next = [...prev, priced];
      }
      persistCart(next);
      return next;
    });
    if (openDrawer) {
      setIsCartOpen(true);
    }
    trackAddToCart({
      contentName: priced.name,
      contentIds: [priced.id],
      value: PRODUCT_PRICE * priced.quantity,
      quantity: priced.quantity,
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      persistCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      let next: CartItem[];
      if (quantity < 1) {
        next = prev.filter((i) => i.id !== id);
      } else {
        next = prev.map((i) =>
          i.id === id ? { ...i, quantity: Math.min(MAX_QTY, quantity) } : i
        );
      }
      persistCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    persistCart([]);
  }, []);

  const cartTotal = useMemo(
    () => items.reduce((total, item) => total + PRODUCT_PRICE * item.quantity, 0),
    [items]
  );
  const cartCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

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
        cartReady,
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
