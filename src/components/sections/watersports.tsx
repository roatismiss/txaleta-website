import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal, Kicker } from "../reveal";

// Two watersports rides shown over the turquoise ocean banner. Photos live in
// public/images/experiences; the ocean backdrop (ocean_cali.jpg) carries the
// whole section.
const rides = [
  {
    title: "Jet Ski",
    description: "Open the throttle across the Bohol Sea, the volcano at your shoulder.",
    image: "/images/experiences/jet_ski_txaleta.webp",
  },
  {
    title: "Private Speedboat",
    description: "Our own boat runs you out to White Island, hidden coves and the open blue.",
    image: "/images/experiences/txaleta_private_boat.webp",
  },
];

export function Watersports() {
  return (
    <section id="watersports" className="relative overflow-hidden py-24 sm:py-32">
      {/* Ocean backdrop — Vila Cali turquoise water */}
      <Image
        src="/images/experiences/ocean_cali.jpg"
        alt="Turquoise water off the Camiguin coast"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Lighter wash than the other dark sections so the turquoise reads through;
          a touch darker top/bottom keeps the heading and CTA legible. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/25 to-ink/65" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 [text-shadow:0_2px_18px_rgba(18,26,18,0.55)]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="text-sand">On the Water</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-cream sm:text-5xl">
            Jet Ski &amp; Speedboat
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-cream/85">
            The Bohol Sea is yours to open up. Carve across it on a jet ski, or let our
            private speedboat run you out to White Island and the quiet coves beyond.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {rides.map((ride, i) => (
            <Reveal key={ride.title} delay={i * 0.08}>
              <div className="group relative h-[24rem] overflow-hidden sm:h-[28rem]">
                <Image
                  src={ride.image}
                  alt={ride.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-light">{ride.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">
                    {ride.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-6 text-center">
          <Link
            href="/book"
            className="label bg-brand px-8 py-5 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            Book Your Time on the Water
          </Link>
          <Link
            href="/experiences"
            className="group inline-flex items-center gap-3 border-b border-sand pb-1 text-cream transition-colors hover:text-sand"
          >
            <span className="label text-[11px]">All Experiences</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
