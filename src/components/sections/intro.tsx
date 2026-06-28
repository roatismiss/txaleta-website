import Image from "next/image";
import { Waves, BedDouble, Plane } from "lucide-react";
import { Reveal, Kicker } from "../reveal";
import {
  BotanicalAccent,
  CalachuchiCorner,
  DriftingPetals,
  PaperGrain,
  PalmCorner,
} from "../brand-texture";

const features = [
  { icon: Waves, label: "Infinity Pool", note: "Meeting the horizon" },
  { icon: BedDouble, label: "Seaview Rooms", note: "Wake to the ocean" },
  { icon: Plane, label: "15 min from Airport", note: "Camiguin Airport" },
];

export function Intro() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <PaperGrain className="opacity-[0.06]" />
      <PalmCorner corner="tl" className="text-palm opacity-[0.12] lg:opacity-[0.18]" />
      <PalmCorner corner="br" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
      <CalachuchiCorner corner="tr" seed={20} className="text-brand opacity-[0.14] lg:opacity-[0.2]" />
      <CalachuchiCorner corner="bl" seed={33} className="text-brand opacity-[0.13] lg:opacity-[0.19]" />
      <DriftingPetals className="text-blush opacity-[0.18] lg:opacity-[0.25]" />
      <BotanicalAccent
        variant="sampaguita"
        className="bottom-16 left-6 hidden w-20 text-brand opacity-[0.22] lg:block"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Editorial header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <Kicker className="text-brand">Camiguin · The Island Born of Fire</Kicker>
          <h2 className="font-display mt-6 text-4xl font-light leading-[1.1] text-ink sm:text-5xl md:text-6xl">
            The Quiet the Other Islands Lost
          </h2>
          <p className="font-display mx-auto mt-8 max-w-2xl text-2xl font-light italic leading-snug text-ink/80 sm:text-[1.7rem]">
            While Siargao chases the next wave and Siquijor trades in folklore and
            moonlight, Camiguin did something quietly radical — it stayed itself.
          </p>
        </Reveal>

        {/* Body + image */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal delay={0.1}>
            <div className="group relative aspect-[4/5] w-full overflow-hidden">
              {/* Base image — infinity pool over the Bohol Sea, visible first */}
              <Image
                src="/images/resort/txaleta_pool_lounge.webp"
                alt="Infinity pool overlooking the Bohol Sea at Txaleta de Camiguin"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Terrace image — fades in on hover */}
              <Image
                src="/images/resort/terrace_view.webp"
                alt="Seaview terrace at Txaleta de Camiguin"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-xl text-[15px] leading-relaxed text-ink/70">
              One road loops the whole island. Mornings arrive with church bells from
              Mambajao and the smell of the sea; afternoons dissolve into spring-fed
              pools and the shade of century-old acacias. This is the Philippines
              measured in lanzones harvests and tides, not flight schedules — an island
              where tradition was never restored for the brochures, because it never left.
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70">
              Txaleta de Camiguin sits where all of it comes closest: the volcano at your
              back, the Bohol Sea at your feet, the white sandbar of White Island a short
              banca ride off the shore. Fourteen rooms, an infinity pool that meets the
              horizon, and the rare luxury of being somewhere the world hasn&apos;t
              crowded yet.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
              {features.map((f) => (
                <div key={f.label}>
                  <f.icon className="h-6 w-6 text-brand" strokeWidth={1.4} />
                  <p className="font-display mt-3 text-lg text-ink">{f.label}</p>
                  <p className="mt-0.5 text-xs text-ink/50">{f.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Pull quote */}
        <Reveal delay={0.1}>
          <blockquote className="mx-auto mt-20 max-w-3xl text-center">
            <span className="rule-line font-display text-2xl font-light italic text-brand sm:text-3xl">
              Some islands you visit. Camiguin, you remember.
            </span>
          </blockquote>
        </Reveal>

        {/* Video card — Mount Hibok-Hibok — with aerial gallery alongside */}
        <Reveal delay={0.1} className="mt-16">
          <div className="mx-auto grid max-w-6xl items-stretch gap-4 lg:grid-cols-[3.5fr_1fr]">
            {/* Video — left, large (fills the gallery height on desktop) */}
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto">
              <video
                src="https://pub-7bd148d1ea414fca914e9afdafcbe074.r2.dev/The%20Quite%20Other%20Island%20Lost.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Two images — right, shown in full at their natural proportions */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[5/4] w-full overflow-hidden">
                <Image
                  src="/images/resort/Aerialview_txaleta.webp"
                  alt="Aerial view of Txaleta de Camiguin and the coastline"
                  fill
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/resort/txaleta_picnic.webp"
                  alt="Seaside picnic at Txaleta de Camiguin"
                  fill
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
