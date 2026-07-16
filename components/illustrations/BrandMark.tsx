import React from "react";
import Image from "next/image";
import styles from "./BrandMark.module.css";

export interface BrandMarkProps {
  className?: string;
  ariaHidden?: boolean;
  /** Prefetch logo asset in nav / age gate */
  priority?: boolean;
  /**
   * `nav` — seal + SILK ROOM wordmark (no tagline).
   * `footer` — lockup with brand tagline.
   * `hero` — larger stacked lockup.
   * `gate` — larger stacked lockup for age gate.
   */
  variant?: "nav" | "footer" | "hero" | "gate";
  /** Optional tone for wordmark / tagline */
  tone?: "plum" | "cream" | "gold";
}

const TAGLINE = "Wellness. Comfort. Confidence.";

const LOGO_ICON = "/brand/silk-room-icon.png";

function toneClass(tone: BrandMarkProps["tone"]) {
  if (tone === "gold") return styles.accentGold;
  if (tone === "cream") return styles.accentCream;
  if (tone === "plum") return styles.accentPlum;
  return undefined;
}

/**
 * Silk Room brand mark — silk-ribbon seal (not letter monogram) + serif wordmark.
 */
function BrandMark({
  className,
  ariaHidden = false,
  variant = "nav",
  tone,
  priority = false,
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
      <span className={styles.seal}>
        <Image
          src={LOGO_ICON}
          alt=""
          width={128}
          height={128}
          className={styles.sealImg}
          priority={priority}
          sizes="(max-width: 768px) 44px, 64px"
        />
      </span>
      <span className={styles.wordstack}>
        <span className={styles.wordmark}>Silk Room</span>
        {showTagline && <span className={styles.tagline}>{TAGLINE}</span>}
      </span>
    </span>
  );
}

export default React.memo(BrandMark);
