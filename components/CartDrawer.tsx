"use client";

import { useEffect, useRef } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ProductPack } from "@/components/illustrations";
import { staggerContainer, staggerItem } from "@/lib/motion";
import styles from "./CartDrawer.module.css";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      closeBtnRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) setIsCartOpen(false);
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
                          <ProductPack
                            variant={item.variant as "Soft Rose" | "Mist Grey"}
                            className={styles.cartItemImage}
                          />
                        </div>
                        <div className={styles.itemDetails}>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          <p className={styles.itemVariant}>Variant: {item.variant}</p>
                          <p className={styles.itemPrice}>₹{item.price}</p>
                          <div className={styles.itemActions}>
                            <div className={styles.quantity} aria-label={`Quantity for ${item.variant}`}>
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
                              aria-label={`Remove ${item.variant} from cart`}
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
                  <span>₹{cartTotal}</span>
                </div>
                <p className={styles.taxNote}>Shipping &amp; taxes calculated at checkout.</p>
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
