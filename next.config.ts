import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root (a parent lockfile exists one level up).
  turbopack: { root: path.resolve() },
};

export default nextConfig;
