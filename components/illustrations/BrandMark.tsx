import React from "react";

export interface BrandMarkProps {
  className?: string;
  ariaHidden?: boolean;
}

/**
 * Silk Room wordmark for the navbar and footer.
 * Uses `currentColor` so it adapts to light and dark contexts.
 * A small silk-droplet mark sits inside a thin ring before the text.
 */
function BrandMark({ className, ariaHidden = false }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Silk Room"}
    >
      {/* decorative droplet mark inside a ring */}
      <circle cx="18" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
      <path
        d="M18 12 C 13.5 18, 10.5 21, 10.5 25 C 10.5 29, 14 32, 18 32 C 22 32, 25.5 29, 25.5 25 C 25.5 21, 22.5 18, 18 12 Z"
        fill="currentColor"
      />
      {/* subtle silk ribbon swirl from the droplet */}
      <path
        d="M18 31 C 21 33, 25 33, 26 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <text
        x="42"
        y="31"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="23"
        letterSpacing="0.5"
        fill="currentColor"
      >
        Silk Room
      </text>
    </svg>
  );
}

export default React.memo(BrandMark);
