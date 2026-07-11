export const PRODUCT_PRICE = 599;
export const PRODUCT_NAME = "Silk Room Ease";
export const PRODUCT_ID = "silk-room-ease";
export const ALLOWED_VARIANTS = ["Soft Rose", "Mist Grey"] as const;

export const FALLBACK_STOCK: Record<string, number> = {
  "Soft Rose": 120,
  "Mist Grey": 120,
};

export const VARIANT_COLORS: Record<(typeof ALLOWED_VARIANTS)[number], string> = {
  "Soft Rose": "#c4a4a4",
  "Mist Grey": "#8a9099",
};

export const PRODUCT_TAGLINE = "Personal wellness massager";
export const PRODUCT_SHORT_DESC =
  "Targeted vibration for everyday muscle tension, cramps, and neck, shoulder, and back discomfort.";

/** @deprecated Use PRODUCT_TAGLINE — kept for any remaining pack-size references */
export const PRODUCT_PACK_SIZE = "Complete kit";

/** Business details shown on Contact / legal pages */
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
    "India — online retail of personal wellness massagers for everyday pain relief. For postal correspondence, email support@silkroom.co",
  jurisdiction: "Ahmedabad, Gujarat, India",
  hours: "Monday–Saturday, 10:00 AM – 6:00 PM IST",
  gstin: "Will be displayed here upon GST registration (if applicable)",
  acceptedPaymentMethods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets"],
  grievanceAcknowledgmentHours: 48,
  grievanceResolutionDays: 30,
} as const;

/** Footer / checkout policy links */
export const POLICY_LINKS = [
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/contact", label: "Contact Us" },
  { href: "/cancellation-and-refunds", label: "Return & Refund Policy" },
] as const;
