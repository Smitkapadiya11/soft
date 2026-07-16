"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { BrandMark } from "@/components/illustrations";
import { NAV_MAIN_LINKS, NAV_SUPPORT_LINKS } from "@/lib/constants";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 80) {
      setHidden(true);
      setIsSupportOpen(false);
    } else {
      setHidden(false);
    }
  });

  const closeMobile = () => setIsMobileMenuOpen(false);

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
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" className={styles.logoLink} aria-label="Silk Room home">
          <BrandMark className={styles.logo} variant="nav" priority />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}

          <div
            className={styles.dropdown}
            ref={supportRef}
            onMouseEnter={() => setIsSupportOpen(true)}
            onMouseLeave={() => setIsSupportOpen(false)}
          >
            <button
              type="button"
              className={styles.dropdownTrigger}
              aria-expanded={isSupportOpen}
              aria-haspopup="true"
              onClick={() => setIsSupportOpen((open) => !open)}
            >
              Policies
              <ChevronDown
                size={16}
                className={isSupportOpen ? styles.chevronOpen : undefined}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {isSupportOpen && (
                <motion.div
                  className={styles.dropdownPanel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                >
                  <p className={styles.dropdownLabel}>Customer care</p>
                  {NAV_SUPPORT_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={styles.dropdownLink}
                      role="menuitem"
                      onClick={() => {
                        setIsSupportOpen(false);
                        closeMobile();
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            aria-label="Mobile navigation"
          >
            <div className={styles.mobileSection}>
              <p className={styles.mobileLabel}>Browse</p>
              {NAV_MAIN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.mobileSection}>
              <p className={styles.mobileLabel}>Policies &amp; support</p>
              {NAV_SUPPORT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
