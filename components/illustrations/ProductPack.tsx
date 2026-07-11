import React from "react";

export type ProductVariant = "Ultra Thin" | "Dotted";
export type ProductView = "front" | "side" | "detail" | "lifestyle";

export interface ProductPackProps {
  variant?: ProductVariant;
  view?: ProductView;
  className?: string;
  ariaHidden?: boolean;
}

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

function ProductPack({
  variant = "Ultra Thin",
  view = "front",
  className,
  ariaHidden = false,
}: ProductPackProps) {
  const isUltra = variant === "Ultra Thin";
  const colors = isUltra
    ? {
        face: "url(#pp-ut-face)",
        faceSolid: "#f4e9e4",
        edge: "#e0c896",
        accent: "#c9a96e",
        text: "#4a2c3a",
        sub: "#8a6a5a",
      }
    : {
        face: "url(#pp-dt-face)",
        faceSolid: "#4a2c3a",
        edge: "#2a1721",
        accent: "#c9a96e",
        text: "#f4e9e4",
        sub: "#e0c896",
      };

  const viewBox = view === "detail" || view === "lifestyle" ? "0 0 400 400" : "0 0 400 520";
  const label = `Silk Room ${variant} product pack, ${view} view`;

  return (
    <svg
      className={className}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : label}
    >
      <defs>
        <linearGradient id="pp-ut-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#faf7f2" />
          <stop offset="100%" stopColor="#f4e9e4" />
        </linearGradient>
        <linearGradient id="pp-dt-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2c3a" />
          <stop offset="100%" stopColor="#2a1721" />
        </linearGradient>
        <radialGradient id="pp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {view === "front" && (
        <g>
          <ellipse cx="200" cy="498" rx="118" ry="13" fill="#2a1721" opacity="0.14" />
          <rect x="72" y="44" width="256" height="448" rx="16" fill={colors.face} stroke={colors.accent} strokeWidth="1.5" />
          <rect x="82" y="54" width="236" height="428" rx="11" fill="none" stroke={colors.accent} strokeWidth="0.75" opacity="0.6" />
          {/* brand droplet mark */}
          <path d="M200 92 C 196 86, 190 84, 190 78 C 190 72, 195 70, 200 70 C 205 70, 210 72, 210 78 C 210 84, 204 86, 200 92 Z" fill={colors.accent} opacity="0.9" />
          <text x="200" y="130" textAnchor="middle" fontFamily={SERIF} fontSize="25" letterSpacing="2" fill={colors.text}>Silk Room</text>
          <line x1="130" y1="148" x2="270" y2="148" stroke={colors.accent} strokeWidth="1" />
          <text x="200" y="252" textAnchor="middle" fontFamily={SERIF} fontSize="30" fill={colors.text}>{variant}</text>
          {isUltra ? (
            <line x1="165" y1="276" x2="235" y2="276" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
          ) : (
            <g fill={colors.accent}>
              <circle cx="182" cy="276" r="3" />
              <circle cx="200" cy="276" r="3" />
              <circle cx="218" cy="276" r="3" />
            </g>
          )}
          <text x="200" y="306" textAnchor="middle" fontFamily={SANS} fontSize="11" letterSpacing="3" fill={colors.sub}>PREMIUM QUALITY</text>
          <line x1="160" y1="448" x2="240" y2="448" stroke={colors.accent} strokeWidth="0.75" opacity="0.7" />
          <text x="200" y="438" textAnchor="middle" fontFamily={SANS} fontSize="13" letterSpacing="1" fill={colors.sub}>Pack of 10</text>
        </g>
      )}

      {view === "side" && (
        <g>
          <ellipse cx="220" cy="494" rx="135" ry="13" fill="#2a1721" opacity="0.13" />
          {/* right side face */}
          <path d="M290 90 L326 68 L326 448 L290 470 Z" fill={colors.edge} stroke={colors.accent} strokeWidth="1" />
          {/* top face */}
          <path d="M110 90 L290 90 L326 68 L146 68 Z" fill={colors.faceSolid} opacity="0.92" stroke={colors.accent} strokeWidth="1" />
          {/* front face */}
          <rect x="110" y="90" width="180" height="380" rx="6" fill={colors.face} stroke={colors.accent} strokeWidth="1.5" />
          {/* discreet label */}
          <rect x="138" y="250" width="124" height="74" rx="6" fill="none" stroke={colors.sub} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.55" />
          <text x="200" y="294" textAnchor="middle" fontFamily={SANS} fontSize="10" letterSpacing="2" fill={colors.sub} opacity="0.75">DISCREET PACKAGING</text>
          {/* seal */}
          <circle cx="200" cy="168" r="17" fill="none" stroke={colors.accent} strokeWidth="1" />
          <text x="200" y="173" textAnchor="middle" fontFamily={SERIF} fontSize="12" fill={colors.accent}>SR</text>
          <text x="200" y="386" textAnchor="middle" fontFamily={SANS} fontSize="9" letterSpacing="2" fill={colors.sub} opacity="0.7">PLAIN OUTER BOX</text>
        </g>
      )}

      {view === "detail" && (
        <g>
          <rect x="40" y="40" width="320" height="320" rx="20" fill={colors.face} stroke={colors.accent} strokeWidth="1.5" />
          <rect x="50" y="50" width="300" height="300" rx="15" fill="none" stroke={colors.accent} strokeWidth="0.6" opacity="0.5" />
          {isUltra ? (
            <g>
              <path d="M70 110 C 160 70, 250 150, 330 100 L 330 140 C 250 190, 160 110, 70 150 Z" fill="#ffffff" opacity="0.28" />
              <path d="M70 240 C 160 200, 250 280, 330 230 L 330 270 C 250 320, 160 240, 70 280 Z" fill="#ffffff" opacity="0.12" />
              <text x="200" y="345" textAnchor="middle" fontFamily={SERIF} fontSize="15" fill={colors.text}>Silk-smooth finish</text>
            </g>
          ) : (
            <g fill={colors.accent}>
              {Array.from({ length: 7 }).map((_, row) =>
                Array.from({ length: 7 }).map((_, col) => (
                  <circle key={`d-${row}-${col}`} cx={80 + col * 40} cy={80 + row * 40} r="5" />
                ))
              )}
              <text x="200" y="345" textAnchor="middle" fontFamily={SERIF} fontSize="15" fill={colors.text}>Raised dotted texture</text>
            </g>
          )}
        </g>
      )}

      {view === "lifestyle" && (
        <g>
          <circle cx="200" cy="180" r="150" fill="url(#pp-glow)" />
          {/* nightstand */}
          <rect x="60" y="296" width="280" height="16" rx="4" fill="#4a2c3a" />
          <rect x="78" y="312" width="12" height="74" fill="#2a1721" />
          <rect x="310" y="312" width="12" height="74" fill="#2a1721" />
          {/* product pack on table */}
          <g transform="translate(96,172)">
            <ellipse cx="50" cy="126" rx="44" ry="7" fill="#2a1721" opacity="0.16" />
            <rect x="14" y="8" width="72" height="118" rx="8" fill={colors.face} stroke={colors.accent} strokeWidth="1.25" />
            <text x="50" y="40" textAnchor="middle" fontFamily={SERIF} fontSize="11" fill={colors.text}>Silk Room</text>
            <line x1="26" y1="48" x2="74" y2="48" stroke={colors.accent} strokeWidth="0.75" />
            <text x="50" y="76" textAnchor="middle" fontFamily={SERIF} fontSize="13" fill={colors.text}>{isUltra ? "Ultra Thin" : "Dotted"}</text>
            <text x="50" y="112" textAnchor="middle" fontFamily={SANS} fontSize="7" letterSpacing="1" fill={colors.sub}>PACK OF 10</text>
          </g>
          {/* candle */}
          <g transform="translate(252,212)">
            <rect x="0" y="40" width="34" height="54" rx="4" fill="#f4e9e4" stroke="#c9a96e" strokeWidth="1" />
            <rect x="0" y="40" width="34" height="9" rx="4" fill="#e0c896" />
            <line x1="17" y1="30" x2="17" y2="42" stroke="#4a2c3a" strokeWidth="1.5" />
            <path d="M17 30 C 13 24, 21 22, 17 13 C 13 22, 21 24, 17 30 Z" fill="#c9a96e" />
            <path d="M17 28 C 14 24, 20 22, 17 16 C 14 22, 20 24, 17 28 Z" fill="#e0c896" />
          </g>
        </g>
      )}
    </svg>
  );
}

export default React.memo(ProductPack);
