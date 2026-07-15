/** Apple-style INR formatting — tabular nums, no decimals for whole rupee amounts */
export function formatINR(amount: number): string {
  const value = Math.round(amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export const DELIVERY_ESTIMATE = "3–7 business days after dispatch";

export const DELIVERY_ESTIMATE_SHORT = "3–7 business days";
