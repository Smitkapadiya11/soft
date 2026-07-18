import {
  PRODUCT_GALLERY,
  PRODUCT_ID,
  PRODUCT_MRP,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_SHORT_DESC,
  VARIANT_COLORS,
  VARIANT_LABELS,
} from "./constants";

export const TONGUE_VIBRATOR_ID = "tongue-vibrator";
export const MALE_MASTURBATOR_ID = "3-in-1-male-masturbator";

export const INVENTORY_SKUS = [
  "Natural",
  "Espresso",
  "TongueVibrator",
  "MaleMasturbator",
] as const;

export type InventorySku = (typeof INVENTORY_SKUS)[number];

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  mrp?: number;
  description: string;
  tagline: string;
  gallery: readonly string[];
  sku: InventorySku;
  variantLabel: string;
  category: string;
  highlights: readonly string[];
  specs: readonly { label: string; value: string }[];
  whatsInBox: string;
  accent: string;
};

export const CATALOG_PRODUCTS: readonly CatalogProduct[] = [
  {
    id: PRODUCT_ID,
    slug: "ease",
    name: PRODUCT_NAME,
    shortName: "Ease",
    price: PRODUCT_PRICE,
    mrp: PRODUCT_MRP,
    description: PRODUCT_SHORT_DESC,
    tagline: "Dual-density body wellness · two colours · fully waterproof",
    gallery: PRODUCT_GALLERY.Natural,
    sku: "Natural",
    variantLabel: VARIANT_LABELS.Natural,
    category: "Body wellness massager",
    highlights: [
      "100% body-safe silicone",
      "Dual-density feel with a supportive core",
      "Fully waterproof and easy to clean",
      "Stable base for hands-free use",
    ],
    specs: [
      { label: "Material", value: "100% body-safe silicone" },
      { label: "Length", value: '8.3"' },
      { label: "Contact length", value: '6.3"' },
      { label: "Waterproof", value: "Yes — fully waterproof" },
    ],
    whatsInBox: "Silk Room Ease, care card, plain discreet outer packaging",
    accent: VARIANT_COLORS.Natural,
  },
  {
    id: TONGUE_VIBRATOR_ID,
    slug: TONGUE_VIBRATOR_ID,
    name: "Silk Room Lick",
    shortName: "Lick",
    price: 549,
    description:
      "A realistic tongue vibrator with rhythmic licking motion for precise external stimulation. Quiet, waterproof, soft silicone, and compact enough for private solo or couples play.",
    tagline: "Licking motion · quiet · waterproof · portable",
    gallery: [
      "/products/tongue-vibrator/s1.jpg",
      "/products/tongue-vibrator/s2.jpg",
      "/products/tongue-vibrator/s3.jpg",
      "/products/tongue-vibrator/s4.jpg",
    ],
    sku: "TongueVibrator",
    variantLabel: "Purple",
    category: "Tongue vibrator",
    highlights: [
      "Rhythmic tongue-style licking motion",
      "Easy-target shape for precise external stimulation",
      "Soft, skin-friendly silicone contact surface",
      "Quiet, waterproof, portable design",
      "Suitable for solo or couples play",
    ],
    specs: [
      { label: "Material", value: "Soft body-safe silicone contact surface" },
      { label: "Motion", value: "Tongue-style licking vibration" },
      { label: "Waterproof", value: "Yes" },
      { label: "Use", value: "External stimulation only" },
    ],
    whatsInBox: "Silk Room Lick vibrator, charging cable, care guide, plain outer packaging",
    accent: "#8d6aae",
  },
  {
    id: MALE_MASTURBATOR_ID,
    slug: MALE_MASTURBATOR_ID,
    name: "Silk Room Trio",
    shortName: "Trio",
    price: 799,
    description:
      "A 3-in-1 realistic male masturbator with mouth, vaginal, and anal openings, a 7.1-inch deep internal canal, and varied 3D textures for endurance training and private pleasure.",
    tagline: "3-in-1 openings · 7.1-inch depth · varied 3D textures",
    gallery: [
      "/products/male-masturbator/p1.jpg",
      "/products/male-masturbator/p2.jpg",
      "/products/male-masturbator/p3.jpg",
      "/products/male-masturbator/p4.jpg",
      "/products/male-masturbator/p5.jpg",
    ],
    sku: "MaleMasturbator",
    variantLabel: "Brown",
    category: "Male masturbator",
    highlights: [
      "Three openings: mouth, vaginal, and anal",
      "7.1-inch deep internal canal",
      "Varied 3D internal textures",
      "Realistic brown-skin presentation",
      "Portable and shipped discreetly",
    ],
    specs: [
      { label: "Openings", value: "Mouth, vaginal, and anal" },
      { label: "Internal depth", value: '7.1"' },
      { label: "Texture", value: "Multiple 3D internal textures" },
      { label: "Use", value: "Male solo play and endurance training" },
    ],
    whatsInBox: "Silk Room Trio masturbator, care guide, plain outer packaging",
    accent: "#8b5f4a",
  },
] as const;

const SKU_MAP = new Map<InventorySku, CatalogProduct>();
for (const product of CATALOG_PRODUCTS) {
  SKU_MAP.set(product.sku, product);
}
// Ease has two inventory-backed colour variants.
SKU_MAP.set("Espresso", {
  ...CATALOG_PRODUCTS[0],
  sku: "Espresso",
  variantLabel: VARIANT_LABELS.Espresso,
  gallery: PRODUCT_GALLERY.Espresso,
  accent: VARIANT_COLORS.Espresso,
});

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((product) => product.slug === slug);
}

export function getProductBySku(sku: string): CatalogProduct | undefined {
  return SKU_MAP.get(sku as InventorySku);
}

export function productPriceBySku(sku: string): number | undefined {
  return getProductBySku(sku)?.price;
}

export function productNameBySku(sku: string): string {
  return getProductBySku(sku)?.name ?? PRODUCT_NAME;
}

export function productVariantBySku(sku: string): string {
  return getProductBySku(sku)?.variantLabel ?? sku;
}

export function productImageBySku(sku: string): string {
  return getProductBySku(sku)?.gallery[0] ?? PRODUCT_GALLERY.Natural[0];
}

export const DEFAULT_STOCK: Record<InventorySku, number> = {
  Natural: 100,
  Espresso: 100,
  TongueVibrator: 100,
  MaleMasturbator: 100,
};
