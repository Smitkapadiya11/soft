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

/** Lifestyle wellness hero for Meta landing match */
export const HOME_HERO_IMAGE = "/brand/story/01-arrival.png";
/** Plain brown carton for below-fold featured section (Meta-safe) */
export const HOME_FEATURE_IMAGE = "/products/plain-box.png";

/** Homepage UGC strip — replaces full-bleed hero */
export const HOME_UGC = [
  {
    src: "/brand/ugc/01-arrived.png",
    alt: "Customer holding discreet Silk Room delivery — finally arrived, plain box",
  },
  {
    src: "/brand/ugc/02-relief.png",
    alt: "Customer at home after delivery — relief from tension and stress",
  },
  {
    src: "/brand/ugc/03-order.png",
    alt: "Hands on Silk Room parcel — ₹599 sale, free discreet delivery",
  },
] as const;

/** Homepage opening carousel — full-fit images, no crop */
export const HOME_START_SLIDES = [
  ...HOME_UGC,
  {
    src: "/brand/slides/01-sale.png",
    alt: "Silk Room Ease limited sale — ₹599, MRP ₹2,999, 80% off, no coupon needed",
  },
  {
    src: "/brand/slides/02-delivery.png",
    alt: "Free discreet delivery — plain outer box, no product name, pan-India shipping",
  },
  {
    src: "/brand/slides/03-secure.png",
    alt: "Razorpay secure checkout — UPI, cards, net banking, 6-month warranty, adults 18+",
  },
] as const;

/** Homepage brand story — order matters (Meta trust rebuild) */
export const HOME_STORY = [
  {
    src: "/brand/story/01-arrival.png",
    title: "It arrives quietly",
    text: "A plain carton. No product name outside. Your privacy is protected from the first knock.",
  },
  {
    src: "/brand/story/02-relief.png",
    title: "Relief you can feel",
    text: "Built for tension, stress, fatigue, and restless evenings — everyday body comfort, privately.",
  },
  {
    src: "/brand/story/03-trust.png",
    title: "A brand you can trust",
    text: "Real people. Clear policies. Razorpay prepaid checkout. Support that answers on WhatsApp.",
  },
  {
    src: "/brand/story/04-care.png",
    title: "Handled with care",
    text: "From packing to delivery, every order is treated as personal — because comfort is personal.",
  },
] as const;

export const HOME_EXTRA = {
  morning: "/brand/morning-calm.png",
  discreet: "/brand/discreet-desk.png",
} as const;

/** Premium slideshow — proof / conversion section */
export const HOME_SLIDESHOW = [
  {
    src: "/brand/slides/01-sale.png",
    alt: "Silk Room Ease limited sale — ₹599, MRP ₹2,999, 80% off, no coupon needed",
  },
  {
    src: "/brand/slides/02-delivery.png",
    alt: "Free discreet delivery — plain outer box, no product name, pan-India shipping",
  },
  {
    src: "/brand/slides/03-secure.png",
    alt: "Razorpay secure checkout — UPI, cards, net banking, 6-month warranty, adults 18+",
  },
] as const;

/** @deprecated kept for any remaining pack-size references */
export const PRODUCT_PACK_SIZE = "Complete kit";

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
  { href: "/product", label: "Shop" },
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
