import Image from "next/image";
import { Waves, BedDouble, Plane } from "lucide-react";
import { Reveal, Kicker } from "../reveal";

const features = [
  { icon: Waves, label: "Infinity Pool", note: "Overlooking the sea" },
  { icon: BedDouble, label: "Seaview Rooms", note: "Wake to the ocean" },
  { icon: Plane, label: "5 min from Airport", note: "Camiguin Airport" },
];

export function Intro() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <Kicker>Welcome to Txaleta</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            Where the Island
            <br /> Meets the Sea
          </h2>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/70">
            Tucked along the shoreline of Mambajao, Txaleta de Camiguin blends coastal
            comfort with quiet luxury. Seaview rooms, an infinity pool and sun-drenched
            decks open straight onto the water — a peaceful homestay escape only minutes
            from Camiguin Airport.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70">
            Slow mornings over breakfast by the sea, golden-hour swims and warm Filipino
            hospitality — this is the island, at its most restful.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
            {features.map((f) => (
              <div key={f.label}>
                <f.icon className="h-6 w-6 text-sand" strokeWidth={1.4} />
                <p className="font-display mt-3 text-lg text-ink">{f.label}</p>
                <p className="mt-0.5 text-xs text-ink/50">{f.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/resort/terrace_view.webp"
              alt="Seaview terrace at Txaleta de Camiguin"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
