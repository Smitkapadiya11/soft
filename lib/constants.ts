export const PRODUCT_PRICE = 549;
export const ALLOWED_VARIANTS = ["Blush", "Plum"] as const;

/** Shown when inventory DB is unavailable — keeps storefront purchasable */
export const FALLBACK_STOCK: Record<string, number> = { Blush: 145, Plum: 120 };
