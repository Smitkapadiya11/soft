"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { BrandMark } from "@/components/illustrations";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      className={styles.header}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={styles.container}>
        <button
          className={styles.menuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" className={styles.logoLink}>
          <BrandMark className={styles.logo} />
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/product" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Shop Now
          </Link>
        </nav>

        <button className={styles.cartButton} onClick={() => setIsCartOpen(true)} aria-label="Open cart">
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              className={styles.badge}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/product" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Shop Now
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
