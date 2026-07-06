export async function sendOrderConfirmationEmail(
  to: string,
  orderIds: string[]
): Promise<void> {
  const orderRef = orderIds[0];
  const subject = `Order ${orderRef.slice(0, 12)} confirmed`;
  const body = `Thank you for your order.\n\nOrder reference: ${orderRef}\n\nYour package will arrive in plain, unbranded packaging within 2-4 business days.\n\n— Silk Room`;

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (resendKey && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text: body }),
    });
    if (!res.ok) {
      console.error("Email send failed:", await res.text());
    }
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[email] To: ${to}\nSubject: ${subject}\n${body}`);
  }
}
