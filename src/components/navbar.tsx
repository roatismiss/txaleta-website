"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Search, Menu, X, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";

const leftNav = nav.slice(0, 3);
const rightNav = nav.slice(3);

function Social({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-brand">
        <FacebookIcon className="h-4 w-4" />
      </a>
      <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-brand">
        <InstagramIcon className="h-4 w-4" />
      </a>
      <a href={site.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-brand">
        <TikTokIcon className="h-4 w-4" />
      </a>
    </div>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="label text-[11px] transition-colors hover:text-brand">
      {children}
    </Link>
  );
}

// Mobile drawer animation — panel slides in from the right, items stagger.
const panelVariants: Variants = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.55, when: "beforeChildren", staggerChildren: 0.07, delayChildren: 0.15 },
  },
  exit: { x: "100%", transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const logoH = scrolled ? 60 : 104;
  const mobileLogoH = scrolled ? 52 : 84;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
          scrolled
            ? "bg-white/95 text-ink backdrop-blur-md shadow-[0_8px_30px_rgba(12,28,34,0.10)]"
            : "bg-transparent text-white lg:bg-white/75 lg:text-ink lg:backdrop-blur-md lg:shadow-[0_2px_20px_rgba(12,28,34,0.05)]"
        }`}
      >
        {/* Mobile: faint top scrim so the white logo + menu stay legible over the video (before scroll only) */}
        {!scrolled && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-black/35 to-transparent lg:hidden" />
        )}
        {/* ── Utility row (top state only) ───────────────────────────────── */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 44, opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="hidden overflow-hidden border-b border-ink/10 lg:block"
        >
          <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-6">
            <div className="hidden items-center gap-5 md:flex">
              <Social />
              <span className="label text-[10px] text-ink/60">Stay Connected</span>
            </div>
            <a href={`tel:${site.contact.phoneRaw}`} className="label flex items-center gap-2 text-[10px] md:hidden">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> {site.contact.phone}
            </a>
            <div className="flex items-center gap-5">
              <a href="#contact" className="hidden label text-[10px] text-ink/60 transition-colors hover:text-brand sm:inline">Contact</a>
              <Link href="/book" className="hidden bg-brand px-5 py-2 label text-[10px] text-white transition-colors hover:bg-brand-dark sm:inline-block">
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Main row ───────────────────────────────────────────────────── */}
        <div
          className="relative z-10 mx-auto grid min-h-[68px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 transition-[padding] duration-500 sm:px-6 lg:min-h-0"
          style={{ paddingTop: scrolled ? 8 : 12, paddingBottom: scrolled ? 8 : 12 }}
        >
          {/* Left nav (desktop) */}
          <nav className="col-start-1 hidden items-center justify-end gap-7 lg:flex">
            {leftNav.map((n) => (
              <NavLink key={n.href} href={n.href}>{n.label}</NavLink>
            ))}
          </nav>

          {/* Mobile: search + hamburger menu on the RIGHT */}
          <div className="col-start-3 flex items-center gap-4 justify-self-end lg:hidden">
            <button aria-label="Search" className="transition-colors hover:text-brand">
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="flex items-center gap-2 transition-colors hover:text-brand">
              <span className="label text-[11px]">Menu</span>
              <Menu className="h-7 w-7" strokeWidth={1.5} />
            </button>
          </div>

          {/* Center: width spacer reserves room for the absolute desktop logo (desktop only) */}
          <div className="col-start-2 hidden justify-self-center lg:block" style={{ width: logoH, height: 1 }} aria-hidden />

          {/* Right nav (desktop) */}
          <nav className="col-start-3 hidden items-center justify-start gap-7 lg:flex">
            {rightNav.map((n) => (
              <NavLink key={n.href} href={n.href}>{n.label}</NavLink>
            ))}
            <button aria-label="Search" className="opacity-70 transition-opacity hover:opacity-100">
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </nav>

          {/* Mobile: BIG logo on the LEFT — white over the hero video, full-colour once the bar appears on scroll */}
          <div className="col-start-1 justify-self-start lg:hidden">
            <Logo
              height={mobileLogoH}
              className={`transition-[height] duration-500 ${
                scrolled
                  ? "[filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.12))]"
                  : "[filter:brightness(0)_invert(1)_drop-shadow(0_2px_8px_rgba(0,0,0,0.45))]"
              }`}
            />
          </div>
        </div>

        {/* Oversized centered logo (desktop) — overlaps from the navbar down into the hero */}
        <div
          className="pointer-events-none absolute left-1/2 z-20 hidden -translate-x-1/2 transition-[top] duration-500 lg:block"
          style={{ top: scrolled ? 6 : 34 }}
        >
          <Logo height={logoH} className="pointer-events-auto [filter:drop-shadow(0_3px_8px_rgba(0,0,0,0.18))]" />
        </div>
      </header>

      {/* Vertical BOOK NOW tab (desktop) — red */}
      <Link
        href="/book"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 bg-brand px-2.5 py-5 text-white shadow-lg transition-colors hover:bg-brand-dark lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="label text-[11px] rotate-180">Book Now</span>
      </Link>

      {/* ── Mobile drawer — slides in from the right, glassmorphism, staggered ── */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial="hidden" animate="show" exit="exit">
            {/* Scrim */}
            <motion.button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 h-full w-full bg-ink/30 backdrop-blur-[2px]"
            />

            {/* Glass panel (50% width) */}
            <motion.aside
              variants={panelVariants}
              className="absolute right-0 top-0 flex h-full w-1/2 min-w-[16rem] flex-col border-l border-white/40 bg-white/65 shadow-[-20px_0_60px_rgba(12,28,34,0.18)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <Logo height={34} />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-ink/70 transition-colors hover:text-brand">
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
                {nav.map((n) => (
                  <motion.div key={n.href} variants={itemVariants} className="border-b border-ink/10">
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="label block py-4 text-right text-[12px] text-ink transition-colors hover:text-brand"
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="pt-6">
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="label block bg-brand py-3.5 text-center text-[11px] text-white transition-colors hover:bg-brand-dark"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </nav>

              <motion.div variants={itemVariants} className="flex flex-col items-end gap-3 px-6 py-6">
                <Social />
                <a href={`tel:${site.contact.phoneRaw}`} className="text-[13px] text-ink/70">{site.contact.phone}</a>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
