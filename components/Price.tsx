import { formatINR } from "@/lib/format";

type PriceProps = {
  amount: number;
  className?: string;
  as?: "span" | "strong" | "p";
};

/** Premium price display — consistent tabular numerals sitewide */
export default function Price({ amount, className = "", as: Tag = "span" }: PriceProps) {
  return (
    <Tag className={`price ${className}`.trim()} data-price={amount}>
      {formatINR(amount)}
    </Tag>
  );
}
