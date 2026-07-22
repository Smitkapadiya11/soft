import assert from "node:assert/strict";
import test from "node:test";
import {
  CATALOG_PRODUCTS,
  FEATURED_PRODUCTS,
  INVENTORY_SKUS,
  MALE_MASTURBATOR_ID,
  OTHER_PRODUCTS,
  TONGUE_VIBRATOR_ID,
  getProductBySlug,
  productPriceBySku,
  resolveProductSlug,
} from "../lib/products";
import { parseCreateOrder } from "../lib/validation";

const validCustomer = {
  name: "Test Customer",
  email: "test@example.com",
  phone: "9876543210",
  address1: "123 Test Street",
  city: "Surat",
  state: "Gujarat",
  pincode: "395001",
};

test("catalog exposes featured heroes plus Chulli others", () => {
  assert.equal(FEATURED_PRODUCTS.length, 3);
  assert.equal(OTHER_PRODUCTS.length, 8);
  assert.equal(CATALOG_PRODUCTS.length, 11);
  assert.deepEqual(
    FEATURED_PRODUCTS.map((product) => product.price),
    [599, 549, 799]
  );
  assert.equal(getProductBySlug("chulli-ultra-banana")?.price, 90);
  assert.equal(getProductBySlug("chulli-dot-strawberry")?.mrp, 120);
  assert.equal(getProductBySlug("chulli-combo-mix")?.category, "Others");
});

test("sale discounts match Ease-style MRP mechanism", () => {
  const [ease, lick, trio] = FEATURED_PRODUCTS;
  assert.equal(ease.discountPercent, 80);
  assert.equal(lick.mrp, 2199);
  assert.equal(lick.discountPercent, 75);
  assert.equal(trio.mrp, 3999);
  assert.equal(trio.discountPercent, 80);
  assert.equal(getProductBySlug("chulli-combo-mix")?.discountPercent, 13);
});

test("all inventory SKUs have authoritative catalog prices", () => {
  for (const sku of INVENTORY_SKUS) {
    assert.equal(typeof productPriceBySku(sku), "number");
  }
});

test("mixed cart ignores client prices and bills catalog prices", () => {
  const parsed = parseCreateOrder({
    customer: validCustomer,
    items: [
      { variant: "Natural", quantity: 1, price: 1 },
      { variant: "TongueVibrator", quantity: 2, price: 1 },
      { variant: "MaleMasturbator", quantity: 1, price: 1 },
      { variant: "ChulliUltraBanana", quantity: 1, price: 1 },
      { variant: "ChulliComboMix", quantity: 1, price: 1 },
    ],
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;

  assert.deepEqual(
    parsed.data.items.map((item) => item.price),
    [599, 549, 799, 90, 549]
  );
  assert.equal(
    parsed.data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    3135
  );
});

test("unknown stock keys are rejected", () => {
  const parsed = parseCreateOrder({
    customer: validCustomer,
    items: [{ variant: "FakeProduct", quantity: 1, price: 1 }],
  });

  assert.equal(parsed.ok, false);
});

test("public slugs are Meta-safe and legacy slugs resolve", () => {
  assert.equal(TONGUE_VIBRATOR_ID, "silk-lick");
  assert.equal(MALE_MASTURBATOR_ID, "silk-trio");
  assert.equal(resolveProductSlug("tongue-vibrator"), "silk-lick");
  assert.equal(resolveProductSlug("3-in-1-male-masturbator"), "silk-trio");
  assert.equal(getProductBySlug("tongue-vibrator")?.slug, "silk-lick");
  assert.equal(getProductBySlug("silk-trio")?.metaContentName, "Silk Room Trio");
  assert.equal(getProductBySlug("chulli-dot-chocolate")?.collection, "others");
});
