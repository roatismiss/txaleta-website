import { Reveal } from "@/components/reveal";
import { LogoVideoCard } from "@/components/logo-video-card";

/** A quiet brand beat — the animated logo reveal as a dark card, drawing itself
 *  in as you scroll past, on the warm cream surface. */
export function BrandMoment() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Reveal className="mx-auto w-full max-w-md px-6">
        <LogoVideoCard trigger="view" className="w-full" />
      </Reveal>
    </section>
  );
}
