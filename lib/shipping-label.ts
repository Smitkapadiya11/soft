import { BUSINESS, PRODUCT_NAME } from "@/lib/constants";
import { formatINR } from "@/lib/format";

export type LabelOrder = {
  id: string;
  date: string;
  customer: string;
  phone: string;
  email: string;
  variant: string;
  qty: number;
  amount: number;
  payment: string;
  shippingStatus: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  pincode: string;
  checkoutGroupId?: string | null;
};

function barcodeSvg(text: string): string {
  const bars = text
    .split("")
    .map((c, i) => {
      const w = (c.charCodeAt(0) % 3) + 1;
      const x = i * 4;
      return `<rect x="${x}" y="0" width="${w}" height="48" fill="#111"/>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${text.length * 4} 48" width="100%" height="48" preserveAspectRatio="none">${bars}</svg>`;
}

/** Marketplace-style printable shipping label (Amazon / Flipkart layout) */
export function buildShippingLabelHtml(order: LabelOrder): string {
  const fullAddress = [
    order.addressLine1,
    order.addressLine2,
    `${order.city}, ${order.state}`,
    order.pincode,
  ]
    .filter(Boolean)
    .join("<br/>");

  const isPaid = order.payment.toLowerCase() === "paid";
  const sku = `SR-RT-${order.variant.toUpperCase().slice(0, 3)}`;
  const orderRef = order.checkoutGroupId?.slice(0, 12) ?? order.id.slice(0, 12);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Shipping Label — ${order.id}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page { size: 4in 6in; margin: 0.15in; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #111; line-height: 1.35; }
    .label { border: 2px solid #111; padding: 10px; max-width: 4in; min-height: 5.8in; }
    .row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .badge { font-weight: 700; font-size: 10px; letter-spacing: 0.06em; padding: 3px 8px; border: 2px solid #111; text-transform: uppercase; }
    .badge.prepaid { background: #111; color: #fff; }
    .badge.cod { background: #fff; color: #111; }
    .section { margin-top: 10px; padding-top: 8px; border-top: 1px dashed #999; }
    .section:first-of-type { border-top: none; padding-top: 0; }
    h1 { font-size: 13px; font-weight: 700; letter-spacing: 0.04em; }
    h2 { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #555; margin-bottom: 4px; letter-spacing: 0.08em; }
    .ship-to { font-size: 13px; font-weight: 700; line-height: 1.4; }
    .meta { font-size: 10px; color: #444; }
    table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 10px; }
    th, td { border: 1px solid #ccc; padding: 4px 6px; text-align: left; vertical-align: top; }
    th { background: #f3f3f3; font-weight: 700; }
    .barcode { margin-top: 8px; text-align: center; }
    .barcode-id { font-family: monospace; font-size: 10px; letter-spacing: 0.12em; margin-top: 2px; }
    .discreet { margin-top: 10px; padding: 6px; background: #f9f9f9; border: 1px solid #ddd; font-size: 9px; color: #555; }
    .from { font-size: 10px; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="label">
    <div class="row">
      <h1>${BUSINESS.name.toUpperCase()}</h1>
      <span class="badge ${isPaid ? "prepaid" : "cod"}">${isPaid ? "Prepaid" : "Collect"}</span>
    </div>
    <p class="meta">Order: ${order.id} · ${order.date}</p>

    <div class="section">
      <h2>Ship From</h2>
      <p class="from"><strong>${BUSINESS.legalName}</strong><br/>
      ${BUSINESS.website.replace("https://", "")}<br/>
      ${BUSINESS.email}</p>
    </div>

    <div class="section">
      <h2>Ship To</h2>
      <p class="ship-to">${order.customer}</p>
      <p class="meta">Phone: ${order.phone}</p>
      <p style="margin-top:4px;line-height:1.45;">${fullAddress}</p>
    </div>

    <div class="section">
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${PRODUCT_NAME} (${order.variant})</td>
            <td>${sku}</td>
            <td>${order.qty}</td>
            <td>${formatINR(order.amount)}</td>
          </tr>
        </tbody>
      </table>
      <p class="meta" style="margin-top:6px;"><strong>Payment:</strong> ${order.payment} · <strong>Shipping:</strong> ${order.shippingStatus}</p>
    </div>

    <div class="section barcode">
      ${barcodeSvg(order.id)}
      <div class="barcode-id">${orderRef.toUpperCase()}</div>
    </div>

    <div class="discreet">
      <strong>Discreet packaging.</strong> Do not mention product details on the outer box. Handle with care.
    </div>
  </div>
  <script>window.onload = function(){ window.print(); };</script>
</body>
</html>`;
}
