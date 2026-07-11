import React from "react";

export interface TrustIconProps {
  className?: string;
  size?: number;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A plain, unbranded shipping box (discreet packaging). */
function DiscreetPackageIconBase({ className, size = 48 }: TrustIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        <path d="M8 16 L24 8 L40 16 L40 36 L24 44 L8 36 Z" />
        <path d="M8 16 L24 24 L40 16" />
        <path d="M24 24 L24 44" />
        <path d="M16 12 L32 20" opacity="0.5" />
      </g>
    </svg>
  );
}

/** A delivery van. */
function DeliveryIconBase({ className, size = 48 }: TrustIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        <rect x="4" y="14" width="24" height="16" rx="2" />
        <path d="M28 20 L36 20 L42 26 L42 30 L28 30 Z" />
        <circle cx="14" cy="34" r="3.2" />
        <circle cx="34" cy="34" r="3.2" />
        <path d="M17 34 L31 34" opacity="0.5" />
      </g>
    </svg>
  );
}

/** A shield combined with a padlock (secure payment). */
function SecurePaymentIconBase({ className, size = 48 }: TrustIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        <path d="M24 6 L40 12 L40 24 C40 33 33 40 24 42 C15 40 8 33 8 24 L8 12 Z" />
        <rect x="18" y="22" width="12" height="10" rx="2" />
        <path d="M20 22 L20 18 C20 15, 22 13, 24 13 C26 13, 28 15, 28 18 L28 22" />
      </g>
    </svg>
  );
}

/** A factory-sealed package with a verification check. */
function SealedProductIconBase({ className, size = 48 }: TrustIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        <rect x="8" y="12" width="32" height="28" rx="3" />
        <path d="M8 24 L40 24" />
        <circle cx="24" cy="24" r="6" />
        <path d="M21 24 L23.2 26.2 L27.2 21.8" />
        <path d="M14 36 L34 36" opacity="0.4" />
      </g>
    </svg>
  );
}

/** A circular refresh / return arrow. */
function ReturnPolicyIconBase({ className, size = 48 }: TrustIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        <path d="M40 24 A16 16 0 1 1 24 8" />
        <polyline points="18,8 24,8 24,14" />
      </g>
    </svg>
  );
}

/** Two overlapping hearts (couples / intimacy). */
function CouplesIconBase({ className, size = 48 }: TrustIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        <path d="M16 36 C 7 29, 7 18, 14 18 C 17.5 18, 19.5 20.5, 20.5 23 C 21.5 20.5, 23.5 18, 27 18 C 34 18, 34 29, 25 36 L20.5 40 Z" />
        <path d="M31 31 C 26.5 27.5, 26.5 21.5, 29.5 21.5 C 31 21.5, 32 22.8, 32.5 24 C 33 22.8, 34 21.5, 35.5 21.5 C 38.5 21.5, 38.5 27.5, 34 31 L32.5 32.2" />
      </g>
    </svg>
  );
}

export const DiscreetPackageIcon = React.memo(DiscreetPackageIconBase);
export const DeliveryIcon = React.memo(DeliveryIconBase);
export const SecurePaymentIcon = React.memo(SecurePaymentIconBase);
export const SealedProductIcon = React.memo(SealedProductIconBase);
export const ReturnPolicyIcon = React.memo(ReturnPolicyIconBase);
export const CouplesIcon = React.memo(CouplesIconBase);
