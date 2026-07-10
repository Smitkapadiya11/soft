import Razorpay from "razorpay";

export function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials not configured");
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

/** Public key only — never expose KEY_SECRET to the client */
export function getRazorpayKeyId() {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY_ID ||
    ""
  );
}

export function isRazorpayAuthError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const status = (err as { statusCode?: number }).statusCode;
  if (status === 401) return true;
  const message = String((err as { error?: { description?: string }; message?: string }).error?.description
    ?? (err as { message?: string }).message
    ?? "");
  return /authentication|unauthorized|invalid key/i.test(message);
}
