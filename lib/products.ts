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
  "ChulliUltraBanana",
  "ChulliUltraChocolate",
  "ChulliUltraStrawberry",
  "ChulliDotBanana",
  "ChulliDotChocolate",
  "ChulliDotStrawberry",
  "ChulliComboDouble",
  "ChulliComboMix",
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
  /** Lifestyle / model-led card image for the homepage catalog */
  cardImage: string;
  /** Real product photo shown as the second slide on homepage cards */
  cardProductImage: string;
  sku: InventorySku;
  variantLabel: string;
  category: string;
  /** Featured Silk Room heroes vs Others (Chulli care) */
  collection: "featured" | "others";
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
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

const LICK_PRICE = 549;
const LICK_MRP = 2199; // 75% off
const TRIO_PRICE = 799;
const TRIO_MRP = 3999; // 80% off

const ULTRA_PRICE = 90;
const ULTRA_MRP = 90;
const DOT_PRICE = 120;
const DOT_MRP = 120;
const COMBO_DOUBLE_PRICE = 180;
const COMBO_DOUBLE_MRP = 180;
const COMBO_MIX_PRICE = 549;
const COMBO_MIX_MRP = 630; // 3×₹90 + 3×₹120

const CHULLI_FAQS = [
  {
    title: "Is packaging discreet?",
    content:
      "Yes. Every Silk Room order ships in a plain outer carton with no product name or brand messaging on the label.",
  },
  {
    title: "What is included in each box?",
    content:
      "10 premium condoms plus disposable pouches for clean, considerate disposal after use.",
  },
  {
    title: "Are these for adults only?",
    content:
      "Yes. Chulli condoms sold via Silk Room are adult intimate-care products for buyers aged 18 and above.",
  },
] as const;

const CHULLI_REVIEWS = [
  {
    name: "A***n S.",
    city: "Surat",
    text: "Flavours smell natural and the plain outer box was completely discreet. Solid everyday pick.",
  },
  {
    name: "K***l R.",
    city: "Ahmedabad",
    text: "Ordered the dotted chocolate pack — quality felt premium and delivery was quick.",
  },
  {
    name: "M***a P.",
    city: "Mumbai",
    text: "Combo mix was great value. Photos on the site matched exactly what arrived.",
  },
] as const;

function chulliUltra(
  flavor: "Banana" | "Chocolate" | "Strawberry",
  sku: InventorySku,
  slug: string,
  folder: string,
  accent: string
): CatalogProduct {
  const base = `/products/${folder}`;
  return {
    id: slug,
    slug,
    name: `Chulli Ultra ${flavor}`,
    shortName: `Ultra ${flavor}`,
    price: ULTRA_PRICE,
    mrp: ULTRA_MRP,
    discountPercent: discountPercent(ULTRA_MRP, ULTRA_PRICE),
    description: `Chulli Ultra-thin ${flavor} flavoured condoms — 10 pieces in one box with disposable pouches. Extra-long sensation, real natural feel, lubricated and electronically tested. Sold discreetly through Silk Room.`,
    tagline: "Ultra-thin · 10 pcs · disposal pouches · MRP ₹90",
    gallery: [`${base}/01.jpg`, `${base}/03.jpg`, `${base}/04.jpg`, `${base}/05.jpg`, `${base}/07.jpg`],
    cardImage: `${base}/07.jpg`,
    cardProductImage: `${base}/01.jpg`,
    sku,
    variantLabel: flavor,
    category: "Others",
    collection: "others",
    highlights: [
      "Ultra-thin for a real natural feel",
      "10 premium condoms + disposable pouches",
      "Lubricated, teat-ended, electronically tested",
      "WHO GMP certified manufacturing",
    ],
    specs: [
      { label: "Type", value: "Ultra-thin flavoured condoms" },
      { label: "Flavour", value: flavor },
      { label: "Pack size", value: "10 pcs + disposable pouches" },
      { label: "Nominal width", value: "53 ± 2 mm" },
      { label: "Length", value: "Minimum 180 mm" },
      { label: "MRP", value: "₹90 (incl. of all taxes)" },
    ],
    faqs: [...CHULLI_FAQS],
    reviews: [...CHULLI_REVIEWS],
    whatsInBox: `Chulli Ultra ${flavor} — 10 condoms, disposable pouches, plain Silk Room outer carton`,
    accent,
    metaContentName: `Chulli Ultra ${flavor}`,
  };
}

function chulliDot(
  flavor: "Banana" | "Chocolate" | "Strawberry",
  sku: InventorySku,
  slug: string,
  folder: string,
  accent: string
): CatalogProduct {
  const base = `/products/${folder}`;
  return {
    id: slug,
    slug,
    name: `Chulli Dotted ${flavor}`,
    shortName: `Dotted ${flavor}`,
    price: DOT_PRICE,
    mrp: DOT_MRP,
    discountPercent: discountPercent(DOT_MRP, DOT_PRICE),
    description: `Chulli Gold 3-in-1 ${flavor} flavoured condoms — dotted, contoured fit, and ribbed texture. 10 pieces in one box with disposable pouches. Clinically tested manufacturing, sold discreetly through Silk Room.`,
    tagline: "Dotted · contoured · ribbed · 10 pcs · MRP ₹120",
    gallery: [`${base}/01.jpg`, `${base}/03.jpg`, `${base}/04.jpg`, `${base}/05.jpg`, `${base}/07.jpg`],
    cardImage: `${base}/07.jpg`,
    cardProductImage: `${base}/01.jpg`,
    sku,
    variantLabel: flavor,
    category: "Others",
    collection: "others",
    highlights: [
      "3-in-1: dotted, contoured fit, ribbed",
      "10 premium condoms + disposable pouches",
      "Clinically tested manufacturing checks",
      "Flavoured for a warmer intimate experience",
    ],
    specs: [
      { label: "Type", value: "3-in-1 dotted · contoured · ribbed" },
      { label: "Flavour", value: flavor },
      { label: "Pack size", value: "10 pcs + disposable pouches" },
      { label: "MRP", value: "₹120 (incl. of all taxes)" },
    ],
    faqs: [...CHULLI_FAQS],
    reviews: [...CHULLI_REVIEWS],
    whatsInBox: `Chulli Dotted ${flavor} — 10 condoms, disposable pouches, plain Silk Room outer carton`,
    accent,
    metaContentName: `Chulli Dotted ${flavor}`,
  };
}

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
    cardImage: "/brand/home/card-model-ease.png",
    cardProductImage: "/products/natural/01-hero.png",
    sku: "Natural",
    variantLabel: VARIANT_LABELS.Natural,
    category: "Body wellness massager",
    collection: "featured",
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
    cardImage: "/brand/home/card-model-lick.png",
    cardProductImage: "/products/silk-lick/s1.jpg",
    sku: "TongueVibrator",
    variantLabel: "Purple",
    category: "Personal wellness massager",
    collection: "featured",
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
    cardImage: "/brand/home/card-model-trio.png",
    cardProductImage: "/products/silk-trio/p1.jpg",
    sku: "MaleMasturbator",
    variantLabel: "Brown",
    category: "Men’s personal care",
    collection: "featured",
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
  chulliUltra("Banana", "ChulliUltraBanana", "chulli-ultra-banana", "chulli-ultra-banana", "#c9a24a"),
  chulliUltra(
    "Chocolate",
    "ChulliUltraChocolate",
    "chulli-ultra-chocolate",
    "chulli-ultra-chocolate",
    "#6b3d2e"
  ),
  chulliUltra(
    "Strawberry",
    "ChulliUltraStrawberry",
    "chulli-ultra-strawberry",
    "chulli-ultra-strawberry",
    "#b23a48"
  ),
  chulliDot("Banana", "ChulliDotBanana", "chulli-dot-banana", "chulli-dot-banana", "#d4a017"),
  chulliDot("Chocolate", "ChulliDotChocolate", "chulli-dot-chocolate", "chulli-dot-chocolate", "#4a2c22"),
  chulliDot(
    "Strawberry",
    "ChulliDotStrawberry",
    "chulli-dot-strawberry",
    "chulli-dot-strawberry",
    "#9b1b2f"
  ),
  {
    id: "chulli-combo-double",
    slug: "chulli-combo-double",
    name: "Chulli Combo Double",
    shortName: "Combo Double",
    price: COMBO_DOUBLE_PRICE,
    mrp: COMBO_DOUBLE_MRP,
    discountPercent: discountPercent(COMBO_DOUBLE_MRP, COMBO_DOUBLE_PRICE),
    description:
      "A two-box Chulli flavour pair — pick your favourite Ultra-thin duo. Each box includes 10 condoms with disposable pouches. Ships free in a plain Silk Room carton.",
    tagline: "Two-box flavour pair · 20 pcs total · disposal pouches",
    gallery: [
      "/products/chulli-combo-double/001.jpg",
      "/products/chulli-combo-double/010.jpg",
      "/products/chulli-combo-double/015.jpg",
      "/products/chulli-combo-double/020.jpg",
      "/products/chulli-combo-double/025.jpg",
    ],
    cardImage: "/products/chulli-combo-double/010.jpg",
    cardProductImage: "/products/chulli-combo-double/001.jpg",
    sku: "ChulliComboDouble",
    variantLabel: "Double pack",
    category: "Others",
    collection: "others",
    highlights: [
      "Two complementary flavour boxes",
      "20 condoms total with disposable pouches",
      "Ideal starter pair for couples",
      "Discreet plain-box Silk Room delivery",
    ],
    specs: [
      { label: "Pack", value: "2 boxes (10 pcs each)" },
      { label: "Includes", value: "Disposable pouches in each box" },
      { label: "MRP", value: "₹180 (incl. of all taxes)" },
    ],
    faqs: [...CHULLI_FAQS],
    reviews: [...CHULLI_REVIEWS],
    whatsInBox: "Two Chulli flavour boxes, disposable pouches, plain Silk Room outer carton",
    accent: "#c9a96e",
    metaContentName: "Chulli Combo Double",
  },
  {
    id: "chulli-combo-mix",
    slug: "chulli-combo-mix",
    name: "Chulli Combo Mix 3 & 6",
    shortName: "Combo Mix",
    price: COMBO_MIX_PRICE,
    mrp: COMBO_MIX_MRP,
    discountPercent: discountPercent(COMBO_MIX_MRP, COMBO_MIX_PRICE),
    description:
      "The full Chulli flavour lineup — 3 Ultra-thin flavours plus 3 Dotted Gold flavours (Banana, Chocolate, Strawberry). Six boxes, disposal pouches included, shipped free in a plain Silk Room carton.",
    tagline: "All 6 flavours · Ultra + Dotted · best value mix",
    gallery: [
      "/products/chulli-combo-mix/028.jpg",
      "/products/chulli-combo-mix/026.jpg",
      "/products/chulli-combo-mix/027.jpg",
    ],
    cardImage: "/products/chulli-combo-mix/028.jpg",
    cardProductImage: "/products/chulli-combo-mix/026.jpg",
    sku: "ChulliComboMix",
    variantLabel: "Full mix",
    category: "Others",
    collection: "others",
    highlights: [
      "All 6 Chulli flavours in one order",
      "3 Ultra-thin + 3 Dotted Gold boxes",
      "60 condoms with disposable pouches",
      "Best-value complete flavour set",
    ],
    specs: [
      { label: "Pack", value: "6 boxes (10 pcs each · 60 total)" },
      { label: "Lines", value: "Ultra-thin + Dotted Gold" },
      { label: "Flavours", value: "Banana · Chocolate · Strawberry" },
      { label: "MRP", value: "₹630 (incl. of all taxes)" },
    ],
    faqs: [...CHULLI_FAQS],
    reviews: [...CHULLI_REVIEWS],
    whatsInBox:
      "6 Chulli boxes (3 Ultra + 3 Dotted), disposable pouches, plain Silk Room outer carton",
    accent: "#6b3d52",
    metaContentName: "Chulli Combo Mix",
  },
] as const;

export const FEATURED_PRODUCTS = CATALOG_PRODUCTS.filter(
  (product) => product.collection === "featured"
);

export const OTHER_PRODUCTS = CATALOG_PRODUCTS.filter(
  (product) => product.collection === "others"
);

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

export const CATALOG_SLUGS = CATALOG_PRODUCTS.filter((product) => product.slug !== "ease").map(
  (product) => product.slug
);

export const DEFAULT_STOCK: Record<InventorySku, number> = {
  Natural: 100,
  Espresso: 100,
  TongueVibrator: 100,
  MaleMasturbator: 100,
  ChulliUltraBanana: 100,
  ChulliUltraChocolate: 100,
  ChulliUltraStrawberry: 100,
  ChulliDotBanana: 100,
  ChulliDotChocolate: 100,
  ChulliDotStrawberry: 100,
  ChulliComboDouble: 50,
  ChulliComboMix: 40,
};
