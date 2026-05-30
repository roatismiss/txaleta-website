import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/booking-form";
import { Kicker } from "@/components/reveal";
import { site } from "@/lib/site";

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

      {/* Form */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-5xl gap-14 px-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="max-w-xl text-[15px] leading-relaxed text-ink/70">
              Send us your dates and we&apos;ll confirm availability and rates by email,
              usually within a few hours. No payment is taken now — this is a request to book.
            </p>
            <div className="mt-10">
              <BookingForm
                initialCheckin={first(sp.checkin)}
                initialCheckout={first(sp.checkout)}
                initialGuests={first(sp.guests)}
                initialRoom={first(sp.room)}
              />
            </div>
          </div>

          {/* Side info */}
          <aside className="h-fit border border-ink/10 bg-cream p-8">
            <h2 className="font-display text-2xl font-light text-ink">Need a hand?</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              Prefer to talk it through? Reach us directly — we&apos;re happy to help plan
              transfers, tours and the perfect room.
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="label text-[9px] text-ink/40">Phone</dt>
                <dd><a href={`tel:${site.contact.phoneRaw}`} className="text-ink hover:text-sand">{site.contact.phone}</a></dd>
              </div>
              <div>
                <dt className="label text-[9px] text-ink/40">WhatsApp / Viber</dt>
                <dd><a href={`https://wa.me/${site.contact.whatsapp}`} className="text-ink hover:text-sand">+63 917 818 2277</a></dd>
              </div>
              <div>
                <dt className="label text-[9px] text-ink/40">Email</dt>
                <dd><a href={`mailto:${site.contact.email}`} className="text-ink hover:text-sand">{site.contact.email}</a></dd>
              </div>
              <div>
                <dt className="label text-[9px] text-ink/40">Where</dt>
                <dd className="text-ink/70">{site.location.address}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
