import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dining } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";

export function Dining() {
  return (
    <section id="dining" className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Kicker className="text-brand">{dining.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight sm:text-5xl">
            {dining.heading}
          </h2>
          <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-white/70">
            {dining.body}
          </p>
          <Link
            href="/book"
            className="group mt-9 inline-flex items-center gap-3 border-b border-sand pb-1 transition-colors hover:text-sand"
          >
            <span className="label text-[11px]">Reserve a Table</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            <div className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden">
              <Image src={dining.images[0]} alt="Dining at Txaleta" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image src={dining.images[1]} alt="Breakfast by the sea" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image src={dining.images[2]} alt="Island plates" fill sizes="25vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
