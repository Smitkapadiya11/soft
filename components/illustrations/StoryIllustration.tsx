import React from "react";

export interface StoryIllustrationProps {
  className?: string;
  ariaHidden?: boolean;
}

/**
 * Brand-story section illustration.
 * Two flowing silk ribbons intertwining (tasteful intimacy), a quality seal
 * and discreet packaging motif — all in the brand palette.
 */
function StoryIllustration({ className, ariaHidden = true }: StoryIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Silk Room brand story"}
    >
      <defs>
        <linearGradient id="story-ribbon-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4e9e4" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="story-ribbon-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a2c3a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2a1721" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="story-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <circle cx="250" cy="180" r="200" fill="url(#story-glow)" />

      {/* ribbon A (light) — flowing diagonal */}
      <path
        d="M30 120 C 130 60, 230 180, 330 100 S 470 80, 490 150 L 490 210 C 400 150, 300 250, 200 180 S 70 220, 30 180 Z"
        fill="url(#story-ribbon-a)"
        opacity="0.9"
      />
      {/* ribbon B (plum) — intertwining */}
      <path
        d="M30 230 C 130 180, 230 290, 330 220 S 470 200, 490 270 L 490 320 C 400 270, 300 360, 200 300 S 70 330, 30 300 Z"
        fill="url(#story-ribbon-b)"
        opacity="0.85"
      />

      {/* crossing accent line where ribbons meet */}
      <path
        d="M70 170 C 180 130, 300 230, 460 180"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* quality seal */}
      <g transform="translate(250,170)">
        <circle r="46" fill="#faf7f2" stroke="#c9a96e" strokeWidth="1.5" />
        <circle r="38" fill="none" stroke="#4a2c3a" strokeWidth="0.6" opacity="0.35" />
        <path d="M0 -22 C -5 -14, -8 -10, -8 -5 C -8 1, -4 5, 0 5 C 4 5, 8 1, 8 -5 C 8 -10, 5 -14, 0 -22 Z" fill="#c9a96e" />
        <text x="0" y="26" textAnchor="middle" fontFamily="'Inter', system-ui, sans-serif" fontSize="8" letterSpacing="2" fill="#4a2c3a">PREMIUM</text>
      </g>

      {/* discreet package motif, lower-left */}
      <g transform="translate(70,300)" opacity="0.85">
        <path d="M0 14 L24 4 L48 14 L48 44 L24 54 L0 44 Z" fill="none" stroke="#4a2c3a" strokeWidth="1.2" />
        <path d="M0 14 L24 24 L48 14" fill="none" stroke="#4a2c3a" strokeWidth="1.2" />
        <path d="M24 24 L24 54" fill="none" stroke="#4a2c3a" strokeWidth="1.2" />
      </g>

      {/* floating particles */}
      <g fill="#c9a96e" opacity="0.5">
        <circle cx="110" cy="80" r="2" />
        <circle cx="400" cy="120" r="2.2" />
        <circle cx="420" cy="320" r="1.8" />
        <circle cx="150" cy="350" r="1.6" />
      </g>
    </svg>
  );
}

export default React.memo(StoryIllustration);
