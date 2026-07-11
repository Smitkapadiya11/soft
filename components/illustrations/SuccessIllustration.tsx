import React from "react";

export interface SuccessIllustrationProps {
  className?: string;
  ariaHidden?: boolean;
}

/**
 * Success / order-confirmation illustration.
 * A premium checkmark inside a ring with radiating particles, in gold and plum.
 * The checkmark path exposes `id="success-check"` so a `pathLength` draw
 * animation can be applied to it.
 */
function SuccessIllustration({ className, ariaHidden = true }: SuccessIllustrationProps) {
  // radiating tick lines around the ring
  const rays = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r1 = 84;
    const r2 = 94;
    return {
      x1: 100 + Math.cos(angle) * r1,
      y1: 100 + Math.sin(angle) * r1,
      x2: 100 + Math.cos(angle) * r2,
      y2: 100 + Math.sin(angle) * r2,
    };
  });

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Order confirmed"}
    >
      <defs>
        <linearGradient id="success-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#e0c896" />
        </linearGradient>
        <linearGradient id="success-check-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#e0c896" />
        </linearGradient>
        <radialGradient id="success-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a2c3a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#4a2c3a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft glow */}
      <circle cx="100" cy="100" r="96" fill="url(#success-glow)" />

      {/* radiating lines */}
      <g stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        {rays.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </g>

      {/* ring */}
      <circle cx="100" cy="100" r="72" fill="#faf7f2" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="url(#success-ring)" strokeWidth="3" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="#4a2c3a" strokeWidth="0.75" opacity="0.25" />

      {/* check — id exposed for pathLength draw animation */}
      <path
        id="success-check"
        d="M70 102 L92 124 L132 80"
        fill="none"
        stroke="url(#success-check-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* sparkle particles */}
      <g fill="#c9a96e" opacity="0.7">
        <circle cx="44" cy="56" r="2.2" />
        <circle cx="158" cy="60" r="1.8" />
        <circle cx="150" cy="150" r="2.2" />
        <circle cx="50" cy="146" r="1.6" />
      </g>
    </svg>
  );
}

export default React.memo(SuccessIllustration);
