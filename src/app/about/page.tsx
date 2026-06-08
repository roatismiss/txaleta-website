import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { about, pillars, idealGuests, site } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Txaleta de Camiguin is a family-owned boutique resort on a Mambajao clifftop — Filipino-Spanish heritage, heartfelt hospitality, and slow island living. A heartfelt retreat where heritage meets healing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* ── Banner ── */}
      <section className="relative flex h-[75vh] min-h-[500px] items-end overflow-hidden">
        <Image
          src={about.hero.image}
          alt="Txaleta de Camiguin on the clifftop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]">
            {about.hero.kicker}
          </Kicker>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-light leading-[1.08] sm:text-5xl md:text-6xl">
            {about.hero.heading}
          </h1>
        </div>
      </section>

      {/* ── Opening + brand essence ── */}
      <section className="bg-white py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl">
            &ldquo;A heartfelt retreat where heritage meets healing.&rdquo;
          </p>
          <p className="mt-8 text-[15px] leading-relaxed text-ink/65">{about.intro}</p>
        </Reveal>
      </section>

      {/* ── Story rows — alternating text + image ── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          {about.sections.map((s, i) => (
            <Reveal key={s.kicker}>
              <div
                className={`grid items-center gap-12 border-t border-ink/10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden [direction:ltr]">
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

      {/* ── A Unique Location — copy + attractions list ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <Kicker className="text-brand">{about.location.kicker}</Kicker>
              <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                {about.location.heading}
              </h2>
              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink/70">
                {about.location.body}
              </p>
              <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={about.location.image}
                  alt="Aerial view of Camiguin from Txaleta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid gap-y-1 sm:grid-cols-2 sm:gap-x-10">
                {about.location.attractions.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 border-b border-ink/10 py-4 text-[15px] text-ink/75"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Brand pillars — what we believe ── */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker className="text-sand">What We Believe</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light sm:text-5xl">
              Five Ideas at the Heart of Txaleta
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                <div className="border-t border-white/15 pt-7">
                  <span className="font-display text-2xl font-light text-sand">{`0${i + 1}`}</span>
                  <h3 className="font-display mt-4 text-2xl font-light">{p.title}</h3>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-white/45">
                    {p.idea}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/65">{p.quote}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes us special — checklist ── */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <Kicker className="text-brand">{about.whyChoose.kicker}</Kicker>
              <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                {about.whyChoose.heading}
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/70">
                {about.whyChoose.body}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
                {about.whyChoose.points.map((point) => (
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

      {/* ── Ideal guests ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker className="text-brand">{idealGuests.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {idealGuests.heading}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/65">{idealGuests.body}</p>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {idealGuests.items.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 0.06}>
                <div className="flex gap-5 border-t border-ink/10 pt-6">
                  <span className="font-display text-2xl font-light text-brand">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display text-2xl font-light text-ink">{g.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink/65">{g.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Come home — CTA ── */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-4xl font-light sm:text-5xl">{about.comeHome.heading}</h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
            {about.comeHome.body}
          </p>
          <p className="font-display mt-8 text-2xl font-light italic leading-snug text-sand">
            {about.comeHome.closing.join(" ")}
          </p>
          <Link
            href="/book"
            className="label mt-10 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            Book Your Stay <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-8 text-[13px] text-white/45">
            Or reach us directly ·{" "}
            <a
              href={`tel:${site.contact.phoneRaw}`}
              className="text-white/70 transition-colors hover:text-white"
            >
              {site.contact.phone}
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
