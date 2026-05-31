"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Crossfading image for the experience cards. Desktop (hover-capable) pointers
// drive the swap on hover; touch / no-hover devices crossfade to the alternate
// image while the card sits in the vertical center band of the viewport — the
// mobile stand-in for hover. Renders nothing extra when there is no hoverImage,
// just the base image with the usual slow zoom on activate.
export function ExperienceCardImage({
  image,
  hoverImage,
  alt,
  sizes,
}: {
  image: string;
  hoverImage?: string;
  alt: string;
  sizes: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!hoverImage) return;
    // Hover devices use the pointer handlers below — nothing to observe.
    if (window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    // -35% top/bottom leaves a 30% center band: the card reveals its alternate
    // view as it scrolls through the middle of the screen, then settles back.
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hoverImage]);

  // Guard pointer handlers behind a hover check so an emulated mouseenter from a
  // tap on touch devices doesn't fight the scroll-driven swap above.
  const onEnter = () => {
    if (window.matchMedia("(hover: hover)").matches) setActive(true);
  };
  const onLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) setActive(false);
  };

  return (
    <div ref={ref} className="absolute inset-0" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover transition-transform duration-[1.2s] ease-out ${active ? "scale-105" : ""}`}
      />
      {hoverImage && (
        <Image
          src={hoverImage}
          alt={`${alt} — alternate view`}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-700 ease-in-out ${active ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
