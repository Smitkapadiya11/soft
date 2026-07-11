import React from "react";

export interface QualityBadgeProps {
  className?: string;
  size?: number;
}

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

function Medallion({
  children,
  label,
  size = 120,
  className,
}: QualityBadgeProps & { children: React.ReactNode; label: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.14}
      viewBox="0 0 140 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      aria-label={label}
    >
      {/* outer ring */}
      <circle cx="70" cy="66" r="50" fill="#faf7f2" stroke="#c9a96e" strokeWidth="1.5" />
      <circle cx="70" cy="66" r="44" fill="none" stroke="#4a2c3a" strokeWidth="0.6" opacity="0.3" />
      <circle cx="70" cy="66" r="40" fill="#f4e9e4" />
      {children}
      {/* label */}
      <text
        x="70"
        y="140"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="8.5"
        letterSpacing="1.2"
        fill="#4a2c3a"
        fontWeight={600}
      >
        {label}
      </text>
    </svg>
  );
}

/** Dermatologically tested — a skin/shield with a smooth swoosh. */
function DermatologicallyTestedBadgeBase({ className, size = 120 }: QualityBadgeProps) {
  return (
    <Medallion className={className} size={size} label="DERMATOLOGICALLY TESTED">
      <g transform="translate(70,66)">
        <path
          d="M0 -26 L20 -18 L20 6 C20 20, 11 28, 0 32 C-11 28, -20 20, -20 6 L-20 -18 Z"
          fill="none"
          stroke="#4a2c3a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M-11 -2 C -4 -8, 6 0, 12 -6"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M-11 8 C -4 2, 6 10, 12 4"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </Medallion>
  );
}

/** ISO compliant — certification disc with "ISO" and a check. */
function ISOCompliantBadgeBase({ className, size = 120 }: QualityBadgeProps) {
  return (
    <Medallion className={className} size={size} label="ISO COMPLIANT">
      <g transform="translate(70,66)">
        <circle r="24" fill="none" stroke="#4a2c3a" strokeWidth="2" />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily={SERIF}
          fontSize="15"
          fill="#4a2c3a"
          letterSpacing="1"
        >
          ISO
        </text>
        <path
          d="M-12 16 L-4 24 L13 9"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Medallion>
  );
}

/** Latex quality — a latex droplet with a check mark. */
function LatexQualityBadgeBase({ className, size = 120 }: QualityBadgeProps) {
  return (
    <Medallion className={className} size={size} label="LATEX QUALITY">
      <g transform="translate(70,66)">
        <path
          d="M0 -28 C -8 -16, -15 -8, -15 0 C -15 11, -8 19, 0 19 C 8 19, 15 11, 15 0 C 15 -8, 8 -16, 0 -28 Z"
          fill="none"
          stroke="#4a2c3a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M-8 1 L-2 8 L9 -5"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Medallion>
  );
}

/** Made in India — an Ashoka-chakra style wheel. */
function MadeInIndiaBadgeBase({ className, size = 120 }: QualityBadgeProps) {
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    return {
      x2: Math.cos(a) * 22,
      y2: Math.sin(a) * 22,
    };
  });
  return (
    <Medallion className={className} size={size} label="MADE IN INDIA">
      <g transform="translate(70,66)">
        <circle r="23" fill="none" stroke="#4a2c3a" strokeWidth="2" />
        <circle r="4" fill="#4a2c3a" />
        <g stroke="#4a2c3a" strokeWidth="0.9">
          {spokes.map((s, i) => (
            <line key={i} x1="0" y1="0" x2={s.x2} y2={s.y2} />
          ))}
        </g>
      </g>
    </Medallion>
  );
}

export const DermatologicallyTestedBadge = React.memo(DermatologicallyTestedBadgeBase);
export const ISOCompliantBadge = React.memo(ISOCompliantBadgeBase);
export const LatexQualityBadge = React.memo(LatexQualityBadgeBase);
export const MadeInIndiaBadge = React.memo(MadeInIndiaBadgeBase);
