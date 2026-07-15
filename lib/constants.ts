/** Charged / checkout price (sale) — server payment authority */
export const PRODUCT_PRICE = 599;

/** Listed MRP for sale UI only — not charged. 80% off → ₹599 */
export const PRODUCT_MRP = 2999;

/** Exact off % for sale badge (no coupon — direct discounted price) */
export const PRODUCT_DISCOUNT_PERCENT = Math.round(
  ((PRODUCT_MRP - PRODUCT_PRICE) / PRODUCT_MRP) * 100
);
export const PRODUCT_NAME = "Silk Room Ease";
export const PRODUCT_ID = "silk-room-ease";

/** DB / API inventory keys — do not rename without a stock migration */
export const ALLOWED_VARIANTS = ["Natural", "Espresso"] as const;

/** Friendly Meta-safe labels shown in UI */
export const VARIANT_LABELS: Record<(typeof ALLOWED_VARIANTS)[number], string> = {
  Natural: "Soft Rose",
  Espresso: "Mist Grey",
};

export function variantLabel(variant: string): string {
  if (variant in VARIANT_LABELS) {
    return VARIANT_LABELS[variant as (typeof ALLOWED_VARIANTS)[number]];
  }
  return variant;
}

export const FALLBACK_STOCK: Record<string, number> = {
  Natural: 100,
  Espresso: 100,
};

export const VARIANT_COLORS: Record<(typeof ALLOWED_VARIANTS)[number], string> = {
  Natural: "#e8b4a0",
  Espresso: "#8a9098",
};

export const PRODUCT_TAGLINE = "Body wellness massager · discreet delivery";
export const PRODUCT_SHORT_DESC =
  "A compact body-safe silicone massager for tension relief and everyday recovery — soft to the touch, waterproof, and easy to clean. Ships in plain discreet packaging.";

export const PRODUCT_SPECS = {
  length: '8.3"',
  contactLength: '6.3"',
  diameter: '1.6"',
  weight: "10.58 oz",
  material: "100% body-safe silicone",
  waterproof: "Fully waterproof",
  form: "Compact handheld design",
  base: "Stable base for hands-free use during recovery",
} as const;

/** Lifestyle wellness cover — first in gallery for both variants */
export const PRODUCT_COVER_IMAGE = "/products/product-cover-model.jpg";

/** Gallery: Meta-safer lifestyle + packaging first; realistic shapes omitted */
export const PRODUCT_GALLERY: Record<(typeof ALLOWED_VARIANTS)[number], string[]> = {
  Natural: [
    PRODUCT_COVER_IMAGE,
    "/products/plain-box.png",
    "/products/natural/05-body-safe.png",
    "/products/natural/07-complete.png",
    "/products/natural/04-dual-density.png",
  ],
  Espresso: [
    PRODUCT_COVER_IMAGE,
    "/products/plain-box.png",
    "/products/espresso/04-waterproof.png",
    "/products/natural/07-complete.png",
    "/products/espresso/02-design.png",
  ],
};

/** Lifestyle wellness hero for Meta landing match */
export const HOME_HERO_IMAGE = "/products/product-cover-model.jpg";
/** Plain brown carton for below-fold featured section (Meta-safe) */
export const HOME_FEATURE_IMAGE = "/products/plain-box.png";

/** @deprecated kept for any remaining pack-size references */
export const PRODUCT_PACK_SIZE = "Complete kit";

export const BUSINESS = {
  name: "Silk Room",
  legalName: "Silk Room",
  entityType: "proprietorship",
  email: "support@silkroom.co",
  phone: "Contact via support@silkroom.co",
  whatsapp: "917575807403",
  grievanceEmail: "grievance@silkroom.co",
  grievanceOfficer: "Customer Grievance Officer",
  website: "https://silkroom.shop",
  address:
    "Surat, Gujarat, India — online retail of personal wellness products for adults aged 18+.",
  jurisdiction: "Surat, Gujarat, India",
  hours: "Monday–Saturday, 10:00 AM – 6:00 PM IST",
  gstin: "Available on invoice upon GST registration",
  acceptedPaymentMethods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets"],
  grievanceAcknowledgmentHours: 48,
  grievanceResolutionDays: 30,
} as const;

export const POLICY_LINKS = [
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/contact", label: "Contact Us" },
  { href: "/cancellation-and-refunds", label: "Return & Refund Policy" },
] as const;
