export const PRODUCT_PRICE = 599;
export const PRODUCT_NAME = "Silk Room Real Touch";
export const PRODUCT_ID = "silk-room-real-touch";
export const ALLOWED_VARIANTS = ["Natural", "Espresso"] as const;

export const FALLBACK_STOCK: Record<string, number> = {
  Natural: 100,
  Espresso: 100,
};

export const VARIANT_COLORS: Record<(typeof ALLOWED_VARIANTS)[number], string> = {
  Natural: "#e8b4a0",
  Espresso: "#5c3d2e",
};

export const PRODUCT_TAGLINE = "Premium dual-density silicone · discreet delivery";
export const PRODUCT_SHORT_DESC =
  "Body-safe dual-density liquid silicone with a soft outer feel, supportive core, secure base, and waterproof design — made for private, comfortable self-care at home.";

export const PRODUCT_SPECS = {
  totalLength: '8.3"',
  insertableLength: '6.3"',
  diameter: '1.6"',
  weight: "10.58 oz",
  material: "100% body-safe dual-density liquid silicone",
  waterproof: "Fully waterproof",
  base: "Industrial-strength suction cup",
} as const;

/** Lifestyle model cover — first in gallery for both variants (optimized JPG) */
export const PRODUCT_COVER_IMAGE = "/products/product-cover-model.jpg";

/** Gallery: lifestyle cover first, then product close-ups */
export const PRODUCT_GALLERY: Record<(typeof ALLOWED_VARIANTS)[number], string[]> = {
  Natural: [
    PRODUCT_COVER_IMAGE,
    "/products/natural/01-hero.png",
    "/products/natural/02-real-touch.png",
    "/products/natural/03-lifelike.png",
    "/products/natural/04-dual-density.png",
    "/products/natural/05-body-safe.png",
    "/products/natural/06-discreet.png",
    "/products/natural/07-complete.png",
  ],
  Espresso: [
    PRODUCT_COVER_IMAGE,
    "/products/espresso/01-realistic.png",
    "/products/espresso/02-design.png",
    "/products/espresso/03-size.png",
    "/products/espresso/04-waterproof.png",
    "/products/natural/06-discreet.png",
    "/products/natural/07-complete.png",
  ],
};

/** Lifestyle hero — full portrait on mobile */
export const HOME_HERO_IMAGE = "/products/home-hero.png";
/** Soft product presentation for below-fold featured section */
export const HOME_FEATURE_IMAGE = "/products/natural/01-hero.png";

/** @deprecated kept for any remaining pack-size references */
export const PRODUCT_PACK_SIZE = "Complete kit";

export const BUSINESS = {
  name: "Silk Room",
  legalName: "Silk Room",
  entityType: "proprietorship",
  email: "support@silkroom.co",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  grievanceEmail: "grievance@silkroom.co",
  grievanceOfficer: "Customer Grievance Officer",
  website: "https://silkroom.shop",
  address:
    "India — online retail of adult intimate wellness products for customers aged 18+. For postal correspondence, email support@silkroom.co",
  jurisdiction: "Ahmedabad, Gujarat, India",
  hours: "Monday–Saturday, 10:00 AM – 6:00 PM IST",
  gstin: "Will be displayed here upon GST registration (if applicable)",
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
