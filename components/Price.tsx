import { formatINR } from "@/lib/format";
import { PRODUCT_MRP, PRODUCT_PRICE } from "@/lib/constants";

type PriceProps = {
  amount?: number;
  /** MRP for the strikethrough sale layout. Defaults to Ease MRP when `sale` and amount is the Ease price. */
  mrp?: number;
  className?: string;
  as?: "span" | "strong" | "p";
  /** Show MRP strikethrough + % off beside the sale price (product listings) */
  sale?: boolean;
};

/** Premium price display — optional sale / MRP layout */
export default function Price({
  amount = PRODUCT_PRICE,
  mrp,
  className = "",
  as: Tag = "span",
  sale = false,
}: PriceProps) {
  // Back-compat: legacy call sites pass `sale` without `mrp` for the Ease price.
  const saleMrp = mrp ?? (amount === PRODUCT_PRICE ? PRODUCT_MRP : undefined);

  if (sale && saleMrp && saleMrp > amount) {
    const offPercent = Math.round(((saleMrp - amount) / saleMrp) * 100);
    return (
      <Tag
        className={`price priceSale ${className}`.trim()}
        data-price={amount}
        data-mrp={saleMrp}
      >
        <span className="priceNow">{formatINR(amount)}</span>
        <span className="priceMrp" aria-label={`MRP ${formatINR(saleMrp)}`}>
          {formatINR(saleMrp)}
        </span>
        <span className="priceOff">{offPercent}% OFF</span>
      </Tag>
    );
  }

  return (
    <Tag className={`price ${className}`.trim()} data-price={amount}>
      {formatINR(amount)}
    </Tag>
  );
}
