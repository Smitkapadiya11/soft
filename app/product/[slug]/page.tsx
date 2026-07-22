import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATALOG_SLUGS,
  getProductBySlug,
} from "@/lib/products";
import ProductCatalogClient from "./ProductCatalogClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CATALOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.slug === "ease") return {};

  const priceLabel =
    product.discountPercent > 0
      ? `₹${product.price} (${product.discountPercent}% OFF)`
      : `₹${product.price}`;
  const title = `${product.name} — ${priceLabel} | Silk Room`;
  const description =
    product.discountPercent > 0
      ? `${product.description} Sale ₹${product.price} (MRP ₹${product.mrp}, ${product.discountPercent}% OFF). Free discreet delivery across India. Secure Razorpay checkout. Adults 18+.`
      : `${product.description} ₹${product.price} (MRP ₹${product.mrp}). Free discreet delivery across India. Secure Razorpay checkout. Adults 18+.`;
  const url = `https://silkroom.shop/product/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: `https://silkroom.shop${product.gallery[0]}`,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function CatalogProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.slug === "ease") notFound();

  return (
    <>
      <ProductCatalogClient key={product.slug} product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            category: product.category,
            brand: { "@type": "Brand", name: "Silk Room" },
            description: product.description,
            image: product.gallery.map((image) => `https://silkroom.shop${image}`),
            offers: {
              "@type": "Offer",
              price: String(product.price),
              priceCurrency: "INR",
              url: `https://silkroom.shop/product/${product.slug}`,
            },
          }),
        }}
      />
    </>
  );
}

export const dynamicParams = false;
