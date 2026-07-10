import { z } from "zod";
import { PRODUCT_PRICE, ALLOWED_VARIANTS } from "./constants";

export { PRODUCT_PRICE, ALLOWED_VARIANTS };

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Valid email is required").max(254),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s/g, "").replace(/^\+91/, "").replace(/^91/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian phone number is required")),
  address1: z.string().trim().min(5, "Address is required").max(200).optional(),
  addressLine1: z.string().trim().min(5).max(200).optional(),
  address2: z.string().trim().max(200).optional(),
  addressLine2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Valid 6-digit pincode is required"),
});

export const cartItemSchema = z.object({
  variant: z.enum(ALLOWED_VARIANTS, { message: "Invalid variant" }),
  quantity: z.number().int().min(1).max(10),
  price: z.literal(PRODUCT_PRICE, { message: "Invalid product price" }),
});

export const createOrderSchema = z.object({
  customer: customerSchema,
  items: z.array(cartItemSchema).min(1, "Cart must contain at least one item").max(5),
});

export const checkoutGroupSchema = z.object({
  checkoutGroupId: z.string().uuid("Invalid checkout group ID"),
});

export const paymentVerifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  checkoutGroupId: z.string().uuid(),
});

export const inventoryPatchSchema = z.object({
  variant: z.enum(ALLOWED_VARIANTS),
  stockCount: z.number().int().min(0).max(99999),
});

export type CustomerInput = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type CartItemInput = z.infer<typeof cartItemSchema>;

export function parseCustomer(raw: unknown): { ok: true; data: CustomerInput } | { ok: false; error: string } {
  const parsed = customerSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid customer data" };
  }
  const d = parsed.data;
  const addressLine1 = d.addressLine1 ?? d.address1 ?? "";
  if (addressLine1.length < 5) {
    return { ok: false, error: "Address is required" };
  }
  return {
    ok: true,
    data: {
      name: d.name,
      email: d.email,
      phone: d.phone,
      addressLine1,
      addressLine2: d.addressLine2 ?? d.address2,
      city: d.city,
      state: d.state,
      pincode: d.pincode,
    },
  };
}

export function parseCreateOrder(body: unknown): { ok: true; data: { customer: CustomerInput; items: CartItemInput[] } } | { ok: false; error: string } {
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid order data" };
  }
  const customerResult = parseCustomer(parsed.data.customer);
  if (!customerResult.ok) return customerResult;
  return { ok: true, data: { customer: customerResult.data, items: parsed.data.items } };
}

export function zodErrorMessage(result: { error: { issues: { message?: string }[] } }): string {
  return result.error.issues[0]?.message ?? "Validation failed";
}
