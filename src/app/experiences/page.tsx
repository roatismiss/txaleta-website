import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experiences, site } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Island boat tours, Mount Hibok-Hibok treks, jet ski, and a guide to Camiguin — White Island, the Sunken Cemetery, cold springs and waterfalls, from Txaleta de Camiguin.",
};

const island = [
  { name: "White Island", note: "A bare crescent of white sand off Mambajao, reached by banca at first light — no trees, no shade, just the sandbar, the reef and the volcano across the water." },
  { name: "Mantigue Island", note: "A green islet ringed by a marine sanctuary, twenty minutes out. Snorkel the drop-off, then lunch in the shade of the trees." },
  { name: "The Sunken Cemetery", note: "A single white cross stands over the town the 1871 eruption pulled into the sea — best met by kayak as the sun goes down." },
  { name: "Katibawasan Falls", note: "Seventy metres of water falling in one clean ribbon into a cold, fern-ringed pool at the foot of the highlands." },
  { name: "Cold Springs & Soda Pool", note: "Sto. Niño's spring-fed pools run clear and cold; nearby, the Bura pool fizzes with natural soda water you can swim in." },
  { name: "Ardent Hot Spring", note: "On the flank of Hibok-Hibok, volcano-warmed pools sit in the rainforest — the island's other temperature." },
  { name: "Giant Clam Sanctuary", note: "Off Cantaan, rows of giant clams the size of armchairs rest in the shallows, close enough to snorkel above." },
  { name: "Lanzones", note: "Camiguin grows the sweetest lanzones in the country. Come in October and the whole island turns out to celebrate them." },
];

export default function ExperiencesPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative flex h-[52vh] min-h-[380px] items-end overflow-hidden">
        <Image
          src="/images/experiences/txaleta_boat.webp"
          alt="Island boat tours from Txaleta de Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-white">
          <Kicker>Things to Do on Camiguin</Kicker>
          <h1 className="font-display mt-4 text-5xl font-light sm:text-6xl md:text-7xl">Experiences</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl">
            Camiguin gives up its best on its own terms — by banca, by ridgeline, by the
            slow turn of a coastal road. Choose how you go.
          </p>
        </Reveal>
      </section>

      {/* Signature experiences — alternating feature rows */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-20 sm:gap-28">
            {experiences.map((exp, i) => (
              <Reveal key={exp.title}>
                <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="group relative aspect-[4/3] w-full overflow-hidden [direction:ltr]">
                    {exp.video ? (
                      <video
                        src={exp.video}
                        poster={exp.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="[direction:ltr]">
                    <Kicker>{`0${i + 1} · Signature`}</Kicker>
                    <h2 className="font-display mt-4 text-3xl font-light text-ink sm:text-4xl">{exp.title}</h2>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/70">{exp.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Boats & beaches photo band */}
      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker>The Shore &amp; the Sea</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light sm:text-5xl">
              Days That Begin at the Waterline
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              "/images/experiences/txaleta_private_boat.webp",
              "/images/resort/txaleta_beach.webp",
              "/images/resort/txaleta_sand.webp",
              "/images/experiences/Txaleta_private_boat_interior.webp",
            ].map((src) => (
              <div key={src} className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={src}
                  alt="Boats and beaches at Txaleta de Camiguin"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond the resort — Camiguin island guide */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker>Beyond the Resort</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              The Whole Island Is the Day Trip
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
              One road, sixty-four kilometres, and more than enough to fill every morning
              of your stay. We&apos;ll help you plan the order.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {island.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 0.08}>
                <div className="flex gap-5 border-t border-ink/10 pt-6">
                  <span className="font-display text-2xl font-light text-sand">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display text-2xl font-light text-ink">{p.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink/65">{p.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-white sm:py-28">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-light sm:text-4xl">Let Us Plan Your Days</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
            Tell us how long you&apos;re staying and we&apos;ll line up the boats, the
            treks and the quiet corners — and hold the right room for it.
          </p>
          <Link
            href="/book"
            className="label mt-9 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            Plan Your Stay <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
