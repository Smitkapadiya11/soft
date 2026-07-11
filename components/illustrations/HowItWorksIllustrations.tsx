import React from "react";

export interface HowItWorksIconProps {
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

/** Step 1 — browsing products on a device. */
function BrowseStepIconBase({ className, size = 64 }: HowItWorksIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        {/* device */}
        <rect x="12" y="6" width="24" height="36" rx="4" />
        <path d="M12 11 L36 11" opacity="0.5" />
        <path d="M21 38 L27 38" />
        {/* product cards on screen */}
        <rect x="16" y="15" width="16" height="9" rx="1.5" />
        <circle cx="20" cy="19.5" r="1.6" />
        <path d="M27 21 L30 18.5" opacity="0.6" />
        <rect x="16" y="27" width="16" height="7" rx="1.5" />
        <circle cx="20" cy="30.5" r="1.4" />
      </g>
    </svg>
  );
}

/** Step 2 — secure checkout / shopping cart. */
function OrderStepIconBase({ className, size = 64 }: HowItWorksIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        <path d="M6 10 L12 10 L16 32 L38 32 L42 16 L14 16" />
        <circle cx="19" cy="39" r="2.6" />
        <circle cx="34" cy="39" r="2.6" />
        {/* secure lock badge */}
        <rect x="30" y="4" width="12" height="9" rx="2" />
        <path d="M32.5 4 L32.5 2.6 C32.5 1.4, 33.3 0.6, 34.3 0.6 L37.7 0.6 C38.7 0.6, 39.5 1.4, 39.5 2.6 L39.5 4" />
        <path d="M35 6.5 L35 8.5" />
      </g>
    </svg>
  );
}

/** Step 3 — discreet package at a doorstep. */
function DeliveryStepIconBase({ className, size = 64 }: HowItWorksIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g {...stroke}>
        {/* door frame */}
        <path d="M8 42 L8 14 C8 12, 9 11, 11 11 L26 11 C28 11, 29 12, 29 14 L29 42" />
        <path d="M8 42 L40 42" />
        {/* doorstep package */}
        <rect x="30" y="28" width="12" height="14" rx="1.5" />
        <path d="M30 34 L42 34" />
        <path d="M33 28 L33 24 L39 24 L39 28" />
      </g>
    </svg>
  );
}

export const BrowseStepIcon = React.memo(BrowseStepIconBase);
export const OrderStepIcon = React.memo(OrderStepIconBase);
export const DeliveryStepIcon = React.memo(DeliveryStepIconBase);
