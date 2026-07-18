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

/** Public URL slugs — Meta-safe (no adult keyword paths). */
export const TONGUE_VIBRATOR_ID = "silk-lick";
export const MALE_MASTURBATOR_ID = "silk-trio";

/** Legacy slugs kept for redirects from old ads / links. */
export const LEGACY_PRODUCT_SLUGS: Record<string, string> = {
  "tongue-vibrator": TONGUE_VIBRATOR_ID,
  "3-in-1-male-masturbator": MALE_MASTURBATOR_ID,
};

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
  mrp: number;
  discountPercent: number;
  description: string;
  tagline: string;
  gallery: readonly string[];
  sku: InventorySku;
  variantLabel: string;
  category: string;
  highlights: readonly string[];
  specs: readonly { label: string; value: string }[];
  faqs: readonly { title: string; content: string }[];
  reviews: readonly { name: string; city: string; text: string }[];
  whatsInBox: string;
  accent: string;
  /** Neutral name sent to Meta Pixel / CAPI payloads */
  metaContentName: string;
};

/** Same mechanism as Ease: sale price is fixed, discount is computed from MRP. */
function discountPercent(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

const LICK_PRICE = 549;
const LICK_MRP = 2199; // 75% off
const TRIO_PRICE = 799;
const TRIO_MRP = 3999; // 80% off

export const CATALOG_PRODUCTS: readonly CatalogProduct[] = [
  {
    id: PRODUCT_ID,
    slug: "ease",
    name: PRODUCT_NAME,
    shortName: "Ease",
    price: PRODUCT_PRICE,
    mrp: PRODUCT_MRP,
    discountPercent: discountPercent(PRODUCT_MRP, PRODUCT_PRICE),
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
    faqs: [
      {
        title: "Is packaging discreet?",
        content:
          "Yes. Every order ships in a plain outer carton with no product name or brand messaging on the label.",
      },
      {
        title: "How do I clean it?",
        content:
          "Rinse with warm water and mild soap after each use. Fully waterproof — dry thoroughly before storage.",
      },
      {
        title: "What warranty do I get?",
        content:
          "A 6-month limited warranty against manufacturing defects from the delivery date. Contact WhatsApp support with your order number.",
      },
    ],
    reviews: [
      {
        name: "N***a M.",
        city: "Mumbai",
        text: "Soft Rose feels gentle and premium. Packaging was totally plain — exactly as promised.",
      },
      {
        name: "R***a K.",
        city: "Bangalore",
        text: "Mist Grey looks calm on the shelf. Waterproof as promised — rinse and dry, done.",
      },
      {
        name: "A***i S.",
        city: "Delhi",
        text: "Smooth Razorpay checkout and free discreet delivery. Compact and genuinely well made.",
      },
    ],
    whatsInBox: "Silk Room Ease, care card, plain discreet outer packaging",
    accent: VARIANT_COLORS.Natural,
    metaContentName: "Silk Room Ease",
  },
  {
    id: TONGUE_VIBRATOR_ID,
    slug: TONGUE_VIBRATOR_ID,
    name: "Silk Room Lick",
    shortName: "Lick",
    price: LICK_PRICE,
    mrp: LICK_MRP,
    discountPercent: discountPercent(LICK_MRP, LICK_PRICE),
    description:
      "A quiet, waterproof personal massager with a soft silicone contact surface and rhythmic motion for precise external wellness use. Compact for private solo or shared routines at home.",
    tagline: "Quiet motion · soft silicone · waterproof · portable",
    gallery: [
      "/products/silk-lick/s1.jpg",
      "/products/silk-lick/s2.jpg",
      "/products/silk-lick/s3.jpg",
      "/products/silk-lick/s4.jpg",
    ],
    sku: "TongueVibrator",
    variantLabel: "Purple",
    category: "Personal wellness massager",
    highlights: [
      "Rhythmic soft-surface motion for precise external use",
      "Easy-to-hold shape for targeted wellness routines",
      "Soft, skin-friendly silicone contact surface",
      "Quiet, waterproof, portable design",
      "Designed for private adult personal care",
    ],
    specs: [
      { label: "Material", value: "Soft body-safe silicone contact surface" },
      { label: "Motion", value: "Rhythmic soft-surface vibration" },
      { label: "Waterproof", value: "Yes" },
      { label: "Use", value: "External personal wellness only · Adults 18+" },
    ],
    faqs: [
      {
        title: "Is it quiet enough for private use?",
        content:
          "Yes. The motor is tuned for low-noise operation so it stays discreet even in shared homes.",
      },
      {
        title: "Is it waterproof?",
        content:
          "Yes — the body is waterproof, so it is easy to rinse clean after use. Dry fully before charging or storing.",
      },
      {
        title: "How do I clean and store it?",
        content:
          "Wash the silicone contact surface with warm water and mild soap before and after each use, dry it completely, and store it in a cool, dry place away from direct sunlight.",
      },
      {
        title: "Is delivery discreet?",
        content:
          "Yes. It ships free in a plain outer box with no product or brand name on the label.",
      },
    ],
    reviews: [
      {
        name: "P***a T.",
        city: "Pune",
        text: "Really quiet and comfortable. Arrived in a completely plain box.",
      },
      {
        name: "S***i R.",
        city: "Hyderabad",
        text: "Compact, easy to clean, and the silicone feels soft and safe on skin. Worth it at this price.",
      },
      {
        name: "M***a D.",
        city: "Mumbai",
        text: "Checkout was smooth and delivery was fast. The product photos matched exactly what arrived.",
      },
    ],
    whatsInBox: "Silk Room Lick, charging cable, care guide, plain outer packaging",
    accent: "#8d6aae",
    metaContentName: "Silk Room Lick",
  },
  {
    id: MALE_MASTURBATOR_ID,
    slug: MALE_MASTURBATOR_ID,
    name: "Silk Room Trio",
    shortName: "Trio",
    price: TRIO_PRICE,
    mrp: TRIO_MRP,
    discountPercent: discountPercent(TRIO_MRP, TRIO_PRICE),
    description:
      "A compact men’s personal-care sleeve with three textured channels, about 7.1 inches of internal depth, and varied 3D surfaces for private adult routines. Shipped free in a plain outer box.",
    tagline: "Three textured channels · 7.1-inch depth · discreet design",
    gallery: [
      "/products/silk-trio/p1.jpg",
      "/products/silk-trio/p2.jpg",
      "/products/silk-trio/p3.jpg",
      "/products/silk-trio/p4.jpg",
      "/products/silk-trio/p5.jpg",
    ],
    sku: "MaleMasturbator",
    variantLabel: "Brown",
    category: "Men’s personal care",
    highlights: [
      "Three distinct textured channels",
      "About 7.1-inch internal depth",
      "Varied 3D internal textures",
      "Compact and portable form",
      "Shipped discreetly in a plain box",
    ],
    specs: [
      { label: "Channels", value: "Three textured openings" },
      { label: "Internal depth", value: '7.1"' },
      { label: "Texture", value: "Multiple 3D internal textures" },
      { label: "Use", value: "Adult personal care · private use only · 18+" },
    ],
    faqs: [
      {
        title: "How deep is the internal channel?",
        content:
          "About 7.1 inches deep across three distinct textured channels, each with its own feel.",
      },
      {
        title: "How do I clean it?",
        content:
          "Flush each channel with warm water and mild soap after use, then air-dry fully before storage. Use a renewal powder occasionally to keep the material soft.",
      },
      {
        title: "Is delivery discreet?",
        content:
          "Yes. It ships free in a plain outer box with no product or brand name on the label.",
      },
      {
        title: "Is it for adults only?",
        content:
          "Yes. Silk Room Trio is an adult personal-care product for buyers aged 18 and above.",
      },
    ],
    reviews: [
      {
        name: "R***l J.",
        city: "Delhi",
        text: "The textures are genuinely different between channels. Quality is far better than expected at this price.",
      },
      {
        name: "V***y K.",
        city: "Ahmedabad",
        text: "Discreet plain box, fast delivery, and the size is exactly as described on the page.",
      },
      {
        name: "A***h P.",
        city: "Chennai",
        text: "Easy to clean and feels as shown. Silk Room support answered my WhatsApp question within the hour.",
      },
    ],
    whatsInBox: "Silk Room Trio, care guide, plain outer packaging",
    accent: "#8b5f4a",
    metaContentName: "Silk Room Trio",
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

export function resolveProductSlug(slug: string): string {
  return LEGACY_PRODUCT_SLUGS[slug] ?? slug;
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  const resolved = resolveProductSlug(slug);
  return CATALOG_PRODUCTS.find((product) => product.slug === resolved);
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

export function productMetaNameBySku(sku: string): string {
  return getProductBySku(sku)?.metaContentName ?? "Silk Room product";
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
