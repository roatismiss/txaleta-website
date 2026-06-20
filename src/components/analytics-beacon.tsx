"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

// ============================================================================
// AnalyticsBeacon — first-party pageview tracking into CloudReef.
//
// Vercel Web Analytics (mounted separately in layout) feeds the Vercel
// dashboard, which has no public read API. This beacon ALSO sends one anonymous
// pageview per route change to CloudReef's /api/widget/analytics, so the resort
// can see the same traffic inside the CloudReef /analytics page.
//
// Privacy: no PII. `sid` is a random per-session id kept in sessionStorage;
// country is derived server-side from the edge geo header, never an IP.
// Localhost is skipped so dev browsing doesn't pollute production numbers.
// ============================================================================

function sessionId(): string {
  try {
    const KEY = "txaleta:aid";
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

function device(): "desktop" | "mobile" | "tablet" {
  const ua = navigator.userAgent || "";
  if (/ipad|tablet|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|windows phone/i.test(ua)) return "mobile";
  return "desktop";
}

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip local/dev so test browsing never lands in production analytics.
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return;

    const url = `${site.cloudreef.baseUrl}/api/widget/analytics`;
    const payload = JSON.stringify({
      widgetKey: site.cloudreef.widgetKey,
      path: pathname || window.location.pathname,
      referrer: document.referrer || undefined,
      device: device(),
      sessionId: sessionId(),
      event: "pageview",
    });

    // text/plain → CORS-safelisted (no preflight) and survives navigation.
    // The API reads the raw body with request.json() regardless of the header.
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, payload)) return;
    } catch {
      /* fall through to fetch */
    }
    fetch(url, {
      method: "POST",
      body: payload,
      keepalive: true,
      headers: { "Content-Type": "text/plain" },
    }).catch(() => {});
  }, [pathname]);

  return null;
}
