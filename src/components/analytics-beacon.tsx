"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

// ============================================================================
// First-party web-analytics beacon. Fires one pageview to CloudReef on every
// client-side route change, so the resort's /analytics dashboard shows real,
// self-owned numbers (no dependency on a Vercel Web Analytics Drain).
//
// Identity: a stable per-browser UUID stored in localStorage ("cr_vid"). The
// CloudReef dashboard counts distinct visitor ids as "unique visitors", so this
// matches Vercel's "Visitors" definition. We send only path + referrer; country
// and device are derived server-side. Uses usePathname() only (no
// useSearchParams) so no <Suspense> boundary is needed — same as ChatbotEmbed.
// ============================================================================

// Per-tab fallback when localStorage is unavailable (Safari private mode, etc.).
let memoryVisitorId = "";

function getVisitorId(): string {
  try {
    const KEY = "cr_vid";
    let id = window.localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    if (!memoryVisitorId) memoryVisitorId = crypto.randomUUID();
    return memoryVisitorId;
  }
}

export function AnalyticsBeacon() {
  const pathname = usePathname();
  const lastSent = useRef("");

  useEffect(() => {
    if (!pathname || lastSent.current === pathname) return; // dedupe refires
    lastSent.current = pathname;

    const url = `${site.cloudreef.baseUrl}/api/analytics/collect`;
    const body = JSON.stringify({
      k: site.cloudreef.widgetKey,
      vid: getVisitorId(),
      p: pathname,
      r: document.referrer || "",
      e: "pageview",
    });

    // sendBeacon survives unload/route changes and (as text/plain) skips the
    // CORS preflight. Fall back to keepalive fetch if it's unavailable or the
    // browser refuses to queue the beacon.
    const sendFetch = () => {
      fetch(url, {
        method: "POST",
        body,
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
      }).catch(() => {});
    };
    try {
      if (!(navigator.sendBeacon && navigator.sendBeacon(url, body))) sendFetch();
    } catch {
      sendFetch();
    }
  }, [pathname]);

  return null;
}
