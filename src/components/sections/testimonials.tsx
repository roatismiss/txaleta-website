import { Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";

export function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>Guest Stories</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            Loved by Our Guests
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col items-center text-center">
                <Quote className="h-7 w-7 text-sand" strokeWidth={1.2} />
                <blockquote className="font-display mt-6 text-xl font-light leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <span className="label text-[11px] text-ink">{t.name}</span>
                  <span className="mt-1 block text-xs text-ink/45">{t.date}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
