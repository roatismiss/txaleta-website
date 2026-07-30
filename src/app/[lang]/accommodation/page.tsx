import type { Metadata } from "next";
import { pageAlternates, type Locale } from "@/lib/i18n";
import { getPageSeo } from "@/locales/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wifi, Waves, Coffee, Wind, Car, Utensils, Sparkles, Bell } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";
import { RoomGallery } from "@/components/room-gallery";
import { RattanWeave, PalmCorner } from "@/components/brand-texture";
import { fetchDisplayRooms } from "@/lib/booking-api";
import { accommodationContent } from "@/locales/content/accommodation";
import { localePath } from "@/lib/i18n";

// Refresh the live Cloudbeds rooms hourly (ISR) — avoids a Cloudbeds call per view.
export const revalidate = 3600;

const meta: Metadata = {
  title: "Accommodation",
  description:
    "Seaview suites, cliff-edge ocean-view glamping and garden retreats at Txaleta de Camiguin — fourteen rooms between the volcano and the Bohol Sea, minutes from Camiguin Airport.",};

const inclusionIcons = [Coffee, Waves, Wifi, Wind, Car, Utensils, Sparkles, Bell];

export default async function AccommodationPage({ params }: PageProps<"/[lang]">) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const t = accommodationContent[lang];
  const inclusions = inclusionIcons.map((icon, i) => ({ icon, ...t.inclusions[i] }));
  const displayRooms = await fetchDisplayRooms();
  return (
    <>
      {/* ── Banner ── */}
      <section className="relative flex h-[75vh] min-h-[500px] items-end overflow-hidden">
        <Image
          src="/images/resort/txaleta_sand_brand.jpg"
          alt="Txaleta de Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_85%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-white">
          <div className="ml-auto max-w-xl text-right">
            <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]">{t.heroKicker}</Kicker>
            <h1 className="font-display mt-4 text-5xl font-light sm:text-6xl md:text-7xl">
              {t.heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="bg-white py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl">
            {t.intro}
          </p>
        </Reveal>
      </section>

      {/* ── Rooms — alternating feature rows with an image collage ── */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <RattanWeave className="opacity-[0.10]" />
        <PalmCorner corner="tr" className="text-palm opacity-[0.12] lg:opacity-[0.18]" />
        <PalmCorner corner="bl" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-24 sm:gap-32">
            {displayRooms.map((room, i) => (
              <Reveal key={room.slug}>
                <div
                  id={room.slug}
                  className={`grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image collage — single hero image on mobile, full collage at sm+ */}
                  <div className="[direction:ltr]">
                    <RoomGallery images={room.images} roomName={room.name} />
                  </div>

                  {/* Text */}
                  <div className="[direction:ltr]">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-2xl font-light text-brand">{`0${i + 1}`}</span>
                      <Kicker className="text-brand">{room.kicker}</Kicker>
                    </div>
                    <h2 className="font-display mt-3 text-3xl font-light text-ink sm:text-4xl">
                      {room.name}
                    </h2>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/70">
                      {room.description}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {room.amenities.map((a) => (
                        <li
                          key={a}
                          className="label rounded-full border border-ink/15 px-3.5 py-1.5 text-[9px] text-ink/60"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                      <Link
                        href={`${localePath(lang, "/book")}?room=${room.slug}`}
                        className="group label relative inline-flex items-center gap-3 bg-transparent px-0 py-0 text-[11px] text-ink transition-colors hover:text-brand"
                      >
                        <span className="relative pb-1">
                          {t.checkAvailability}
                          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-brand transition-colors group-hover:bg-brand-dark"></span>
                        </span>
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                      <span className="text-[13px] text-ink/55">
                        {t.sleepsUpTo.replace("{n}", String(room.maxOccupancy))}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inclusions ── */}
      <section id="inclusions" className="scroll-mt-24 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker className="text-brand">{t.inclusionsKicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {t.inclusionsHeading}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
              {t.inclusionsIntro}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {inclusions.map(({ icon: Icon, label, note }, i) => (
              <Reveal key={label} delay={(i % 4) * 0.06}>
                <div className="flex flex-col items-start border-t border-ink/10 pt-6">
                  <Icon className="h-6 w-6 text-brand" strokeWidth={1.25} />
                  <h3 className="font-display mt-4 text-xl font-light text-ink">{label}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <RattanWeave className="opacity-[0.10]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.10] lg:opacity-[0.14]" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">{t.ctaHeading}</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">
            {t.ctaBody}
          </p>
          <Link
            href={localePath(lang, "/book")}
            className="label mt-9 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            {t.checkAvailability} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-8 text-[13px] text-ink/45">
            {t.orCall} ·{" "}
            <a href={`tel:${site.contact.phoneRaw}`} className="text-ink/60 transition-colors hover:text-ink">
              {site.contact.phone}
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const seo = getPageSeo(lang as Locale, "/accommodation");
  return {
    ...meta,
    ...(seo ? { title: seo.title, description: seo.description } : {}),
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    alternates: pageAlternates(lang as Locale, "/accommodation"),
  };
}
