import React from "react";
import Image from "next/image";

export interface BrandMarkProps {
  className?: string;
  ariaHidden?: boolean;
  /** Load eagerly — use for the primary navbar mark */
  priority?: boolean;
  /**
   * `nav` — monogram + SILK ROOM wordmark (no tagline) for compact chrome.
   * `full` — complete logo with tagline (age gate, footer).
   * `icon` — square monogram mark for favicons / compact placements.
   */
  variant?: "nav" | "full" | "icon";
}

const ASSETS = {
  nav: {
    src: "/brand/silk-room-logo-nav.png",
    width: 564,
    height: 330,
  },
  full: {
    src: "/brand/silk-room-logo.png",
    width: 1024,
    height: 682,
  },
  icon: {
    src: "/brand/silk-room-icon.png",
    width: 512,
    height: 512,
  },
} as const;

/**
 * Official Silk Room logo (rose-gold monogram on black).
 * Pair with a dark frame on light surfaces — the asset includes a black background.
 */
function BrandMark({
  className,
  ariaHidden = false,
  priority = false,
  variant = "full",
}: BrandMarkProps) {
  const asset = ASSETS[variant];

  return (
    <Image
      src={asset.src}
      alt={ariaHidden ? "" : "Silk Room"}
      width={asset.width}
      height={asset.height}
      className={className}
      priority={priority}
      sizes={
        variant === "nav"
          ? "(max-width: 768px) 160px, 200px"
          : variant === "icon"
            ? "64px"
            : "(max-width: 768px) 220px, 280px"
      }
      aria-hidden={ariaHidden}
    />
  );
}

export default React.memo(BrandMark);
