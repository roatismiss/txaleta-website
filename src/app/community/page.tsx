import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { community, site } from "@/lib/site";
import { InstagramIcon } from "@/components/icons";
import { InstagramEmbed } from "@/components/instagram-embed";
import { Reveal, Kicker } from "@/components/reveal";
import { TilePattern, PaperGrain, PalmCorner, RattanWeave } from "@/components/brand-texture";

export const metadata: Metadata = {
  title: "The Heart of Camiguin — Community & Stewardship",
  description:
    "Community, culture and island stewardship at Txaleta de Camiguin — local hiring, artisan partnerships with Natalia Sea Glass, Mt. Hibok-Hibok guides, Scuba de Oro and the people who make the island unforgettable.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      {/* ── Banner ── */}
      <section className="relative flex h-[75vh] min-h-[500px] items-end overflow-hidden">
        <Image
          src={community.hero.image}
          alt="The people and landscapes of Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]">
            {community.hero.kicker}
          </Kicker>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-light leading-[1.08] sm:text-5xl md:text-6xl">
            {community.hero.heading}
          </h1>
        </div>
      </section>

      {/* ── Opening quote + intro ── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <PaperGrain className="opacity-[0.06]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.12] lg:opacity-[0.18]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl">
            &ldquo;{community.quote}&rdquo;
          </p>
          {community.intro.map((p) => (
            <p key={p.slice(0, 24)} className="mt-7 text-[15px] leading-relaxed text-ink/65">
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      {/* ── Our people — alternating story rows ── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          {community.stories.map((s, i) => (
            <Reveal key={s.kicker}>
              <div
                className={`grid items-center gap-12 border-t border-ink/10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="group relative aspect-[16/10] w-full overflow-hidden [direction:ltr]">
                  <Image
                    src={s.image}
                    alt={s.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="[direction:ltr]">
                  <Kicker className="text-brand">{s.kicker}</Kicker>
                  <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                    {s.heading}
                  </h2>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/70">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Our Promise — three line manifesto ── */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
        <TilePattern tone="cream" fade="center" className="opacity-[0.12]" />
        <Reveal className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Kicker className="text-sand">{community.promise.heading}</Kicker>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10">
            {community.promise.points.map((p) => (
              <p key={p} className="font-display text-2xl font-light sm:text-3xl">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Local artisans — cards ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker className="text-brand">{community.artisans.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {community.artisans.heading}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {community.artisans.items.map((a, i) => (
              <Reveal key={a.name} delay={(i % 2) * 0.08}>
                <article className="flex h-full flex-col">
                  {"embed" in a && a.embed ? (
                    <div className="flex w-full justify-center">
                      <InstagramEmbed url={a.embed} />
                    </div>
                  ) : (
                    <div className="group relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={a.image}
                        alt={a.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="font-display mt-7 text-3xl font-light text-ink">{a.name}</h3>
                  {a.body.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-5 text-[15px] leading-relaxed text-ink/70">
                      {p}
                    </p>
                  ))}
                  {"link" in a && a.link ? (
                    <a
                      href={a.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label mt-7 inline-flex items-center gap-2 self-start text-[11px] text-brand transition-colors hover:text-brand-dark"
                    >
                      <InstagramIcon className="h-4 w-4" />
                      {a.link.label}
                    </a>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Walking with the mountain — leaf-backed feature row ── */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        {/* Jungle-leaf backdrop — portrait crop on mobile, landscape on larger screens */}
        <Image
          src="/images/textures/tropical-leaves-mobile.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover sm:hidden"
          aria-hidden
        />
        <Image
          src="/images/textures/tropical-leaves.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover sm:block"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/72" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="group relative aspect-[16/10] w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <Image
                  src={community.mountain.image}
                  alt={community.mountain.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </div>
              <div className="[text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
                <Kicker className="text-sand">{community.mountain.kicker}</Kicker>
                <h2 className="font-display mt-5 text-4xl font-light leading-tight text-cream sm:text-5xl">
                  {community.mountain.heading}
                </h2>
                {community.mountain.body.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/80">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Guardians of the sea — ocean-backed cards ── */}
      <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        {/* Turquoise ocean backdrop — portrait crop on mobile, landscape on larger screens */}
        <Image
          src="/images/experiences/ocean_cali_mobile.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover sm:hidden"
          aria-hidden
        />
        <Image
          src="/images/experiences/ocean_cali.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover sm:block"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/52 to-black/72" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">
            <Kicker className="text-sand">{community.sea.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-cream sm:text-5xl">
              {community.sea.heading}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {community.sea.items.map((s, i) => (
              <Reveal key={s.name} delay={(i % 2) * 0.08}>
                <article className="flex h-full flex-col">
                  <div className="group relative aspect-[16/10] w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display mt-7 text-3xl font-light text-cream">{s.name}</h3>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-5 text-[15px] leading-relaxed text-white/80">
                      {p}
                    </p>
                  ))}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Supporting local businesses — dark list ── */}
      <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <TilePattern tone="cream" fade="center" className="opacity-[0.10]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <Kicker className="text-sand">{community.partners.kicker}</Kicker>
              <h2 className="font-display mt-5 text-4xl font-light leading-tight sm:text-5xl">
                {community.partners.heading}
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/65">
                {community.partners.body}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
                {community.partners.list.map((name) => (
                  <li
                    key={name}
                    className="flex items-start gap-3 border-t border-white/15 py-4 text-[15px] leading-snug text-white/75"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand" strokeWidth={2} aria-hidden />
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Our Vision — checklist ── */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <Kicker className="text-brand">{community.vision.kicker}</Kicker>
              <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                {community.vision.heading}
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/70">
                {community.vision.body}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
                {community.vision.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 border-t border-ink/10 py-4 text-[15px] leading-snug text-ink/75"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── A Shared Journey — CTA ── */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <RattanWeave className="opacity-[0.10]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.10] lg:opacity-[0.14]" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">
            {community.sharedJourney.heading}
          </h2>
          {community.sharedJourney.body.map((p) => (
            <p key={p.slice(0, 24)} className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/65">
              {p}
            </p>
          ))}
          <p className="font-display mt-8 text-2xl font-light italic leading-snug text-sand">
            {community.sharedJourney.closing}
          </p>
          <Link
            href="/book"
            className="label mt-10 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            Book Your Stay <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-8 text-[13px] text-ink/45">
            Or reach us directly ·{" "}
            <a
              href={`tel:${site.contact.phoneRaw}`}
              className="text-ink/60 transition-colors hover:text-ink"
            >
              {site.contact.phone}
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
