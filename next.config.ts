import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "animejs"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/cancellation-refunds",
        destination: "/cancellation-and-refunds",
        permanent: true,
      },
      {
        source: "/replacement",
        destination: "/cancellation-and-refunds",
        permanent: true,
      },
      {
        source: "/product/tongue-vibrator",
        destination: "/product/silk-lick",
        permanent: true,
      },
      {
        source: "/product/3-in-1-male-masturbator",
        destination: "/product/silk-trio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
