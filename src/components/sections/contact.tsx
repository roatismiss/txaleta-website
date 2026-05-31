import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function ViberIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.985 0h.03C18.07 0 24 5.93 24 11.985v.03C24 18.07 18.07 24 12.015 24H.75A.75.75 0 010 23.25V12.015C0 5.93 5.93 0 11.985 0zM8.89 5.265c-.414-.03-.924.06-1.35.285-.9.479-1.62 1.56-1.77 2.58-.21 1.38.12 2.97.99 4.29.63.96 1.44 1.86 2.34 2.64.93.81 2.01 1.56 3.21 2.01 1.02.39 2.16.57 3.18.21.66-.24 1.29-.72 1.56-1.38.15-.39.18-.84.03-1.23-.33-.87-1.23-1.44-1.98-1.89-.45-.27-.99-.21-1.35.15l-.51.54c-.21.21-.54.24-.78.09-.87-.54-1.68-1.2-2.28-2.01-.33-.45-.6-.93-.78-1.44-.09-.3 0-.63.21-.84l.54-.54c.39-.39.42-.99.12-1.44-.42-.63-.9-1.29-1.44-1.74-.27-.24-.6-.39-.93-.42z"/>
    </svg>
  );
}

const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  "Txaleta de Camiguin, Mambajao, Camiguin",
)}&z=13&output=embed`;

export function Contact() {
  return (
    <section id="contact" className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <Reveal className="px-6 py-24 sm:px-12 sm:py-32">
          <Kicker className="text-brand">On the Mambajao Shore</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight sm:text-5xl">
            Come the Long Way
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
            Five minutes from Camiguin Airport, the road gives way to the sound of the
            Bohol Sea and the volcano standing watch behind you. Tell us when you arrive
            and we&apos;ll have the transfer waiting, the island boat ready, and the right
            room held against the tide.
          </p>

          <div className="mt-10 space-y-5">
            <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-white/80 transition-colors hover:text-white">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} />
              <span className="text-sm">{site.location.address}</span>
            </a>
            <a href={`tel:${site.contact.phoneRaw}`} className="flex items-center gap-4 text-white/80 transition-colors hover:text-white">
              <Phone className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} />
              <span className="text-sm">{site.contact.phone}</span>
            </a>
            <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 transition-colors hover:text-white">
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-brand" />
              <span className="text-sm">WhatsApp · +63 917 818 2277</span>
            </a>
            <a href={`viber://chat?number=%2B${site.contact.viber}`} className="flex items-center gap-4 text-white/80 transition-colors hover:text-white">
              <ViberIcon className="h-5 w-5 shrink-0 text-brand" />
              <span className="text-sm">Viber · +63 917 818 2277</span>
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-4 text-white/80 transition-colors hover:text-white">
              <Mail className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} />
              <span className="text-sm">{site.contact.email}</span>
            </a>
          </div>

          <Link
            href="/book"
            className="label mt-10 inline-block bg-sand px-9 py-4 text-[11px] text-white transition-colors hover:bg-sand-dark"
          >
            Book Your Stay
          </Link>
        </Reveal>

        <div className="relative min-h-[360px] w-full lg:min-h-full">
          <iframe
            title="Map — Txaleta de Camiguin"
            src={mapsEmbed}
            className="absolute inset-0 h-full w-full grayscale-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
