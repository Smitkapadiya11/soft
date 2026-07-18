"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  getProductBySku,
  productImageBySku,
  productVariantBySku,
} from "@/lib/products";
import { staggerContainer, staggerItem } from "@/lib/motion";
import styles from "./CartDrawer.module.css";
import Link from "next/link";
import Price from "@/components/Price";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isCartOpen) {
      openerRef.current = document.activeElement as HTMLElement | null;
      closeBtnRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      openerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isCartOpen) return;
      if (e.key === "Escape") {
        setIsCartOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCartOpen, setIsCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            aria-hidden
          />
          <motion.aside
            ref={drawerRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={styles.header}>
              <h2 id="cart-drawer-title">Your Cart</h2>
              <button
                ref={closeBtnRef}
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={24} aria-hidden />
              </button>
            </div>

            <div className={styles.content} aria-labelledby="cart-drawer-title">
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <p>Your cart is empty.</p>
                  <button type="button" className={styles.continueBtn} onClick={() => setIsCartOpen(false)}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <motion.ul
                  className={styles.itemsList}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        className={styles.cartItem}
                        variants={staggerItem}
                        layout
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={styles.itemImagePlaceholder}>
                          <Image
                            src={productImageBySku(item.variant)}
                            alt=""
                            width={64}
                            height={64}
                            className={styles.cartItemImage}
                          />
                        </div>
                        <div className={styles.itemDetails}>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          <p className={styles.itemVariant}>
                            {productVariantBySku(item.variant)}
                          </p>
                          <p className={styles.itemPrice}>
                            <Price
                              amount={item.price}
                              mrp={getProductBySku(item.variant)?.mrp}
                              sale
                            />
                          </p>
                          <div className={styles.itemActions}>
                            <div className={styles.quantity} aria-label={`Quantity for ${item.name}`}>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} aria-hidden />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} aria-hidden />
                              </button>
                            </div>
                            <button
                              type="button"
                              className={styles.removeBtn}
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 size={16} aria-hidden />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.subtotal}>
                  <span>Subtotal</span>
                  <Price amount={cartTotal} />
                </div>
                <p className={styles.taxNote}>Free discreet delivery · Prepaid checkout</p>
                <Link href="/checkout" className={styles.checkoutBtn} onClick={() => setIsCartOpen(false)}>
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
