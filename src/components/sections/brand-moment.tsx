import { Reveal } from "@/components/reveal";
import { LogoVideoCard } from "@/components/logo-video-card";
import { GridBackdrop } from "@/components/grid-backdrop";

/** A quiet brand beat — the animated logo reveal as a dark card, drawing itself
 *  in as you scroll past, on the warm cream surface. A thin black grid builds
 *  itself behind it with the scroll. */
export function BrandMoment() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <GridBackdrop />
      <Reveal className="relative z-10 mx-auto w-full max-w-md px-6">
        <LogoVideoCard trigger="view" className="w-full" />
      </Reveal>
    </section>
  );
}
