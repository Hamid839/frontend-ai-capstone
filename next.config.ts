import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // FocusBoard is a separate Vite app — do not include it in the Next build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // We still want typechecking for the Next.js app;
    // FocusBoard is excluded via tsconfig.json
    ignoreBuildErrors: false,
  },
};

export default nextConfig;