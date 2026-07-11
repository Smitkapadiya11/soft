import React from "react";

export type ProductVariant = "Soft Rose" | "Mist Grey";
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
  variant = "Soft Rose",
  view = "front",
  className,
  ariaHidden = false,
}: ProductPackProps) {
  const isRose = variant === "Soft Rose";
  const colors = isRose
    ? {
        body: "#d4b5b5",
        bodyDark: "#c4a4a4",
        accent: "#c9a96e",
        text: "#4a2c3a",
        highlight: "#f4e9e4",
      }
    : {
        body: "#9aa0a8",
        bodyDark: "#8a9099",
        accent: "#c9a96e",
        text: "#2a3038",
        highlight: "#e8eaed",
      };

  const viewBox = view === "detail" || view === "lifestyle" ? "0 0 400 400" : "0 0 400 520";
  const label = `Silk Room Ease ${variant} wellness massager, ${view} view`;

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
        <linearGradient id={`pp-body-${isRose ? "rose" : "grey"}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.highlight} />
          <stop offset="45%" stopColor={colors.body} />
          <stop offset="100%" stopColor={colors.bodyDark} />
        </linearGradient>
        <radialGradient id="pp-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {(view === "front" || view === "side") && (
        <g>
          <ellipse cx="200" cy="490" rx="90" ry="12" fill="#2a1721" opacity="0.12" />
          <ellipse cx="200" cy="200" rx="140" ry="160" fill="url(#pp-glow)" />
          {/* Device body — elongated handheld massager */}
          <ellipse
            cx="200"
            cy="130"
            rx={view === "side" ? 48 : 56}
            ry={view === "side" ? 52 : 58}
            fill={`url(#pp-body-${isRose ? "rose" : "grey"})`}
            stroke={colors.accent}
            strokeWidth="1.5"
          />
          <rect
            x={view === "side" ? 158 : 152}
            y="160"
            width={view === "side" ? 84 : 96}
            height="240"
            rx="42"
            fill={`url(#pp-body-${isRose ? "rose" : "grey"})`}
            stroke={colors.accent}
            strokeWidth="1.5"
          />
          {/* Soft grip rings */}
          <ellipse cx="200" cy="280" rx={view === "side" ? 38 : 44} ry="8" fill={colors.bodyDark} opacity="0.35" />
          <ellipse cx="200" cy="320" rx={view === "side" ? 38 : 44} ry="8" fill={colors.bodyDark} opacity="0.35" />
          {/* Power button */}
          <circle cx="200" cy="370" r="14" fill={colors.highlight} stroke={colors.accent} strokeWidth="1.5" />
          <circle cx="200" cy="370" r="5" fill={colors.accent} />
          {/* Brand */}
          <text x="200" y="455" textAnchor="middle" fontFamily={SERIF} fontSize="18" fill={colors.text}>
            Silk Room Ease
          </text>
          <text x="200" y="478" textAnchor="middle" fontFamily={SANS} fontSize="12" fill={colors.text} opacity="0.7">
            {variant}
          </text>
        </g>
      )}

      {view === "detail" && (
        <g>
          <rect x="40" y="40" width="320" height="320" rx="24" fill={colors.highlight} />
          <circle cx="200" cy="180" r="88" fill={`url(#pp-body-${isRose ? "rose" : "grey"})`} stroke={colors.accent} strokeWidth="2" />
          <circle cx="200" cy="180" r="40" fill={colors.highlight} opacity="0.5" />
          <text x="200" y="300" textAnchor="middle" fontFamily={SERIF} fontSize="20" fill={colors.text}>
            Soft-touch silicone
          </text>
          <text x="200" y="328" textAnchor="middle" fontFamily={SANS} fontSize="13" fill={colors.text} opacity="0.75">
            5 vibration modes · USB-C charge
          </text>
        </g>
      )}

      {view === "lifestyle" && (
        <g>
          <rect x="20" y="40" width="360" height="320" rx="20" fill="#faf7f2" />
          <ellipse cx="200" cy="200" rx="70" ry="120" fill={`url(#pp-body-${isRose ? "rose" : "grey"})`} stroke={colors.accent} strokeWidth="1.5" />
          <circle cx="200" cy="280" r="12" fill={colors.highlight} stroke={colors.accent} strokeWidth="1" />
          <text x="200" y="355" textAnchor="middle" fontFamily={SERIF} fontSize="16" fill={colors.text}>
            Everyday relief, at home
          </text>
        </g>
      )}
    </svg>
  );
}

export default React.memo(ProductPack);
