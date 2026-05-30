import Image from "next/image";
import { experiences } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";

export function Experiences() {
  return (
    <section id="experiences" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>Experiences</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            The Island, Beyond the Resort
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
            Camiguin is small enough to explore in a day and rich enough to keep you for a week —
            here&apos;s where to start.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 0.08}>
              <div className="group relative h-[26rem] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-light">{exp.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">
                    {exp.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
