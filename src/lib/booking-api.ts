// ============================================================================
// Client helpers for the CloudReef public widget API.
// CloudReef is the source of truth: rooms + live prices, real availability, and
// the paid booking lands back in the CloudReef dashboard. Base URL + widget key
// come from src/lib/site.ts.
// ============================================================================

import {
  site,
  rooms as fallbackRooms,
  featuredRoomOrder,
  roomKickers,
  roomKickerFallback,
} from "@/lib/site";

const BASE = site.cloudreef.baseUrl;
const KEY = site.cloudreef.widgetKey;

export type ApiRoom = {
  id: string;
  roomNumber: string;
  name: string;
  type: string;
  rate: number;
  maxOccupancy: number;
  description: string | null;
  amenities: string[];
  images: string[];
};

export type ApiRoomType = {
  name: string;
  type: string;
  base_rate: number;
  max_occupancy: number;
  description: string | null;
  amenities: string[];
  images: string[];
  count: number;
  room_numbers: string[];
};

export type RoomsResponse = {
  resort: string;
  currency: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  rooms: ApiRoom[];
  roomTypes: ApiRoomType[];
};

export type AvailabilityType = {
  name: string;
  unitCount: number;
  bookedRanges: { checkIn: string; checkOut: string }[];
  fullyBookedDates: string[]; // YYYY-MM-DD
};

export type AvailabilityResponse = {
  from: string;
  to: string;
  types: AvailabilityType[];
};

export type ConfirmPayload = {
  name: string;
  email: string;
  phone?: string;
  roomType: string;
  checkin: string;
  checkout: string;
  guests: number;
  children?: number;
  message?: string;
  promoCode?: string; // discount code — re-validated + applied server-side
  payment: { method: string; simulated: boolean; reference?: string };
};

export type ConfirmResponse = {
  success: true;
  bookingRef: string;
  room: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  currency: string;
  ratePerNight: number;
  subtotal?: number;
  discountAmount?: number;
  promoCode?: string | null;
  total: number;
  amountPaid: number;
  emailSent: boolean;
  emailError?: string;
};

async function jsonOrThrow<T>(res: Response): Promise<T> {
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON */
  }
  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : null) ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

export async function fetchRooms(): Promise<RoomsResponse> {
  const res = await fetch(`${BASE}/api/widget/rooms?key=${encodeURIComponent(KEY)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return jsonOrThrow<RoomsResponse>(res);
}

// ── Display rooms (Accommodation page + homepage section) ────────────────────
// Live Cloudbeds rooms with Cloudbeds' own photos, mapped to the marketing
// display shape. Falls back to the curated site.ts rooms if the API is
// unavailable so pages never break.

export type DisplayRoom = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  amenities: string[];
  images: string[];
  cover: string;
  maxOccupancy: number;
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Whitespace-insensitive, lower-cased key so live Cloudbeds names (which can
 *  carry stray double spaces) still match the site.ts maps. */
function normName(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

/** The non-price marketing kicker for a live room (editable in site.ts). */
function kickerFor(name: string): string {
  const target = normName(name);
  for (const [k, v] of Object.entries(roomKickers)) {
    if (normName(k) === target) return v;
  }
  return roomKickerFallback;
}

/** Featured rooms first (in `featuredRoomOrder`), the rest keep their incoming
 *  order. Stable sort, so non-featured stay in the API's ascending-rate order. */
function sortFeatured(list: DisplayRoom[]): DisplayRoom[] {
  const order = featuredRoomOrder.map(normName);
  const rank = (name: string) => {
    const i = order.indexOf(normName(name));
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  return [...list].sort((a, b) => rank(a.name) - rank(b.name));
}

export async function fetchDisplayRooms(): Promise<DisplayRoom[]> {
  try {
    const data = await fetchRooms();
    const types = (data.roomTypes ?? []).filter((t) => t.images && t.images.length > 0);
    if (!types.length) throw new Error("no cloudbeds rooms");
    // Price is intentionally NOT shown on the cards — the exact live rate lives in
    // the Cloudbeds booking engine at /book. The kicker is a non-price label.
    const mapped: DisplayRoom[] = types.map((t) => ({
      slug: slugify(t.name),
      name: t.name,
      kicker: kickerFor(t.name),
      description:
        t.description ||
        "A comfortable room at Txaleta de Camiguin, moments from the Bohol Sea.",
      amenities: t.amenities ?? [],
      images: t.images,
      cover: t.images[0],
      maxOccupancy: t.max_occupancy,
    }));
    return sortFeatured(mapped);
  } catch {
    return sortFeatured(
      fallbackRooms.map((r) => ({
        slug: r.slug,
        name: r.name,
        kicker: r.kicker,
        description: r.description,
        amenities: r.amenities,
        images: r.images,
        cover: r.cover,
        maxOccupancy: r.maxOccupancy,
      }))
    );
  }
}

export async function fetchAvailability(from: string, to: string): Promise<AvailabilityResponse> {
  const url = `${BASE}/api/widget/availability?key=${encodeURIComponent(KEY)}&from=${from}&to=${to}`;
  const res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
  return jsonOrThrow<AvailabilityResponse>(res);
}

export async function confirmBooking(payload: ConfirmPayload): Promise<ConfirmResponse> {
  const res = await fetch(`${BASE}/api/widget/booking-confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ widgetKey: KEY, ...payload }),
  });
  return jsonOrThrow<ConfirmResponse>(res);
}

// ── Promotions ───────────────────────────────────────────────────────────────

export type PromoValidation =
  | {
      valid: true;
      code: string;
      title: string;
      discountType: "percentage" | "fixed";
      discountValue: number;
      discountAmount: number;
      subtotal: number;
      total: number;
      currency: string;
    }
  | { valid: false; message: string; currency?: string };

/** Live discount preview for a code against the chosen room + dates. */
export async function validatePromo(args: {
  code: string;
  checkin?: string;
  checkout?: string;
  roomType?: string;
}): Promise<PromoValidation> {
  const params = new URLSearchParams({ key: KEY, code: args.code });
  if (args.checkin) params.set("checkin", args.checkin);
  if (args.checkout) params.set("checkout", args.checkout);
  if (args.roomType) params.set("roomType", args.roomType);
  const res = await fetch(`${BASE}/api/widget/validate-promo?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return jsonOrThrow<PromoValidation>(res);
}

export type FeaturedPromo = {
  code: string;
  title: string;
  description: string | null;
  discountType: "percentage" | "fixed";
  discountValue: number;
};

/** The single featured promo the resort wants advertised (or null). */
export async function fetchFeaturedPromo(): Promise<FeaturedPromo | null> {
  const res = await fetch(`${BASE}/api/widget/promos?key=${encodeURIComponent(KEY)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await jsonOrThrow<{ featured: FeaturedPromo | null }>(res);
  return data.featured;
}

// ── Formatting + date helpers ───────────────────────────────────────────────

export function formatMoney(currency: string, amount: number): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

/** Nights between two YYYY-MM-DD strings. */
export function nightsBetween(checkin: string, checkout: string): number {
  const a = new Date(`${checkin}T00:00:00.000Z`).getTime();
  const b = new Date(`${checkout}T00:00:00.000Z`).getTime();
  if (isNaN(a) || isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / 86400000);
}

/**
 * Each night in [checkin, checkout) as a UTC "YYYY-MM-DD" key. String-based and
 * timezone-independent, so it compares cleanly against the API's
 * fullyBookedDates (which are UTC date strings) with no off-by-one.
 */
export function nightKeysInRange(checkin: string, checkout: string): string[] {
  const out: string[] = [];
  let d = new Date(`${checkin}T00:00:00.000Z`);
  const end = new Date(`${checkout}T00:00:00.000Z`);
  if (isNaN(d.getTime()) || isNaN(end.getTime())) return out;
  while (d < end) {
    out.push(d.toISOString().slice(0, 10));
    d = new Date(d.getTime() + 86400000);
  }
  return out;
}

/** Convert YYYY-MM-DD strings to local Date objects (for the day picker). */
export function ymdToDate(s: string): Date {
  return new Date(`${s}T00:00:00`);
}
