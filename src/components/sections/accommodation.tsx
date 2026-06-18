import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchDisplayRooms } from "@/lib/booking-api";
import { Reveal, Kicker } from "../reveal";
import { RattanWeave, PalmCorner } from "../brand-texture";

export async function Accommodation() {
  // Live Cloudbeds rooms (photos + rates), falling back to curated site.ts rooms.
  const rooms = await fetchDisplayRooms();
  return (
    <section id="accommodation" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <RattanWeave className="opacity-[0.10]" />
      <PalmCorner corner="tr" className="text-palm opacity-[0.12] lg:opacity-[0.18]" />
      <PalmCorner corner="bl" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="text-brand">The Fourteen Rooms</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            Where You Wake on Camiguin
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
            Fourteen rooms sit between the volcano and the sea, close enough to hear both, and
            no two open onto the same view. Some face the Bohol Sea, others the garden or
            the cliff&apos;s edge. Choose the one that matches how you want to meet the morning.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-20 sm:gap-28">
          {rooms.map((room, i) => (
            <Reveal key={room.slug}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden [direction:ltr]">
                  <Image
                    src={room.cover}
                    alt={room.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="[direction:ltr]">
                  <Kicker className="text-brand">{room.kicker}</Kicker>
                  <h3 className="font-display mt-4 text-3xl font-light text-ink sm:text-4xl">
                    {room.name}
                  </h3>
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

                  <Link
                    href={`/book?room=${room.slug}`}
                    className="group/btn mt-9 inline-flex items-center gap-3 text-ink transition-colors hover:text-brand"
                  >
                    <span className="label relative pb-1 text-[11px]">
                      Check Availability
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-brand transition-colors group-hover/btn:bg-brand-dark"></span>
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
