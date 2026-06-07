import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, Zap, ShieldCheck, Mail, type LucideIcon } from "lucide-react";
import { BookingFlow } from "@/components/booking-flow";
import { CloudbedsBooking } from "@/components/cloudbeds-booking";
import { Kicker } from "@/components/reveal";
import { PoweredByCloudReef } from "@/components/powered-by";
import { site, bookingProvider } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description: `Request a booking at ${site.name} — seaview suites, ocean-view glamping and garden rooms on Camiguin Island.`,
};

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  return (
    <>
      {/* Banner */}
      <section className="relative flex h-[44vh] min-h-[320px] items-end overflow-hidden">
        <Image
          src="/images/resort/txaleta_beach.webp"
          alt="Txaleta de Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-12 text-white">
          <Kicker>Reservations</Kicker>
          <h1 className="font-display mt-4 text-4xl font-light sm:text-6xl">Book Your Stay</h1>
        </div>
      </section>

      {/* Booking flow */}
      <section className="bg-brand py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="max-w-xl text-[15px] leading-relaxed text-white/80">
            Check live availability, choose your room and confirm instantly. Your booking
            and payment are handled securely — you&apos;ll get an email confirmation right away.
            Prefer to talk it through? Call{" "}
            <a href={`tel:${site.contact.phoneRaw}`} className="text-white underline hover:text-white/70">
              {site.contact.phone}
            </a>{" "}
            or message us on{" "}
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="text-white underline hover:text-white/70">
              WhatsApp
            </a>
            .
          </p>

          {/* Trust strip */}
          <div className="mt-8 flex flex-col gap-3 border-y border-white/20 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            {([
              { icon: CalendarCheck, label: "Live availability" },
              { icon: Zap, label: "Instant confirmation" },
              { icon: ShieldCheck, label: "Secure payment", note: "GCash · Maya · Apple Pay" },
              { icon: Mail, label: "Email in seconds" },
            ] as { icon: LucideIcon; label: string; note?: string }[]).map(({ icon: Icon, label, note }) => (
              <span key={label} className="flex items-start gap-2.5 text-[13px] text-white/80">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
                <span className="flex flex-col leading-tight">
                  <span>{label}</span>
                  {note && <span className="mt-0.5 text-[11px] text-white/50">{note}</span>}
                </span>
              </span>
            ))}
            {bookingProvider === "cloudreef" && (
              <PoweredByCloudReef tone="dark" className="sm:ml-auto" />
            )}
          </div>

          {/* Booking engine — white card, black squared border */}
          <div className="mt-12 border-2 border-ink bg-white">
            {bookingProvider === "cloudbeds" ? (
              <CloudbedsBooking
                checkin={first(sp.checkin)}
                checkout={first(sp.checkout)}
                guests={first(sp.guests)}
              />
            ) : (
              <BookingFlow
                initialCheckin={first(sp.checkin)}
                initialCheckout={first(sp.checkout)}
                initialGuests={first(sp.guests)}
                initialRoom={first(sp.room)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
