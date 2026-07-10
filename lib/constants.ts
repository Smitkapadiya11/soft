export const PRODUCT_PRICE = 549;
export const PRODUCT_NAME = "Deep Relief Massager";
export const PRODUCT_ID = "silk-room-deep-relief";
export const ALLOWED_VARIANTS = ["Pearl", "Sage"] as const;

/** Shown when inventory DB is unavailable — keeps storefront purchasable */
export const FALLBACK_STOCK: Record<string, number> = { Pearl: 145, Sage: 120 };

export const VARIANT_COLORS: Record<(typeof ALLOWED_VARIANTS)[number], string> = {
  Pearl: "#e8e6e3",
  Sage: "#8a9a7b",
};

export const BUSINESS = {
  name: "Silk Room",
  legalName: "Silk Room",
  email: "support@silkroom.co",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  grievanceEmail: "grievance@silkroom.co",
  grievanceOfficer: "Customer Grievance Officer",
  website: "https://silkroom.shop",
} as const;
