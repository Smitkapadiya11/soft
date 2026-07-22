"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./HomeShowcase.module.css";

type Slide = {
  src: string;
  alt: string;
};

type HomeShowcaseProps = {
  slides: readonly Slide[];
};

export default function HomeShowcase({ slides }: HomeShowcaseProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            className={styles.slide}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.dots} role="tablist" aria-label="Showcase slides">
        {slides.map((item, i) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}`}
            className={i === index ? styles.dotActive : styles.dot}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
