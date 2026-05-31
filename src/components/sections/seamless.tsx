import Link from "next/link";
import { CalendarCheck, Languages, UtensilsCrossed, ArrowRight } from "lucide-react";
import { seamless } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";
import { PoweredByCloudReef } from "../powered-by";

// One icon per pillar, mapped by index to the copy in site.ts.
const icons = [CalendarCheck, Languages, UtensilsCrossed] as const;

export function Seamless() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="text-brand">{seamless.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            {seamless.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink/65">
            {seamless.body}
          </p>
        </Reveal>

        {/* Three pillars — the CloudReef-powered guest experience */}
        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {seamless.pillars.map((pillar, i) => {
            const Icon = icons[i] ?? CalendarCheck;
            return (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="border-t border-ink/15 pt-7">
                  <Icon className="h-7 w-7 text-brand" strokeWidth={1.25} aria-hidden />
                  <h3 className="font-display mt-5 text-2xl font-light text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/65">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
          <Link
            href="/dining#room-service"
            className="group inline-flex items-center gap-3 border-b border-sand pb-1 text-ink transition-colors hover:text-sand"
          >
            <span className="label text-[11px]">See It in Action</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden
            />
          </Link>
          <PoweredByCloudReef tone="light" />
        </Reveal>
      </div>
    </section>
  );
}
