import React from "react";

export interface ComparisonIllustrationProps {
  className?: string;
  ariaHidden?: boolean;
}

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

/**
 * Side-by-side comparison of the two product variants.
 * Ultra Thin (left, light/blush theme) vs Dotted (right, dark/plum theme).
 */
function ComparisonIllustration({ className, ariaHidden = false }: ComparisonIllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Ultra Thin versus Dotted product comparison"}
    >
      <defs>
        <linearGradient id="cmp-ut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#faf7f2" />
          <stop offset="100%" stopColor="#f4e9e4" />
        </linearGradient>
        <linearGradient id="cmp-dt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2c3a" />
          <stop offset="100%" stopColor="#2a1721" />
        </linearGradient>
      </defs>

      {/* divider */}
      <line x1="300" y1="60" x2="300" y2="340" stroke="#c9a96e" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
      <circle cx="300" cy="200" r="20" fill="#faf7f2" stroke="#c9a96e" strokeWidth="1.2" />
      <text x="300" y="206" textAnchor="middle" fontFamily={SERIF} fontSize="13" fill="#4a2c3a">VS</text>

      {/* ===== Left: Ultra Thin ===== */}
      <g>
        <ellipse cx="150" cy="348" rx="86" ry="10" fill="#2a1721" opacity="0.12" />
        <rect x="80" y="70" width="140" height="268" rx="12" fill="url(#cmp-ut)" stroke="#c9a96e" strokeWidth="1.5" />
        <rect x="86" y="76" width="128" height="256" rx="8" fill="none" stroke="#c9a96e" strokeWidth="0.6" opacity="0.5" />
        <path d="M150 108 C 147 103, 143 101, 143 97 C 143 93, 146 91, 150 91 C 154 91, 157 93, 157 97 C 157 101, 153 103, 150 108 Z" fill="#c9a96e" />
        <text x="150" y="134" textAnchor="middle" fontFamily={SERIF} fontSize="15" letterSpacing="1" fill="#4a2c3a">Silk Room</text>
        <line x1="110" y1="146" x2="190" y2="146" stroke="#c9a96e" strokeWidth="0.8" />
        <text x="150" y="206" textAnchor="middle" fontFamily={SERIF} fontSize="19" fill="#4a2c3a">Ultra Thin</text>
        <line x1="125" y1="222" x2="175" y2="222" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
        <text x="150" y="244" textAnchor="middle" fontFamily={SANS} fontSize="8" letterSpacing="2" fill="#8a6a5a">PREMIUM QUALITY</text>
        <text x="150" y="318" textAnchor="middle" fontFamily={SANS} fontSize="10" fill="#8a6a5a">Pack of 10</text>
        <text x="150" y="388" textAnchor="middle" fontFamily={SERIF} fontSize="14" fill="#4a2c3a">Ultra Thin</text>
      </g>

      {/* ===== Right: Dotted ===== */}
      <g>
        <ellipse cx="450" cy="348" rx="86" ry="10" fill="#2a1721" opacity="0.18" />
        <rect x="380" y="70" width="140" height="268" rx="12" fill="url(#cmp-dt)" stroke="#c9a96e" strokeWidth="1.5" />
        <rect x="386" y="76" width="128" height="256" rx="8" fill="none" stroke="#c9a96e" strokeWidth="0.6" opacity="0.5" />
        <path d="M450 108 C 447 103, 443 101, 443 97 C 443 93, 446 91, 450 91 C 454 91, 457 93, 457 97 C 457 101, 453 103, 450 108 Z" fill="#c9a96e" />
        <text x="450" y="134" textAnchor="middle" fontFamily={SERIF} fontSize="15" letterSpacing="1" fill="#f4e9e4">Silk Room</text>
        <line x1="410" y1="146" x2="490" y2="146" stroke="#c9a96e" strokeWidth="0.8" />
        <text x="450" y="206" textAnchor="middle" fontFamily={SERIF} fontSize="19" fill="#f4e9e4">Dotted</text>
        <g fill="#c9a96e">
          <circle cx="436" cy="222" r="2.6" />
          <circle cx="450" cy="222" r="2.6" />
          <circle cx="464" cy="222" r="2.6" />
        </g>
        <text x="450" y="244" textAnchor="middle" fontFamily={SANS} fontSize="8" letterSpacing="2" fill="#e0c896">PREMIUM QUALITY</text>
        <text x="450" y="318" textAnchor="middle" fontFamily={SANS} fontSize="10" fill="#e0c896">Pack of 10</text>
        <text x="450" y="388" textAnchor="middle" fontFamily={SERIF} fontSize="14" fill="#4a2c3a">Dotted</text>
      </g>
    </svg>
  );
}

export default React.memo(ComparisonIllustration);
