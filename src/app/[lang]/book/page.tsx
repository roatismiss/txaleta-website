import type { Metadata } from "next";
import { pageAlternates, type Locale } from "@/lib/i18n";
import { getPageSeo } from "@/locales/seo";
import Image from "next/image";
import { CalendarCheck, Zap, ShieldCheck, Mail, type LucideIcon } from "lucide-react";
import { BookingFlow } from "@/components/booking-flow";
import { CloudbedsBooking } from "@/components/cloudbeds-booking";
import { Kicker } from "@/components/reveal";
import { PoweredByCloudReef } from "@/components/powered-by";
import { site, bookingProvider } from "@/lib/site";
const P: Record<Locale, { kicker: string; title: string; intro1: string; call: string; orMessage: string; trust: [string, string, string, string] }> = {
  en: { kicker: "Reservations", title: "Book Your Stay", intro1: "Check live availability, choose your room and confirm instantly. Your booking and payment are handled securely — you'll get an email confirmation right away. Prefer to talk it through? Call", call: "Call", orMessage: "or message us on", trust: ["Live availability", "Instant confirmation", "Secure payment", "Email in seconds"] },
  fr: { kicker: "Réservations", title: "Réserver votre séjour", intro1: "Consultez les disponibilités en direct, choisissez votre chambre et confirmez instantanément. Réservation et paiement sécurisés — la confirmation arrive par e-mail immédiatement. Vous préférez en parler ? Appelez le", call: "Appelez", orMessage: "ou écrivez-nous sur", trust: ["Disponibilités en direct", "Confirmation instantanée", "Paiement sécurisé", "E-mail en quelques secondes"] },
  de: { kicker: "Reservierungen", title: "Aufenthalt buchen", intro1: "Prüfen Sie die Live-Verfügbarkeit, wählen Sie Ihr Zimmer und bestätigen Sie sofort. Buchung und Zahlung laufen sicher — die Bestätigung kommt umgehend per E-Mail. Lieber persönlich? Rufen Sie an:", call: "Anrufen", orMessage: "oder schreiben Sie uns auf", trust: ["Live-Verfügbarkeit", "Sofortige Bestätigung", "Sichere Zahlung", "E-Mail in Sekunden"] },
  ja: { kicker: "ご予約", title: "宿泊を予約する", intro1: "空室状況をリアルタイムで確認し、お部屋を選んで、その場で確定。予約とお支払いは安全に処理され、確認メールがすぐに届きます。相談しながら決めたい方はお電話ください：", call: "電話する", orMessage: "またはこちらへメッセージを：", trust: ["リアルタイム空室状況", "即時確定", "安全なお支払い", "確認メールは数秒で"] },
  ko: { kicker: "예약", title: "숙박 예약하기", intro1: "실시간 객실 현황을 확인하고, 방을 고르고, 즉시 확정하세요. 예약과 결제는 안전하게 처리되며 확인 메일이 바로 도착합니다. 통화로 상담을 원하시면 전화 주세요:", call: "전화하기", orMessage: "또는 메시지 보내기:", trust: ["실시간 객실 현황", "즉시 확정", "안전한 결제", "몇 초 만에 확인 메일"] },
  zh: { kicker: "预订", title: "预订您的假期", intro1: "查看实时房态，选择房型，即刻确认。预订与支付均安全处理——确认邮件立即送达。想先聊聊？欢迎致电", call: "致电", orMessage: "或通过以下方式联系我们：", trust: ["实时房态", "即时确认", "安全支付", "确认邮件秒达"] },
};

const meta: Metadata = {
  title: "Book Your Stay",
  description: `Request a booking at ${site.name} — seaview suites, ocean-view glamping and garden rooms on Camiguin Island.`,
};

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function BookPage({ params, searchParams }: PageProps<"/[lang]/book">) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const p = P[lang];
  const sp = await searchParams;

  return (
    <>
      {/* Banner */}
      <section className="relative flex h-[44vh] min-h-[320px] items-end overflow-hidden">
        <Image
          src="/images/resort/txaleta_beach.webp"
          alt="Txaleta de Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-12 text-white">
          <Kicker>{p.kicker}</Kicker>
          <h1 className="font-display mt-4 text-4xl font-light sm:text-6xl">{p.title}</h1>
        </div>
      </section>

      {/* Booking flow */}
      <section className="bg-brand py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="max-w-xl text-[15px] leading-relaxed text-white/80">
            {p.intro1}{" "}
            <a href={`tel:${site.contact.phoneRaw}`} className="text-white underline hover:text-white/70">
              {site.contact.phone}
            </a>{" "}
            {p.orMessage}{" "}
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="text-white underline hover:text-white/70">
              WhatsApp
            </a>
            .
          </p>

          {/* Trust strip */}
          <div className="mt-8 flex flex-col gap-3 border-y border-white/20 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            {([
              { icon: CalendarCheck, label: p.trust[0] },
              { icon: Zap, label: p.trust[1] },
              { icon: ShieldCheck, label: p.trust[2], note: "GCash · Maya · Apple Pay" },
              { icon: Mail, label: p.trust[3] },
            ] as { icon: LucideIcon; label: string; note?: string }[]).map(({ icon: Icon, label, note }) => (
              <span key={label} className="flex items-start gap-2.5 text-[13px] text-white/80">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
                <span className="flex flex-col leading-tight">
                  <span>{label}</span>
                  {note && <span className="mt-0.5 text-[11px] text-white/50">{note}</span>}
                </span>
              </span>
            ))}
            {bookingProvider === "cloudreef" && (
              <PoweredByCloudReef tone="dark" className="sm:ml-auto" />
            )}
          </div>

          {/* Booking engine — white card, black squared border */}
          <div className="mt-12 border-2 border-ink bg-white">
            {bookingProvider === "cloudbeds" ? (
              <CloudbedsBooking
                checkin={first(sp.checkin)}
                checkout={first(sp.checkout)}
                guests={first(sp.guests)}
              />
            ) : (
              <BookingFlow
                initialCheckin={first(sp.checkin)}
                initialCheckout={first(sp.checkout)}
                initialGuests={first(sp.guests)}
                initialRoom={first(sp.room)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const seo = getPageSeo(lang as Locale, "/book");
  return {
    ...meta,
    ...(seo ? { title: seo.title, description: seo.description } : {}),
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    alternates: pageAlternates(lang as Locale, "/book"),
  };
}
