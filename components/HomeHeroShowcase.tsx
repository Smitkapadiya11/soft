"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./HomeHeroShowcase.module.css";

type HeroSlide = {
  src: string;
  alt: string;
};

type HomeHeroShowcaseProps = {
  slides: readonly HeroSlide[];
};

export default function HomeHeroShowcase({ slides }: HomeHeroShowcaseProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[index];
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
            className={styles.activeSlide}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority
              sizes="(max-width: 900px) 92vw, 520px"
              className={styles.activeImage}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.previewRail} aria-label="Hero image previews">
        {visibleSlides.map((slide, i) => (
          <button
            key={`${slide.src}-${i}`}
            type="button"
            className={i === 0 ? styles.previewActive : styles.preview}
            onClick={() => setIndex(slides.findIndex((item) => item.src === slide.src))}
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
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
