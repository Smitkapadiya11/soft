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

const RING_RADIUS = 12;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function CatalogCardSlideshow({
  slides,
  intervalMs = 4000,
  sizes = "(max-width: 760px) 100vw, 33vw",
}: CatalogCardSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(Math.round(intervalMs / 1000));
  const reduceMotion = useReducedMotion();
  const totalSeconds = Math.max(1, Math.round(intervalMs / 1000));

  useEffect(() => {
    if (slides.length <= 1) return;
    const tick = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIndex((i) => (i + 1) % slides.length);
          return totalSeconds;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, [slides.length, totalSeconds]);

  const slide = slides[index];
  const contain = slide.fit === "contain";

  return (
    <span className={styles.stage} aria-live="off">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={slide.src}
          className={contain ? styles.slideContain : styles.slideCover}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.045, filter: "blur(6px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.99, filter: "blur(4px)" }
          }
          transition={{
            duration: reduceMotion ? 0.25 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Slow cinematic drift while the slide is on screen */}
          <motion.span
            className={styles.kenburns}
            initial={false}
            animate={
              reduceMotion
                ? { scale: 1 }
                : { scale: contain ? 1.015 : 1.05, y: contain ? 0 : -4 }
            }
            transition={{ duration: intervalMs / 1000 + 1, ease: "linear" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={sizes}
              className={contain ? styles.imageContain : styles.imageCover}
            />
          </motion.span>
        </motion.span>
      </AnimatePresence>

      {slides.length > 1 && (
        <span className={styles.countdown} aria-hidden="true">
          <svg viewBox="0 0 30 30" className={styles.countdownSvg}>
            <circle className={styles.ringTrack} cx="15" cy="15" r={RING_RADIUS} />
            {/* keyed by slide index so the ring refills on every transition */}
            <circle
              key={index}
              className={styles.ringProgress}
              cx="15"
              cy="15"
              r={RING_RADIUS}
              strokeDasharray={RING_CIRCUMFERENCE}
              style={{
                animationDuration: `${intervalMs}ms`,
              }}
            />
          </svg>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={secondsLeft}
              className={styles.countdownDigit}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {secondsLeft}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </span>
  );
}
