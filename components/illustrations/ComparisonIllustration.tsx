import React from "react";

export interface ComparisonIllustrationProps {
  className?: string;
  ariaHidden?: boolean;
}

const SERIF = "'Playfair Display', Georgia, serif";

/**
 * Soft Rose (left) vs Mist Grey (right) color comparison.
 */
function ComparisonIllustration({ className, ariaHidden = false }: ComparisonIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Soft Rose versus Mist Grey color comparison"}
    >
      <defs>
        <linearGradient id="cmp-rose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e9e4" />
          <stop offset="100%" stopColor="#c4a4a4" />
        </linearGradient>
        <linearGradient id="cmp-grey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8eaed" />
          <stop offset="100%" stopColor="#8a9099" />
        </linearGradient>
      </defs>

      {/* Soft Rose */}
      <rect x="40" y="40" width="220" height="340" rx="20" fill="#faf7f2" stroke="#e0c896" strokeWidth="1" />
      <ellipse cx="150" cy="140" rx="48" ry="52" fill="url(#cmp-rose)" stroke="#c9a96e" strokeWidth="1.5" />
      <rect x="110" y="170" width="80" height="160" rx="36" fill="url(#cmp-rose)" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="150" cy="300" r="10" fill="#f4e9e4" stroke="#c9a96e" strokeWidth="1" />
      <text x="150" y="370" textAnchor="middle" fontFamily={SERIF} fontSize="18" fill="#4a2c3a">
        Soft Rose
      </text>

      {/* Mist Grey */}
      <rect x="340" y="40" width="220" height="340" rx="20" fill="#f4f5f6" stroke="#c9a96e" strokeWidth="1" />
      <ellipse cx="450" cy="140" rx="48" ry="52" fill="url(#cmp-grey)" stroke="#c9a96e" strokeWidth="1.5" />
      <rect x="410" y="170" width="80" height="160" rx="36" fill="url(#cmp-grey)" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="450" cy="300" r="10" fill="#e8eaed" stroke="#c9a96e" strokeWidth="1" />
      <text x="450" y="370" textAnchor="middle" fontFamily={SERIF} fontSize="18" fill="#2a3038">
        Mist Grey
      </text>
    </svg>
  );
}

export default React.memo(ComparisonIllustration);
