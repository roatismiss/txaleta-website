import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root (a parent lockfile exists one level up).
  turbopack: { root: path.resolve() },
  // app/global-not-found.tsx — the branded 404. Needed because the root
  // layout lives under a dynamic segment (app/[lang]/layout.tsx), so there is
  // no app/layout.tsx for a plain app/not-found.tsx to render inside.
  experimental: { globalNotFound: true },
  // Allow next/image to load Cloudbeds room photos (h-img1.us2.cloudbeds.com, …)
  // served by the CloudReef rooms API for Cloudbeds-connected properties.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.cloudbeds.com" }],
  },
  // Baseline security headers (Vercel only adds HSTS on its own).
  //   • nosniff / Referrer-Policy / frame-ancestors: standard hardening; the
  //     site is never meant to be framed by another origin (clickjacking).
  //   • Permissions-Policy denies sensors the site never uses. `payment` is
  //     deliberately NOT listed: the Cloudbeds engine runs in-page on /book
  //     and may use the Payment Request API (Apple Pay / Google Pay).
  //   • No full Content-Security-Policy on purpose: Cloudbeds, the CloudReef
  //     chat and Instagram load third-party scripts that change without
  //     notice, and a too-tight CSP would silently break checkout.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
