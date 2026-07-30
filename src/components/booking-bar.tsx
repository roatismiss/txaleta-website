"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { DateRangePicker } from "./date-picker";
import { localePath, type Locale } from "@/lib/i18n";
import { ui } from "@/locales/ui";

export function BookingBar({ lang = "en" }: { lang?: Locale }) {
  const t = ui[lang].booking;
  const router = useRouter();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    setToday(new Date());
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    params.set("guests", String(guests));
    router.push(`${localePath(lang, "/book")}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-5xl bg-white text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="relative flex flex-col sm:flex-row">
        <DateRangePicker
          checkin={checkin}
          checkout={checkout}
          onChangeCheckin={setCheckin}
          onChangeCheckout={setCheckout}
          minDate={today}
          labels={{ arrival: t.arrival, departure: t.departure, selectDate: t.selectDate }}
        />

        {/* Guests */}
        <label className="relative flex-1 border-b border-black/10 px-6 py-4 sm:border-b-0 sm:border-r">
          <span className="label block text-[9px] tracking-widest text-ink/45">{t.guests}</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1.5 w-full appearance-none bg-transparent text-sm text-ink outline-none"
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? t.guestOne : t.guestMany}
              </option>
            ))}
          </select>
          <Users className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" strokeWidth={1.5} />
        </label>

        <button
          type="submit"
          className="label bg-brand px-8 py-5 text-[11px] text-white transition-colors hover:bg-brand-dark"
        >
          {t.checkAvailability}
        </button>
      </div>
    </form>
  );
}
