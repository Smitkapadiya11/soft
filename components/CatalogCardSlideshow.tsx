"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./CatalogCardSlideshow.module.css";

type CatalogSlide = {
  src: string;
  alt: string;
  /** "cover" fills the frame (lifestyle shots); "contain" letterboxes product photos. */
  fit?: "cover" | "contain";
};

type CatalogCardSlideshowProps = {
  slides: readonly CatalogSlide[];
  intervalMs?: number;
  sizes?: string;
};

export default function CatalogCardSlideshow({
  slides,
  intervalMs = 4000,
  sizes = "(max-width: 760px) 100vw, 33vw",
}: CatalogCardSlideshowProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs]);

  const slide = slides[index];
  const contain = slide.fit === "contain";

  return (
    <span className={styles.stage} aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={slide.src}
          className={contain ? styles.slideContain : styles.slideCover}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            className={contain ? styles.imageContain : styles.imageCover}
          />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
