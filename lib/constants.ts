export const PRODUCT_PRICE = 299;
export const PRODUCT_NAME = "Silk Room Ultra Comfort";
export const PRODUCT_ID = "silk-room-ultra-comfort";
export const ALLOWED_VARIANTS = ["Ultra Thin", "Dotted"] as const;

export const FALLBACK_STOCK: Record<string, number> = {
  "Ultra Thin": 200,
  Dotted: 180,
};

export const VARIANT_COLORS: Record<(typeof ALLOWED_VARIANTS)[number], string> = {
  "Ultra Thin": "#f4e9e4",
  Dotted: "#4a2c3a",
};

export const PRODUCT_PACK_SIZE = "Pack of 10";

/** Business details shown on Contact / legal pages — Razorpay website review reads these */
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
  address: "India — online retail of condoms and sexual wellness products. For postal correspondence, email support@silkroom.co",
  jurisdiction: "Ahmedabad, Gujarat, India",
  hours: "Monday–Saturday, 10:00 AM – 6:00 PM IST",
  gstin: "Will be displayed here upon GST registration (if applicable)",
  acceptedPaymentMethods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets"],
  grievanceAcknowledgmentHours: 48,
  grievanceResolutionDays: 30,
} as const;

/** Exact policy links Razorpay website review expects */
export const POLICY_LINKS = [
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/contact", label: "Contact Us" },
  { href: "/cancellation-and-refunds", label: "Cancellation and Refunds" },
] as const;
