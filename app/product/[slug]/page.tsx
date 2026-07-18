import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  TONGUE_VIBRATOR_ID,
  MALE_MASTURBATOR_ID,
} from "@/lib/products";
import ProductCatalogClient from "./ProductCatalogClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [TONGUE_VIBRATOR_ID, MALE_MASTURBATOR_ID].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.slug === "ease") return {};

  const title = `${product.name} — ₹${product.price} | Silk Room`;
  const description = `${product.description} Free discreet delivery across India. Secure Razorpay checkout. Adults 18+.`;
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
