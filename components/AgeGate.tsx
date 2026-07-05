"use client";

import { useState, useEffect } from "react";
import styles from "./AgeGate.module.css";

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const verified = localStorage.getItem("silk-room-age-verified");
    if (!verified) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("silk-room-age-verified", "true");
      setIsOpen(false);
      document.body.style.overflow = "auto";
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Are you 18 or older?</h2>
        <p className={styles.subtitle}>
          This website contains intimate wellness products intended for adults only.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnYes} onClick={() => handleVerify(true)}>
            Yes, I am 18 or older
          </button>
          <button className={styles.btnNo} onClick={() => handleVerify(false)}>
            No, I am under 18
          </button>
        </div>
      </div>
    </div>
  );
}
