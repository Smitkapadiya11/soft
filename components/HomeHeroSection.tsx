"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger, utils } from "animejs";
import styles from "./HomeHeroSection.module.css";

export type HeroSlide = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  label?: string;
};

type HomeHeroSectionProps = {
  slides: readonly HeroSlide[];
  intervalMs?: number;
};

export default function HomeHeroSection({
  slides,
  intervalMs = 4000,
}: HomeHeroSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const kenBurnsRef = useRef<ReturnType<typeof animate> | null>(null);
  const progressAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const fadeRef = useRef<ReturnType<typeof createTimeline> | null>(null);
  const prevIndexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // Intro copy
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const copyItems = root.querySelectorAll<HTMLElement>("[data-hero-copy]");
    if (!copyItems.length) return;

    if (reduceMotion) {
      utils.set(copyItems, { opacity: 1, translateY: 0 });
      return;
    }

    utils.set(copyItems, { opacity: 0, translateY: 28 });
    const intro = createTimeline({ defaults: { ease: "out(3)" } });
    intro.add(copyItems, {
      opacity: 1,
      translateY: 0,
      duration: 920,
      delay: stagger(95, { start: 160 }),
    });

    return () => {
      intro.pause();
    };
  }, [reduceMotion]);

  // Slide visibility, ken burns, progress, autoplay
  useEffect(() => {
    const root = rootRef.current;
    if (!root || slides.length === 0) return;

    const prev = prevIndexRef.current;
    const layers = root.querySelectorAll<HTMLElement>("[data-hero-slide]");
    const currentLayer = root.querySelector<HTMLElement>(`[data-hero-slide="${index}"]`);
    const previousLayer = root.querySelector<HTMLElement>(`[data-hero-slide="${prev}"]`);

    fadeRef.current?.pause();
    kenBurnsRef.current?.pause();
    progressAnimRef.current?.pause();

    if (reduceMotion || prev === index || !currentLayer) {
      layers.forEach((layer, i) => {
        utils.set(layer, { opacity: i === index ? 1 : 0 });
        layer.style.pointerEvents = i === index ? "auto" : "none";
      });
    } else {
      currentLayer.style.pointerEvents = "auto";
      utils.set(currentLayer, { opacity: 0 });
      fadeRef.current = createTimeline({
        defaults: { ease: "inOut(2)", duration: 760 },
      });
      if (previousLayer && previousLayer !== currentLayer) {
        previousLayer.style.pointerEvents = "none";
        fadeRef.current.add(previousLayer, { opacity: 0 });
      }
      fadeRef.current.add(currentLayer, { opacity: 1 }, 0);
      layers.forEach((layer, i) => {
        if (i !== index && layer !== previousLayer) {
          utils.set(layer, { opacity: 0 });
          layer.style.pointerEvents = "none";
        }
      });
    }

    prevIndexRef.current = index;

    const activeMedia = root.querySelectorAll<HTMLElement>(
      `[data-hero-slide="${index}"] [data-hero-media]`
    );
    if (activeMedia.length) {
      if (reduceMotion) {
        utils.set(activeMedia, { scale: 1 });
      } else {
        utils.set(activeMedia, { scale: 1.03 });
        kenBurnsRef.current = animate(activeMedia, {
          scale: 1.1,
          duration: intervalMs,
          ease: "linear",
        });
      }
    }

    if (progressRef.current) {
      utils.set(progressRef.current, { scaleX: 0 });
      if (!reduceMotion) {
        progressAnimRef.current = animate(progressRef.current, {
          scaleX: 1,
          duration: intervalMs,
          ease: "linear",
        });
      } else {
        utils.set(progressRef.current, { scaleX: 1 });
      }
    }

    if (slides.length <= 1) return;

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => {
      window.clearTimeout(timer);
      fadeRef.current?.pause();
      kenBurnsRef.current?.pause();
      progressAnimRef.current?.pause();
    };
  }, [index, intervalMs, reduceMotion, slides.length]);

  const active = slides[index] ?? slides[0];

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-label="Silk Room — collection showcase"
    >
      <div className={styles.stage} aria-live="polite">
        {slides.map((slide, i) => {
          const contain = slide.fit === "contain";
          return (
            <div
              key={slide.src}
              className={styles.slide}
              data-hero-slide={i}
              aria-hidden={i !== index}
            >
              <div className={styles.backdrop} data-hero-media>
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  priority={i < 2}
                  sizes="100vw"
                  className={styles.backdropImage}
                />
              </div>
              <div
                className={contain ? styles.foregroundContain : styles.foregroundCover}
                data-hero-media
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i < 2}
                  sizes="100vw"
                  className={contain ? styles.imageContain : styles.imageCover}
                />
              </div>
            </div>
          );
        })}

        <div className={styles.veil} aria-hidden="true" />

        <div className={styles.copy}>
          <p className={styles.eyebrow} data-hero-copy>
            India’s care-first wellness brand
          </p>
          <p className={styles.brand} data-hero-copy>
            Silk Room
          </p>
          <h1 className={styles.headline} data-hero-copy>
            Shown clearly. Delivered discreetly.
          </h1>
          <p className={styles.sub} data-hero-copy>
            Ease, Lick, Trio, and Chulli care — real product and lifestyle frames,
            four seconds each, before you buy.
          </p>
          <div className={styles.actions} data-hero-copy>
            <Link href="/#shop-all-products" className={styles.cta}>
              Shop the collection
            </Link>
            <p className={styles.note}>
              Adults 18+ · From ₹90 · Plain-box India delivery
            </p>
          </div>
        </div>

        <div className={styles.chrome}>
          <p className={styles.caption}>{active?.label ?? active?.alt}</p>
          <div className={styles.progressTrack} aria-hidden="true">
            <span ref={progressRef} className={styles.progressFill} />
          </div>
          <div className={styles.dots} role="tablist" aria-label="Hero slides">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${slide.alt}`}
                className={i === index ? styles.dotActive : styles.dot}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
