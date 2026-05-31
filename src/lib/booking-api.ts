// ============================================================================
// Client helpers for the CloudReef public widget API.
// CloudReef is the source of truth: rooms + live prices, real availability, and
// the paid booking lands back in the CloudReef dashboard. Base URL + widget key
// come from src/lib/site.ts.
// ============================================================================

import { site } from "@/lib/site";

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
