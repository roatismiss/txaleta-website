"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Menu, X, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";

const leftNav = nav.slice(0, 3);
const rightNav = nav.slice(3);

function Social({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-sand">
        <FacebookIcon className="h-4 w-4" />
      </a>
      <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-sand">
        <InstagramIcon className="h-4 w-4" />
      </a>
      <a href={site.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-sand">
        <TikTokIcon className="h-4 w-4" />
      </a>
    </div>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="label text-[11px] transition-colors hover:text-sand">
      {children}
    </Link>
  );
}

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ink transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(12,28,34,0.10)]"
            : "bg-white/75 backdrop-blur-md shadow-[0_2px_20px_rgba(12,28,34,0.05)]"
        }`}
      >
        {/* ── Utility row (top state only) ───────────────────────────────── */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 44, opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden border-b border-ink/10"
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
              <a href="#contact" className="hidden label text-[10px] text-ink/60 transition-colors hover:text-sand sm:inline">Contact</a>
              <Link href="/book" className="hidden bg-ink px-5 py-2 label text-[10px] text-white transition-colors hover:bg-sand sm:inline-block">
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Main row ───────────────────────────────────────────────────── */}
        <div
          className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 transition-[padding] duration-500"
          style={{ paddingTop: scrolled ? 8 : 14, paddingBottom: scrolled ? 8 : 14 }}
        >
          {/* Left nav (desktop) */}
          <nav className="hidden items-center justify-end gap-7 lg:flex">
            {leftNav.map((n) => (
              <NavLink key={n.href} href={n.href}>{n.label}</NavLink>
            ))}
          </nav>

          {/* Mobile: hamburger left */}
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="flex items-center gap-2 justify-self-start lg:hidden">
            <Menu className="h-6 w-6" strokeWidth={1.5} />
            <span className="label text-[10px]">Menu</span>
          </button>

          {/* Center logo */}
          <div className="justify-self-center px-6">
            <Logo height={scrolled ? 44 : 62} />
          </div>

          {/* Right nav (desktop) */}
          <nav className="hidden items-center justify-start gap-7 lg:flex">
            {rightNav.map((n) => (
              <NavLink key={n.href} href={n.href}>{n.label}</NavLink>
            ))}
            <button aria-label="Search" className="opacity-70 transition-opacity hover:opacity-100">
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </nav>

          {/* Mobile: search right */}
          <button aria-label="Search" className="justify-self-end lg:hidden">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Vertical BOOK NOW tab (desktop) */}
      <Link
        href="/book"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 bg-sand px-2.5 py-5 text-white shadow-lg transition-colors hover:bg-sand-dark lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="label text-[11px] rotate-180">Book Now</span>
      </Link>

      {/* ── Mobile fullscreen menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream text-ink lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
              <Logo height={40} />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-7 w-7" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-7">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link href={n.href} onClick={() => setOpen(false)} className="font-display text-3xl tracking-wide">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/book" onClick={() => setOpen(false)} className="mt-4 bg-sand px-10 py-3.5 label text-xs text-white">
                Book Now
              </Link>
            </nav>
            <div className="flex flex-col items-center gap-4 border-t border-ink/10 px-6 py-6">
              <Social />
              <a href={`mailto:${site.contact.email}`} className="text-sm text-ink/70">{site.contact.email}</a>
              <a href={`tel:${site.contact.phoneRaw}`} className="text-sm text-ink/70">{site.contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
