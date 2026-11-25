"use client";

import { useSyncExternalStore } from "react";

// ============================================================================
// Cookie consent — the single source of truth for what the visitor allowed.
//
// What the site actually stores was measured on the live site (headless
// Chrome, 2026-11-25): no cookies at all, one sessionStorage flag for the
// splash, and third-party requests to Cloudbeds (/book), CloudReef (chat),
// Cloudflare R2 (video) and Instagram (/community). Everything is essential
// except Instagram, so there is ONE optional category today: "media".
//
// Adding a category (e.g. analytics for a campaign pixel):
//   1. add it to `ConsentChoices` + `DEFAULT_CHOICES`,
//   2. give it a row in the preferences dialog (cookie-consent.tsx),
//   3. bump CONSENT_VERSION so everyone who answered before is asked again,
//   4. list it in src/content/legal/cookies.md.
// ============================================================================

export const CONSENT_COOKIE = "txaleta_consent";
export const CONSENT_VERSION = 1;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months — matches cookies.md

const CHANGE_EVENT = "txaleta:consent-change";
const OPEN_EVENT = "txaleta:open-cookie-settings";

export type ConsentChoices = { media: boolean };
export type Consent = ConsentChoices & { version: number; decidedAt: number };

export const DEFAULT_CHOICES: ConsentChoices = { media: false };

/** Raw cookie value, "" when absent. A string, so React can compare snapshots. */
function readRaw(): string {
  const hit = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  return hit ? decodeURIComponent(hit.slice(CONSENT_COOKIE.length + 1)) : "";
}

/** Parse a stored value. Anything stale or malformed counts as "not decided". */
export function parseConsent(raw: string): Consent | null {
  if (!raw) return null;
  const p = new URLSearchParams(raw);
  const version = Number(p.get("v"));
  if (version !== CONSENT_VERSION) return null;
  return {
    version,
    media: p.get("media") === "1",
    decidedAt: Number(p.get("ts")) || 0,
  };
}

/** The decision on record right now (client only), or null if none. */
export function readConsent(): Consent | null {
  return parseConsent(readRaw());
}

export function saveConsent(choices: ConsentChoices) {
  const value = new URLSearchParams({
    v: String(CONSENT_VERSION),
    media: choices.media ? "1" : "0",
    ts: String(Math.floor(Date.now() / 1000)),
  }).toString();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/**
 * The visitor's consent.
 *   undefined → not known yet (server render / hydration) — render nothing
 *               consent-dependent, so server and client markup agree.
 *   null      → no decision on record: show the banner, load nothing optional.
 *   Consent   → their decision.
 */
export function useConsent(): Consent | null | undefined {
  const raw = useSyncExternalStore(subscribe, readRaw, () => undefined);
  return raw === undefined ? undefined : parseConsent(raw);
}

/** Ask the banner to open its preferences dialog (footer link, cookies page). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
