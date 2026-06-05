import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { site, cloudbedsEmbedMode } from "@/lib/site";
import { cloudbedsEngineUrl, cloudbedsEnabled } from "@/lib/cloudbeds";
import { BookingBar } from "@/components/booking-bar";

type Props = {
  checkin?: string;
  checkout?: string;
  guests?: string;
};

/**
 * Cloudbeds Booking Engine surface on /book. While CloudReef is not yet live at
 * the property, Cloudbeds is the single source of truth: it owns availability,
 * payment and the OTA channel manager.
 *
 * Default mode = "new-tab": we hand the guest to the engine in a new FIRST-PARTY
 * tab, deep-linked with their dates. This is the safe choice — the legacy inline
 * iframe is deprecated by Cloudbeds and its SameSite cookies are blocked inside a
 * cross-origin iframe on iOS Safari / in-app browsers, breaking payment.
 * Set `cloudbedsEmbedMode = "be-plus"` once we have the Booking Engine Plus /
 * Immersive Experience embed code, for a true in-page embed.
 */
export function CloudbedsBooking({ checkin, checkout, guests }: Props) {
  // Not configured → never render a broken/blank engine; offer human channels.
  if (!cloudbedsEnabled) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-light text-ink">Reserve your stay</p>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink/65">
          Online booking is being set up. To reserve right now, call us or send a
          quick message — we&apos;ll confirm within the hour.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${site.contact.phoneRaw}`}
            className="label inline-flex items-center justify-center bg-black px-7 py-4 text-[11px] text-brand transition-colors hover:bg-brand-dark hover:text-white"
          >
            Call {site.contact.phone}
          </a>
          <a
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center justify-center border border-ink/20 px-7 py-4 text-[11px] text-ink transition-colors hover:border-ink/40"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // Legacy inline iframe — kept behind the flag for desktop testing only; NOT a
  // safe production default (see note above + cloudbedsEmbedMode docs).
  if (cloudbedsEmbedMode === "iframe") {
    const src = cloudbedsEngineUrl({ checkin, checkout, guests });
    return (
      <div>
        <iframe
          title={`Book your stay at ${site.name}`}
          src={src}
          allow="payment"
          loading="eager"
          className="w-full rounded-lg border border-ink/10 bg-white"
          style={{ minHeight: "1500px" }}
        />
        <p className="mt-4 text-center text-[12px] text-ink/50">
          Trouble loading the booking form?{" "}
          <a href={src} target="_blank" rel="noopener noreferrer" className="text-ink underline hover:text-brand">
            Open it in a new tab
          </a>
          .
        </p>
      </div>
    );
  }

  // Booking Engine Plus / Immersive Experience 2.0 — true first-party in-page
  // embed (works on iOS Safari + in-app browsers; no third-party cookies). The
  // loader script defines the <cb-immersive-experience> web component, bound to
  // the property via `property-code`. NOTE: Cloudbeds only renders the engine on
  // domains whitelisted in the property's Booking Engine settings — until our
  // domain is whitelisted it will not display.
  if (cloudbedsEmbedMode === "be-plus") {
    return (
      <div className="cloudbeds-immersive min-h-[600px]">
        <Script
          src="https://static1.cloudbeds.com/booking-engine/latest/static/js/immersive-experience/cb-immersive-experience.js"
          strategy="afterInteractive"
          data-cookieconsent="ignore"
        />
        <cb-immersive-experience mode="standard" property-code={site.cloudbeds.propertyId}></cb-immersive-experience>
      </div>
    );
  }

  // Default = first-party new-tab handoff.
  const ci = fmtDate(checkin);
  const co = fmtDate(checkout);
  const hasDates = Boolean(ci && co);
  const guestCount = Math.max(1, Math.trunc(Number(guests) || 0)) || 2;
  const nights = nightsBetween(checkin, checkout);
  const url = cloudbedsEngineUrl({ checkin, checkout, guests });

  if (hasDates) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-8 sm:p-10">
        <p className="label text-[10px] tracking-widest text-ink/45">Your dates</p>
        <p className="font-display mt-2 text-2xl font-light text-ink sm:text-3xl">
          {ci} <span className="text-ink/30">→</span> {co}
        </p>
        <p className="mt-1.5 text-[13px] text-ink/55">
          {nights > 0 ? `${nights} ${nights === 1 ? "night" : "nights"} · ` : ""}
          {guestCount} {guestCount === 1 ? "guest" : "guests"}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-8 inline-flex items-center gap-2.5 bg-black px-9 py-4 text-[11px] text-brand transition-colors hover:bg-brand-dark hover:text-white"
        >
          Continue to Secure Booking
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </a>

        <p className="mt-5 max-w-md text-[13px] leading-relaxed text-ink/55">
          You&apos;ll choose your room and pay on our secure booking page — live
          availability, instant confirmation and an email in seconds.
        </p>
      </div>
    );
  }

  // No dates yet → let them pick on our branded bar (routes back here with
  // dates), with a direct link to browse the full engine as a secondary path.
  return (
    <div>
      <p className="mb-6 text-[14px] leading-relaxed text-ink/65">
        Choose your dates to check live availability and book your room.
      </p>
      <BookingBar />
      <div className="mt-7 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink/60 underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          Or browse all rooms &amp; rates
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </div>
  );
}

/** YYYY-MM-DD → "Jul 1, 2026" (UTC-stable, no off-by-one). */
function fmtDate(ymd?: string): string | null {
  if (!ymd) return null;
  const d = new Date(`${ymd}T00:00:00Z`);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Whole nights between two YYYY-MM-DD strings (0 if invalid/non-positive). */
function nightsBetween(checkin?: string, checkout?: string): number {
  if (!checkin || !checkout) return 0;
  const a = new Date(`${checkin}T00:00:00Z`).getTime();
  const b = new Date(`${checkout}T00:00:00Z`).getTime();
  if (isNaN(a) || isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / 86400000);
}
