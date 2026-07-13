"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AgeGateIllustration } from "@/components/illustrations";
import { scaleIn, spring } from "@/lib/motion";
import styles from "./AgeGate.module.css";

/** Legal / policy URLs must stay open for Razorpay website reviewers & crawlers */
const OPEN_PATHS = [
  "/privacy",
  "/terms",
  "/shipping",
  "/contact",
  "/replacement",
  "/cancellation-and-refunds",
  "/cancellation-refunds",
  "/about",
  "/age-verification",
];

export default function AgeGate() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isOpenPath = OPEN_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  useEffect(() => {
    // Client-only gate: read localStorage after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client hydration
    setMounted(true);
    if (isOpenPath) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
      return;
    }
    const verified = localStorage.getItem("silk-room-age-verified");
    if (!verified) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  }, [isOpenPath]);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("silk-room-age-verified", "true");
      setIsOpen(false);
      document.body.style.overflow = "auto";
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <AnimatePresence>
      {mounted && isOpen && !isOpenPath && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleIn}
            transition={spring}
          >
            <AgeGateIllustration className={styles.illustration} />
            <h2 className={styles.title}>Are you 18 or older?</h2>
            <p className={styles.subtitle}>
              Silk Room sells adult intimate products intended for customers aged 18 and above.
              By continuing you confirm you are 18+ and agree to our Terms and Privacy Policy.
            </p>
            <div className={styles.actions}>
              <button className={styles.btnYes} onClick={() => handleVerify(true)}>
                Yes, I am 18 or older
              </button>
              <button className={styles.btnNo} onClick={() => handleVerify(false)}>
                Exit
              </button>
            </div>
            <p className={styles.policyNote}>
              Policies are always available:{" "}
              <a href="/terms">Terms</a>
              {" · "}
              <a href="/privacy">Privacy</a>
              {" · "}
              <a href="/shipping">Shipping</a>
              {" · "}
              <a href="/cancellation-and-refunds">Cancellation and Refunds</a>
              {" · "}
              <a href="/contact">Contact</a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
