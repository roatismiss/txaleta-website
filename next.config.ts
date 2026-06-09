import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root (a parent lockfile exists one level up).
  turbopack: { root: path.resolve() },
  // Allow next/image to load Cloudbeds room photos (h-img1.us2.cloudbeds.com, …)
  // served by the CloudReef rooms API for Cloudbeds-connected properties.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.cloudbeds.com" }],
  },
};

export default nextConfig;
