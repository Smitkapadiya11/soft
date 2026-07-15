import { formatINR } from "@/lib/format";
import {
  PRODUCT_DISCOUNT_PERCENT,
  PRODUCT_MRP,
  PRODUCT_PRICE,
} from "@/lib/constants";

type PriceProps = {
  amount?: number;
  className?: string;
  as?: "span" | "strong" | "p";
  /** Show MRP strikethrough + % off beside the sale price (product listings) */
  sale?: boolean;
};

/** Premium price display — optional sale / MRP layout */
export default function Price({
  amount = PRODUCT_PRICE,
  className = "",
  as: Tag = "span",
  sale = false,
}: PriceProps) {
  if (sale && amount === PRODUCT_PRICE) {
    return (
      <Tag
        className={`price priceSale ${className}`.trim()}
        data-price={amount}
        data-mrp={PRODUCT_MRP}
      >
        <span className="priceNow">{formatINR(amount)}</span>
        <span className="priceMrp" aria-label={`MRP ${formatINR(PRODUCT_MRP)}`}>
          {formatINR(PRODUCT_MRP)}
        </span>
        <span className="priceOff">{PRODUCT_DISCOUNT_PERCENT}% OFF</span>
      </Tag>
    );
  }

  return (
    <Tag className={`price ${className}`.trim()} data-price={amount}>
      {formatINR(amount)}
    </Tag>
  );
}
