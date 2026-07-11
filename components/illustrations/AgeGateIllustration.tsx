import React from "react";

export interface AgeGateIllustrationProps {
  className?: string;
  ariaHidden?: boolean;
}

/**
 * Decorative SVG for the age-verification modal.
 * A premium shield bearing "18+" with flowing silk ribbons in brand colors.
 */
function AgeGateIllustration({ className, ariaHidden = true }: AgeGateIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "18 plus verification"}
    >
      <defs>
        <linearGradient id="age-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2c3a" />
          <stop offset="100%" stopColor="#2a1721" />
        </linearGradient>
        <linearGradient id="age-silk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4e9e4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="age-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <circle cx="150" cy="140" r="120" fill="url(#age-glow)" />

      {/* flowing silk ribbons behind shield */}
      <path
        d="M40 200 C 90 160, 130 220, 180 180 S 270 160, 300 200 L 300 240 C 260 210, 220 250, 170 220 S 80 240, 40 210 Z"
        fill="url(#age-silk)"
        opacity="0.8"
      />
      <path
        d="M30 230 C 90 200, 140 250, 200 220 S 280 210, 300 240"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* shield */}
      <path
        d="M150 56 L214 80 L214 150 C214 196, 188 226, 150 242 C112 226, 86 196, 86 150 L86 80 Z"
        fill="url(#age-shield)"
        stroke="#c9a96e"
        strokeWidth="2"
      />
      <path
        d="M150 64 L207 85 L207 150 C207 191, 184 218, 150 233 C116 218, 93 191, 93 150 L93 85 Z"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="0.75"
        opacity="0.5"
      />

      {/* 18+ text */}
      <text
        x="138"
        y="158"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="58"
        fill="#c9a96e"
      >
        18
      </text>
      <text
        x="186"
        y="150"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="40"
        fill="#e0c896"
      >
        +
      </text>
      <line x1="110" y1="176" x2="190" y2="176" stroke="#c9a96e" strokeWidth="1" opacity="0.7" />
      <text
        x="150"
        y="196"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="10"
        letterSpacing="3"
        fill="#f4e9e4"
        opacity="0.8"
      >
        ADULTS ONLY
      </text>
    </svg>
  );
}

export default React.memo(AgeGateIllustration);
