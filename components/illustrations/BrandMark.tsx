import React from "react";
import styles from "./BrandMark.module.css";

export interface BrandMarkProps {
  className?: string;
  ariaHidden?: boolean;
  /** Kept for API compatibility with prior Image-based mark — unused for SVG */
  priority?: boolean;
  /**
   * `nav` — horizontal seal + SILK ROOM wordmark (no tagline).
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

const TAGLINE = "Wellness. Comfort. Confidence.";

/**
 * Signature SR seal — interlocking silk-drape S + serif R.
 * Thick ribbon strokes, soft filled seal (not a hairline tech ring).
 * Color via currentColor from parent / tone classes.
 */
function SRMonogram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Soft filled seal — gives mass without a thin ring */}
      <circle cx="40" cy="40" r="38" fill="currentColor" opacity="0.1" />

      {/* Silk S — flowing ribbon, thicker upper/lower turns */}
      <path
        d="M53 19.8c-1.55-4.5-6.1-7.6-12.4-7.6-8.85 0-14.6 4.95-14.6 12 0 6.15 3.85 9.55 13.2 11.85l4.55 1.15c6.15 1.55 9.15 4.15 9.15 9.05 0 6-5.55 10.25-13.75 10.25-7.15 0-12.3-3.15-14.55-8.55"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* R stem — shares the spine with the S mid-curve */}
      <path
        d="M37.8 13.5v53"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
      />

      {/* R bowl */}
      <path
        d="M37.8 13.5h12c7.9 0 13 4.35 13 11.25 0 6.8-5.1 11.45-13 11.45h-12"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* R leg */}
      <path
        d="M46 35.2 62.2 65.5"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
      />

      {/* Inner highlight on S — silk sheen without clutter */}
      <path
        d="M51.2 21.2c-1.2-3.5-4.85-5.9-9.9-5.9-6.9 0-11.4 3.7-11.4 9.1 0 4.7 2.9 7.3 10.2 9.1l3.5.9c4.85 1.2 7.2 3.15 7.2 6.9 0 4.55-4.2 7.8-10.5 7.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.28"
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
 * Premium Silk Room brand footprint — bold SVG seal + uppercase serif wordmark.
 * Wordmark leads; monogram is the signature seal beside / above it.
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
