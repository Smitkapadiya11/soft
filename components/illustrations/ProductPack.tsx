export type ProductVariant = "Natural" | "Espresso";
export type ProductView = "front" | "side" | "detail" | "lifestyle";

export interface ProductPackProps {
  variant?: ProductVariant;
  view?: ProductView;
  className?: string;
  ariaHidden?: boolean;
}

/** Deprecated visual — product pages use real photos from /public/products */
function ProductPack({
  variant = "Natural",
  className,
  ariaHidden = false,
}: ProductPackProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 520"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : `Silk Room Real Touch ${variant}`}
    >
      <rect width="400" height="520" fill="#faf6f7" />
      <text x="200" y="260" textAnchor="middle" fill="#6b3d52" fontSize="20">
        {variant}
      </text>
    </svg>
  );
}

export default ProductPack;
