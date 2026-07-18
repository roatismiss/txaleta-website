
import Link from "next/link";
import { site } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { ui } from "@/locales/ui";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { LogoWordmark } from "./logo";
import { PoweredByCloudReef } from "./powered-by";
import { AzulejoBand, AzulejoBackdrop } from "./brand-texture";

// Unprefixed link model; label keys resolve through the UI dictionary so the
// footer stays in sync with the navbar translations.
const explore: { navKey: string; href: string }[] = [
  { navKey: "/accommodation", href: "/#accommodation" },
  { navKey: "/dining", href: "/#dining" },
  { navKey: "/experiences", href: "/experiences" },
  { navKey: "/guides", href: "/guides" },
  { navKey: "/community", href: "/community" },
  { navKey: "/gallery", href: "/gallery" },
];

/** localePath that keeps in-page anchors ("/#dining") working per locale. */
function localeHref(lang: Locale, href: string): string {
  const [path, hash] = href.split("#");
  const localized = localePath(lang, path || "/");
  return hash ? `${localized}#${hash}` : localized;
}

export function Footer({ lang = "en" }: { lang?: Locale }) {
  const t = ui[lang];

  return (
    <footer className="relative overflow-hidden bg-[#0f1b30] text-white">
      <AzulejoBand className="relative z-10 shadow-[0_12px_30px_rgba(0,0,0,0.3)]" />
      <AzulejoBackdrop className="opacity-[0.07]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <LogoWordmark size="md" className="text-white" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {t.footer.blurb}
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
            <h3 className="label text-[10px] text-[#9db8ef]">{t.footer.explore}</h3>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={localeHref(lang, l.href)} className="text-sm text-white/65 transition-colors hover:text-white">
                    {t.nav[l.navKey]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localePath(lang, "/book")} className="text-sm text-white/65 transition-colors hover:text-white">
                  {t.bookNow}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="label text-[10px] text-[#9db8ef]">{t.footer.contact}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>{site.location.address}</li>
              <li><a href={`tel:+${site.contact.whatsapp}`} className="transition-colors hover:text-white">+63 917 582 2277</a></li>
              <li><a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">{site.contact.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40">
            <span>{t.footer.crafted} ·</span>
            <PoweredByCloudReef tone="dark" />
          </p>
        </div>
      </div>
    </footer>
  );
}
