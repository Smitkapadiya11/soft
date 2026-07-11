import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
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
    ];
  },
};

export default nextConfig;
