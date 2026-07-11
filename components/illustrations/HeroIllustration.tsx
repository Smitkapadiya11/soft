import React from "react";

export interface HeroIllustrationProps {
  className?: string;
  ariaHidden?: boolean;
}

/**
 * Premium abstract brand art for the homepage hero background.
 * Flowing silk-like ribbons, gradient glows and subtle geometry
 * in the Silk Room palette (plum / blush / gold).
 */
function HeroIllustration({ className, ariaHidden = true }: HeroIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Silk Room brand illustration"}
    >
      <defs>
        <radialGradient id="hero-glow-plum" cx="28%" cy="18%" r="65%">
          <stop offset="0%" stopColor="#4a2c3a" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#4a2c3a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#4a2c3a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow-gold" cx="82%" cy="72%" r="55%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-silk-1" x1="0%" y1="0%" x2="100%" y2="40%">
          <stop offset="0%" stopColor="#f4e9e4" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#e0c896" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="hero-silk-2" x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#4a2c3a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2a1721" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="hero-silk-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
          <stop offset="50%" stopColor="#c9a96e" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </linearGradient>
        <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#4a2c3a" fillOpacity="0.06" />
        </pattern>
      </defs>

      {/* base */}
      <rect width="800" height="600" fill="#faf7f2" />
      <rect width="800" height="600" fill="url(#hero-dots)" />

      {/* gradient glows */}
      <rect width="800" height="600" fill="url(#hero-glow-plum)" />
      <rect width="800" height="600" fill="url(#hero-glow-gold)" />

      {/* flowing silk ribbons */}
      <path
        d="M-40 150 C 160 60, 320 260, 520 150 S 860 110, 920 230 L 920 330 C 760 250, 560 430, 360 310 S 40 370, -40 270 Z"
        fill="url(#hero-silk-1)"
        opacity="0.85"
      />
      <path
        d="M-60 250 C 180 170, 340 360, 540 250 S 880 210, 940 330 L 940 430 C 780 350, 580 520, 380 410 S 20 470, -60 380 Z"
        fill="url(#hero-silk-2)"
        opacity="0.7"
      />
      <path
        d="M-40 410 C 200 350, 360 510, 560 410 S 860 390, 940 470 L 940 600 L -40 600 Z"
        fill="url(#hero-silk-1)"
        opacity="0.5"
      />

      {/* thin gold accent ribbons */}
      <path
        d="M-20 200 C 180 120, 340 300, 540 200 S 860 170, 920 280"
        fill="none"
        stroke="url(#hero-silk-line)"
        strokeWidth="2"
      />
      <path
        d="M-20 360 C 200 300, 360 460, 560 360 S 860 340, 940 420"
        fill="none"
        stroke="url(#hero-silk-line)"
        strokeWidth="1.5"
      />

      {/* geometric concentric accents */}
      <g stroke="#c9a96e" fill="none" opacity="0.28">
        <circle cx="690" cy="120" r="60" strokeWidth="1" />
        <circle cx="690" cy="120" r="44" strokeWidth="1" />
        <circle cx="690" cy="120" r="28" strokeWidth="1" />
      </g>
      <g stroke="#4a2c3a" fill="none" opacity="0.18">
        <circle cx="120" cy="470" r="50" strokeWidth="1" />
        <circle cx="120" cy="470" r="34" strokeWidth="1" />
      </g>

      {/* floating particles */}
      <g fill="#c9a96e" opacity="0.5">
        <circle cx="250" cy="90" r="2.5" />
        <circle cx="610" cy="240" r="2" />
        <circle cx="470" cy="500" r="2.5" />
        <circle cx="740" cy="380" r="2" />
        <circle cx="180" cy="300" r="1.8" />
        <circle cx="380" cy="150" r="1.6" />
      </g>
    </svg>
  );
}

export default React.memo(HeroIllustration);
