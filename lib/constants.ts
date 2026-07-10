export const PRODUCT_PRICE = 299;
export const PRODUCT_NAME = "Silk Room Ultra Comfort";
export const PRODUCT_ID = "silk-room-ultra-comfort";
/** Two pack types — keep 2-variant structure */
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
  address: "India (online retail — contact support for correspondence)",
  jurisdiction: "Ahmedabad",
  hours: "Mon–Sat, 10am–6pm IST",
} as const;
