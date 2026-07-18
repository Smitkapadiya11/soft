import assert from "node:assert/strict";
import test from "node:test";
import {
  CATALOG_PRODUCTS,
  INVENTORY_SKUS,
  productPriceBySku,
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

test("catalog exposes three products at authoritative prices", () => {
  assert.equal(CATALOG_PRODUCTS.length, 3);
  assert.deepEqual(
    CATALOG_PRODUCTS.map((product) => product.price),
    [599, 549, 799]
  );
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
    ],
  });

  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;

  assert.deepEqual(
    parsed.data.items.map((item) => item.price),
    [599, 549, 799]
  );
  assert.equal(
    parsed.data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    2496
  );
});

test("unknown stock keys are rejected", () => {
  const parsed = parseCreateOrder({
    customer: validCustomer,
    items: [{ variant: "FakeProduct", quantity: 1, price: 1 }],
  });

  assert.equal(parsed.ok, false);
});
