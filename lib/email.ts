export async function sendOrderConfirmationEmail(
  to: string,
  orderIds: string[]
): Promise<void> {
  const orderRef = orderIds[0];
  const subject = `Order ${orderRef.slice(0, 12)} confirmed`;
  const body = `Thank you for your Silk Room order.\n\nOrder reference: ${orderRef}\n\nYour sealed pack will ship in plain, discreet packaging. Standard delivery across India typically takes 3–7 business days after dispatch.\n\n— Silk Room`;

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
