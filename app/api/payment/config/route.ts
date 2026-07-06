export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) {
    return Response.json({ error: "Payment not configured" }, { status: 500 });
  }
  return Response.json({ keyId });
}
