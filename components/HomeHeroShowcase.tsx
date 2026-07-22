"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./HomeHeroShowcase.module.css";

type HeroSlide = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

type HomeHeroShowcaseProps = {
  slides: readonly HeroSlide[];
  /** Showcase cadence — default 4 seconds everywhere */
  intervalMs?: number;
};

export default function HomeHeroShowcase({
  slides,
  intervalMs = 4000,
}: HomeHeroShowcaseProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const totalSeconds = Math.max(1, Math.round(intervalMs / 1000));
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

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

  const activeSlide = slides[index];
  const contain = activeSlide.fit !== "cover";
  const visibleSlides = useMemo(() => {
    if (slides.length <= 3) return slides;
    return [0, 1, 2].map((offset) => slides[(index + offset) % slides.length]);
  }, [index, slides]);

  return (
    <div className={styles.shell}>
      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.src}
            className={contain ? styles.activeSlideContain : styles.activeSlideCover}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.99 }
            }
            transition={{ duration: reduceMotion ? 0.25 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority
              sizes="(max-width: 900px) 92vw, 520px"
              className={contain ? styles.activeImageContain : styles.activeImageCover}
            />
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <span className={styles.countdown} aria-hidden="true">
            {secondsLeft}
          </span>
        )}
      </div>

      <div className={styles.previewRail} aria-label="Hero image previews">
        {visibleSlides.map((slide, i) => (
          <button
            key={`${slide.src}-${i}`}
            type="button"
            className={i === 0 ? styles.previewActive : styles.preview}
            onClick={() => {
              const next = slides.findIndex((item) => item.src === slide.src);
              if (next >= 0) {
                setIndex(next);
                setSecondsLeft(totalSeconds);
              }
            }}
            aria-label={`Show ${slide.alt}`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="120px"
              className={styles.previewImage}
            />
          </button>
        ))}
      </div>

      <div className={styles.dots} aria-label="Hero slideshow progress">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={i === index ? styles.dotActive : styles.dot}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => {
              setIndex(i);
              setSecondsLeft(totalSeconds);
            }}
          />
        ))}
      </div>
    </div>
  );
}
