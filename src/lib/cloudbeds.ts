// ============================================================================
// Cloudbeds Booking Engine helpers.
// The engine is Cloudbeds' hosted page; we deep-link the guest's dates/guests
// into it and hand off (new tab) or embed (BE Plus, future). Cloudbeds is the
// single source of truth for availability + payment in this phase.
// ============================================================================

import { site } from "./site";

/** True when a Cloudbeds property code is configured. */
export const cloudbedsEnabled = Boolean(site.cloudbeds.propertyId);

export type EngineUrlOpts = {
  checkin?: string; // YYYY-MM-DD
  checkout?: string; // YYYY-MM-DD
  guests?: string | number;
};

/**
 * First-party hosted Cloudbeds booking engine URL, deep-linked with the guest's
 * dates + party size.
 *
 * Host = hotels.cloudbeds.com (the public, brandable host — NOT us2.cloudbeds.com,
 * which is the internal backend). NO `/en/` locale prefix: hotels.cloudbeds.com/en/…
 * returns HTTP 400. Confirmed params: currency (lowercase), checkin, checkout,
 * adults (ISO YYYY-MM-DD dates). Room-type deep-linking is intentionally omitted
 * — it needs the PMS accommodation abbreviation (e.g. #room_type=EXE), which we
 * don't have; a wrong value lands the guest on an empty room view.
 */
export function cloudbedsEngineUrl(opts: EngineUrlOpts = {}): string {
  const { propertyId, currency } = site.cloudbeds;
  const params = new URLSearchParams();
  if (currency) params.set("currency", currency.toLowerCase());
  if (opts.checkin) params.set("checkin", String(opts.checkin));
  if (opts.checkout) params.set("checkout", String(opts.checkout));
  const adults = Number(opts.guests);
  if (Number.isFinite(adults) && adults > 0) params.set("adults", String(Math.trunc(adults)));
  const qs = params.toString();
  return `https://hotels.cloudbeds.com/reservation/${propertyId}${qs ? `?${qs}` : ""}`;
}
