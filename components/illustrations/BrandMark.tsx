import React from "react";
import styles from "./BrandMark.module.css";

export interface BrandMarkProps {
  className?: string;
  ariaHidden?: boolean;
  /** Kept for API compatibility with prior Image-based mark — unused for SVG */
  priority?: boolean;
  /**
   * `nav` — compact horizontal monogram + wordmark (no tagline).
   * `footer` — horizontal lockup with brand tagline, light on plum.
   * `hero` — larger centered stacked lockup.
   * `gate` — larger centered lockup for age gate.
   */
  variant?: "nav" | "footer" | "hero" | "gate";
  /**
   * Optional explicit tone. Default inherits color from parent CSS
   * (nav/gate: plum-dark, footer: gold-light).
   */
  tone?: "plum" | "cream" | "gold";
}

const TAGLINE = "Intimate. Comfort. Confidence.";

/** Elegant interlocking SR monogram — currentColor strokes. */
function SRMonogram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Whisper-thin ring — brand seal, not a poster plate */}
      <circle
        cx="32"
        cy="32"
        r="30.25"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
      />
      {/* S — opens into the shared space with R */}
      <path
        d="M39.8 21.6c-.95-2.35-3.25-3.85-6.55-3.85-4.45 0-7.45 2.45-7.45 6.05 0 3.15 2 4.85 6.85 6.05l2.9.7c3.35.8 4.95 2.1 4.95 4.65 0 2.95-2.7 5-6.65 5-3.5 0-6.15-1.55-7.4-4.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* R — stem shares the S spine; bowl & leg interlock */}
      <path
        d="M32.6 17.5v29"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M32.6 17.5h5.85c4.2 0 6.95 2.25 6.95 5.85s-2.75 5.95-6.95 5.95H32.6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.4 29.3 46.5 46.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function toneClass(tone: BrandMarkProps["tone"]) {
  if (tone === "gold") return styles.accentGold;
  if (tone === "cream") return styles.accentCream;
  if (tone === "plum") return styles.accentPlum;
  return undefined;
}

/**
 * Premium Silk Room brand footprint — SVG monogram + serif wordmark.
 * No photographic PNG, no black poster plate.
 * Color inherits from parent by default (pass `tone` to force).
 */
function BrandMark({
  className,
  ariaHidden = false,
  variant = "nav",
  tone,
}: BrandMarkProps) {
  const showTagline = variant === "footer" || variant === "gate" || variant === "hero";
  const variantClass = styles[variant] ?? styles.nav;
  const colorClass = toneClass(tone);

  return (
    <span
      className={[styles.root, variantClass, colorClass, className].filter(Boolean).join(" ")}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Silk Room"}
      aria-hidden={ariaHidden || undefined}
    >
      <SRMonogram className={styles.monogram} />
      <span className={styles.wordstack}>
        <span className={styles.wordmark}>Silk Room</span>
        {showTagline && <span className={styles.tagline}>{TAGLINE}</span>}
      </span>
    </span>
  );
}

export default React.memo(BrandMark);
