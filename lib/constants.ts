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

export const PRODUCT_TAGLINE = "Body wellness · plain packaging · prepaid India";
export const PRODUCT_SHORT_DESC =
  "A compact body-safe silicone massager for tension relief and everyday recovery — soft to the touch, waterproof, and easy to clean. Ships in a plain discreet carton with free delivery. Sold by KAPADIYA AND SONS (Silk Room), founded by Smit Kapadiya.";

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

/** Homepage hero carousel — product-first (what’s inside the plain box) */
export const HOME_START_SLIDES = [
  {
    src: "/products/natural/01-hero.png",
    alt: "Silk Room Ease Soft Rose — premium body-safe silicone massager",
  },
  {
    src: "/products/tongue-vibrator/s1.jpg",
    alt: "Silk Room Lick — quiet waterproof tongue vibrator",
  },
  {
    src: "/products/male-masturbator/p1.jpg",
    alt: "Silk Room Trio — 3-in-1 realistic male masturbator",
  },
  {
    src: "/products/natural/05-body-safe.png",
    alt: "Pure body-safe silicone — skin-friendly, worry-free moments",
  },
  {
    src: "/products/tongue-vibrator/s2.jpg",
    alt: "Silk Room Lick product features and compact design",
  },
  {
    src: "/products/male-masturbator/p2.jpg",
    alt: "Silk Room Trio detailed product presentation",
  },
] as const;

/** Product feature story — four reasons to buy */
export const HOME_STORY = [
  {
    src: "/products/natural/01-hero.png",
    title: "Meet Silk Room Ease",
    text: "The product inside the plain box — Soft Rose finish, lifelike feel, built for private relief at home.",
  },
  {
    src: "/products/natural/05-body-safe.png",
    title: "100% body-safe silicone",
    text: "Pure, skin-friendly material. No mystery plastics. Designed for comfort you can trust on your body.",
  },
  {
    src: "/products/espresso/04-waterproof.png",
    title: "Fully waterproof",
    text: "Bath, shower, or evening routine — easy to clean, easy to use, built for real life.",
  },
  {
    src: "/products/natural/04-dual-density.png",
    title: "Dual-density comfort",
    text: "Soft outer touch with a supportive core — premium feel that sells itself when you see it.",
  },
] as const;

/** Below-fold product focus panels */
export const HOME_EXTRA = {
  offer: "/brand/product-focus/body-safe.png",
  founder: "/products/natural/07-complete.png",
} as const;

/** Conversion slideshow — product truth + care */
export const HOME_SLIDESHOW = [
  {
    src: "/products/natural/03-lifelike.png",
    alt: "Lifelike Silk Room Ease detail — premium finish customers expect",
  },
  {
    src: "/products/espresso/02-design.png",
    alt: "Mist Grey Silk Room Ease — considered design and stable base",
  },
  {
    src: "/products/natural/07-complete.png",
    alt: "Complete kit presentation — India trust-first brand experience",
  },
] as const;

/** @deprecated kept for any remaining pack-size references */
export const PRODUCT_PACK_SIZE = "Complete kit";

/** Legacy aliases — prefer HOME_START_SLIDES / HOME_EXTRA */
export const HOME_HERO_IMAGE = HOME_START_SLIDES[0].src;
export const HOME_FEATURE_IMAGE = HOME_EXTRA.offer;
export const HOME_UGC = HOME_START_SLIDES.slice(0, 3);

export const BUSINESS = {
  name: "Silk Room",
  legalName: "KAPADIYA AND SONS",
  tradingAs: "Silk Room",
  founder: "Smit Kapadiya",
  entityType: "proprietorship",
  email: "kapadiya.working@gmail.com",
  phone: "+91 75758 07403",
  phoneDigits: "7575807403",
  whatsapp: "917575807403",
  grievanceEmail: "kapadiya.working@gmail.com",
  grievanceOfficer: "Smit Kapadiya",
  website: "https://silkroom.shop",
  address:
    "Surat, Gujarat, India — online retail of personal wellness products for adults aged 18+.",
  jurisdiction: "Surat, Gujarat, India",
  hours: "Monday–Saturday, 10:00 AM – 8:00 PM IST",
  gstin: "Available on invoice upon GST registration",
  acceptedPaymentMethods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets"],
  grievanceAcknowledgmentHours: 48,
  grievanceResolutionDays: 30,
  mission:
    "Silk Room was founded by Smit Kapadiya to deliver discreet, dignified relief for women — premium body wellness without stigma, noise, or confusion at the door.",
} as const;

export const POLICY_LINKS = [
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/contact", label: "Contact Us" },
  { href: "/cancellation-and-refunds", label: "Return & Refund Policy" },
] as const;

/** Primary navbar links */
export const NAV_MAIN_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#shop-all-products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Secondary navbar — policies & support */
export const NAV_SUPPORT_LINKS = [
  { href: "/shipping", label: "Shipping" },
  { href: "/cancellation-and-refunds", label: "Returns" },
  { href: "/replacement", label: "Warranty" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
