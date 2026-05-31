import Link from "next/link";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { LogoWordmark } from "./logo";

const explore = [
  { label: "Accommodation", href: "/#accommodation" },
  { label: "Dining", href: "/#dining" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Book Now", href: "/book" },
];

export function Footer() {
  return (
    <footer className="bg-ink-soft text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <LogoWordmark size="md" className="text-white" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              A boutique coastal resort on Camiguin Island. Seaview suites, ocean-view
              glamping and an infinity pool — your peaceful island escape.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 transition-colors hover:text-sand">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/70 transition-colors hover:text-sand">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/70 transition-colors hover:text-sand">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="label text-[10px] text-brand">Explore</h3>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="label text-[10px] text-brand">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>{site.location.address}</li>
              <li><a href={`tel:${site.contact.phoneRaw}`} className="transition-colors hover:text-white">{site.contact.phone}</a></li>
              <li><a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">{site.contact.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Crafted on Camiguin · Powered by{" "}
            <span className="text-white/60">CloudReef</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
