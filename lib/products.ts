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
        text: "Really quiet and the licking motion feels natural. Arrived in a completely plain box.",
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
    whatsInBox: "Silk Room Lick vibrator, charging cable, care guide, plain outer packaging",
    accent: "#8d6aae",
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
    faqs: [
      {
        title: "How deep is the internal canal?",
        content:
          "The internal canal is 7.1 inches deep with three distinct openings — mouth, vaginal, and anal — each with its own 3D texture.",
      },
      {
        title: "How do I clean it?",
        content:
          "Flush each canal with warm water and mild soap after use, then air-dry fully before storage. Use a renewal powder occasionally to keep the material soft.",
      },
      {
        title: "Is delivery discreet?",
        content:
          "Yes. It ships free in a plain outer box with no product or brand name on the label.",
      },
      {
        title: "Can I use it for endurance training?",
        content:
          "Yes. The three textures offer different intensity levels, which many customers use for stamina practice at their own pace.",
      },
    ],
    reviews: [
      {
        name: "R***l J.",
        city: "Delhi",
        text: "The textures are genuinely different between openings. Quality is far better than expected at this price.",
      },
      {
        name: "V***y K.",
        city: "Ahmedabad",
        text: "Discreet plain box, fast delivery, and the size is exactly as described on the page.",
      },
      {
        name: "A***h P.",
        city: "Chennai",
        text: "Easy to clean and feels realistic. Silk Room support answered my WhatsApp question within the hour.",
      },
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
