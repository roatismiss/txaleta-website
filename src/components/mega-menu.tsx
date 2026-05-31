"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MegaMenu } from "@/lib/site";

// Full motion: panel drops down + fades, children stagger in beneath.
const panelMotion: Variants = {
  hidden: { opacity: 0, y: -14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: { opacity: 0, y: -14, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};
const itemMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Reduced motion: opacity-only, no travel, no stagger.
const panelReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren" } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
const itemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export function MegaPanel({
  menu,
  onNavigate,
  onMouseEnter,
}: {
  menu: MegaMenu;
  onNavigate: () => void;
  onMouseEnter: () => void;
}) {
  const reduce = useReducedMotion();
  const panel = reduce ? panelReduced : panelMotion;
  const item = reduce ? itemReduced : itemMotion;

  return (
    <motion.div
      variants={panel}
      initial="hidden"
      animate="show"
      exit="exit"
      onMouseEnter={onMouseEnter}
      className="absolute left-0 top-full z-30 hidden w-full lg:block"
    >
      <div className="border-t border-ink/10 bg-white/95 shadow-[0_34px_60px_-22px_rgba(12,28,34,0.28)] backdrop-blur-xl">
        <div className="mx-auto grid max-h-[calc(100dvh-8.5rem)] max-w-7xl grid-cols-[0.85fr_2.15fr] gap-12 overflow-y-auto px-6 py-10">
          {/* ── Left rail: heading, view-all, quick links ── */}
          <motion.div variants={item} className="flex flex-col">
            <p className="label text-[11px] text-sand">{menu.kicker}</p>
            <h3 className="font-display mt-3 text-3xl font-light leading-tight text-ink">
              {menu.heading}
            </h3>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink/60">
              {menu.blurb}
            </p>

            <Link
              href={menu.viewAll.href}
              onClick={onNavigate}
              className="group mt-7 inline-flex items-center gap-2 self-start rounded-sm border-b border-sand pb-1 text-ink transition-colors hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              <span className="label text-[11px]">{menu.viewAll.label}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>

            <ul className="mt-8 space-y-0.5 border-t border-ink/10 pt-5">
              {menu.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={onNavigate}
                    className="group flex items-center justify-between rounded-sm px-1 py-2 text-ink/75 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                  >
                    <span className="text-[14px]">{l.label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 -translate-x-1 text-sand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right: image cards ── */}
          <div className="grid grid-cols-3 gap-5">
            {menu.cards.map((c) => (
              <motion.div key={c.name} variants={item}>
                <Link
                  href={c.href}
                  onClick={onNavigate}
                  className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 1280px) 24vw, 300px"
                      className="object-cover transition-transform duration-[1.4s] ease-out motion-safe:group-hover:scale-110"
                    />
                    {/* Readability scrim — strong enough to hold text over bright covers */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent transition-opacity duration-500 group-hover:from-ink/90" />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/30" />

                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="label text-[9px] text-sand [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
                        {c.kicker}
                      </p>
                      <h4 className="font-display mt-1 text-xl font-light leading-snug [text-shadow:0_1px_5px_rgba(0,0,0,0.5)]">
                        {c.name}
                      </h4>
                      <span className="mt-2 flex h-4 items-center gap-1.5 overflow-hidden">
                        <span className="label translate-y-4 text-[10px] text-white/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          Explore
                        </span>
                        <ArrowRight
                          className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all delay-75 duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
