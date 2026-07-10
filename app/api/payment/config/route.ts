import { getRazorpayKeyId } from "@/lib/razorpay";

export async function GET() {
  const keyId = getRazorpayKeyId();
  if (!keyId) {
    return Response.json({ error: "Payment not configured" }, { status: 500 });
  }
  return Response.json({ keyId });
}
