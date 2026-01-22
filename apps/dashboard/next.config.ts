import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone", // Para Docker
  turbopack: {}, // Required by Next.js 16 when webpack config is present

  webpack(config) {
    // Module Federation configuration disabled for Docker compatibility
    // Can be re-enabled for local development if needed
    return config;
  },
};

export default nextConfig;
