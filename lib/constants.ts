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

/** Homepage hero — product + model pairs rotate every 4s (full-bleed fitted) */
export const HOME_START_SLIDES = [
  {
    src: "/brand/home/hero-box-ease.png",
    alt: "Silk Room Ease — premium unmarked plain-box delivery",
    fit: "contain" as const,
    label: "Ease · plain-box delivery",
  },
  {
    src: "/brand/home/card-model-ease.png",
    alt: "Silk Room Ease — discreet personal wellness",
    fit: "cover" as const,
    label: "Ease · lifestyle",
  },
  {
    src: "/brand/home/hero-box-lick.png",
    alt: "Silk Room Lick — discreet premium plain-box delivery",
    fit: "contain" as const,
    label: "Lick · plain-box delivery",
  },
  {
    src: "/brand/home/card-model-lick.png",
    alt: "Silk Room Lick — quiet waterproof care",
    fit: "cover" as const,
    label: "Lick · lifestyle",
  },
  {
    src: "/brand/home/hero-box-trio.png",
    alt: "Silk Room Trio — discreet premium plain-box delivery",
    fit: "contain" as const,
    label: "Trio · plain-box delivery",
  },
  {
    src: "/brand/home/card-model-trio.png",
    alt: "Silk Room Trio — men’s personal care",
    fit: "cover" as const,
    label: "Trio · lifestyle",
  },
  {
    src: "/products/chulli-ultra-banana/01.jpg",
    alt: "Chulli Ultra Banana — product pack",
    fit: "contain" as const,
    label: "Chulli Ultra · Banana",
  },
  {
    src: "/products/chulli-ultra-banana/07.jpg",
    alt: "Chulli Ultra — lifestyle",
    fit: "cover" as const,
    label: "Chulli Ultra · lifestyle",
  },
  {
    src: "/products/chulli-dot-chocolate/01.jpg",
    alt: "Chulli Dotted Chocolate — product pack",
    fit: "contain" as const,
    label: "Chulli Dotted · Chocolate",
  },
  {
    src: "/products/chulli-dot-chocolate/07.jpg",
    alt: "Chulli Dotted — lifestyle",
    fit: "cover" as const,
    label: "Chulli Dotted · lifestyle",
  },
  {
    src: "/products/chulli-combo-mix/028.jpg",
    alt: "Chulli Combo Mix — full flavour lineup",
    fit: "contain" as const,
    label: "Chulli Combo Mix · all 6 flavours",
  },
  {
    src: "/products/plain-box.png",
    alt: "Plain unmarked Silk Room delivery box",
    fit: "contain" as const,
    label: "Privacy · unmarked carton",
  },
] as const;

/** Trust story — text-only trust markers */
export const HOME_STORY = [
  {
    title: "See every product clearly",
    text: "Ease, Lick, Trio, and Chulli care — real photos, honest prices, and plain-box delivery before you pay.",
  },
  {
    title: "Body-safe craft",
    text: "Premium materials and clear specs. No mystery plastics. Comfort you can trust on your body.",
  },
  {
    title: "Privacy at the door",
    text: "Free unmarked cartons across India. Prepaid Razorpay checkout. WhatsApp support that answers.",
  },
  {
    title: "One Silk Room standard",
    text: "From dual-density wellness to flavoured care — the same discreet, care-first brand behind every box.",
  },
] as const;

/** Below-fold panels — discreet packaging visuals only */
export const HOME_EXTRA = {
  offer: "/brand/home/hero-box-ease.png",
  founder: "/products/plain-box.png",
} as const;

/** Conversion slideshow — 4s product + model rhythm */
export const HOME_SLIDESHOW = [
  {
    src: "/products/natural/01-hero.png",
    alt: "Silk Room Ease — actual product",
  },
  {
    src: "/brand/home/card-model-ease.png",
    alt: "Silk Room Ease — discreet personal wellness",
  },
  {
    src: "/products/silk-lick/s1.jpg",
    alt: "Silk Room Lick — actual product",
  },
  {
    src: "/brand/home/card-model-lick.png",
    alt: "Silk Room Lick — quiet waterproof care",
  },
  {
    src: "/products/silk-trio/p1.jpg",
    alt: "Silk Room Trio — actual product",
  },
  {
    src: "/brand/home/card-model-trio.png",
    alt: "Silk Room Trio — men’s personal care",
  },
  {
    src: "/products/chulli-combo-mix/028.jpg",
    alt: "Chulli full flavour lineup",
  },
  {
    src: "/products/plain-box.png",
    alt: "Plain unmarked Silk Room delivery box — privacy first",
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
