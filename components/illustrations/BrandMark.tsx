import React from "react";
import Image from "next/image";

export interface BrandMarkProps {
  className?: string;
  ariaHidden?: boolean;
  /** Load eagerly — use for the primary navbar mark */
  priority?: boolean;
  /**
   * `full` — complete logo with tagline (default).
   * `icon` — square monogram mark for compact placements.
   */
  variant?: "full" | "icon";
}

const ASSETS = {
  full: {
    src: "/brand/silk-room-logo-sm.png",
    width: 512,
    height: 341,
  },
  icon: {
    src: "/brand/silk-room-icon.png",
    width: 512,
    height: 512,
  },
} as const;

/**
 * Official Silk Room logo (rose-gold monogram on black).
 * Pair with a dark pill/badge on light surfaces — the asset includes a black background.
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
      sizes="(max-width: 768px) 140px, 180px"
      aria-hidden={ariaHidden}
    />
  );
}

export default React.memo(BrandMark);
