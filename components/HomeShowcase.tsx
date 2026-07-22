"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, utils } from "animejs";
import styles from "./HomeShowcase.module.css";

type Slide = {
  src: string;
  alt: string;
};

type HomeShowcaseProps = {
  slides: readonly Slide[];
};

export default function HomeShowcase({ slides }: HomeShowcaseProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = stage.querySelectorAll<HTMLElement>("[data-showcase-slide]");
    const current = stage.querySelector<HTMLElement>(`[data-showcase-slide="${index}"]`);
    const previous = stage.querySelector<HTMLElement>(`[data-showcase-slide="${prevRef.current}"]`);

    if (reduceMotion || !current || prevRef.current === index) {
      layers.forEach((layer, i) => utils.set(layer, { opacity: i === index ? 1 : 0 }));
    } else {
      utils.set(current, { opacity: 0, scale: 1.03 });
      if (previous && previous !== current) {
        animate(previous, { opacity: 0, scale: 0.985, duration: 620, ease: "inOut(2)" });
      }
      animate(current, { opacity: 1, scale: 1, duration: 720, ease: "out(3)" });
      layers.forEach((layer, i) => {
        if (i !== index && layer !== previous) utils.set(layer, { opacity: 0 });
      });
    }
    prevRef.current = index;
  }, [index]);

  return (
    <div className={styles.wrap}>
      <div className={styles.stage} ref={stageRef}>
        {slides.map((item, i) => (
          <div
            key={item.src}
            className={styles.slide}
            data-showcase-slide={i}
            aria-hidden={i !== index}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
              priority={i === 0}
            />
          </div>
        ))}
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
