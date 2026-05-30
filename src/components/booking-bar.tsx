"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users } from "lucide-react";

export function BookingBar() {
  const router = useRouter();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    params.set("guests", String(guests));
    router.push(`/book?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-5xl bg-white text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="flex flex-col sm:flex-row">
        <label className="relative flex-1 border-b border-black/10 px-6 py-4 sm:border-b-0 sm:border-r">
          <span className="label block text-[9px] text-ink/45">Arrival</span>
          <input
            type="date"
            value={checkin}
            min={today}
            onChange={(e) => setCheckin(e.target.value)}
            className="mt-1.5 w-full bg-transparent text-sm text-ink outline-none [color-scheme:light]"
          />
          {!checkin && (
            <CalendarDays className="pointer-events-none absolute right-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-sand sm:block" strokeWidth={1.5} />
          )}
        </label>

        <label className="relative flex-1 border-b border-black/10 px-6 py-4 sm:border-b-0 sm:border-r">
          <span className="label block text-[9px] text-ink/45">Departure</span>
          <input
            type="date"
            value={checkout}
            min={checkin || today}
            onChange={(e) => setCheckout(e.target.value)}
            className="mt-1.5 w-full bg-transparent text-sm text-ink outline-none [color-scheme:light]"
          />
          {!checkout && (
            <CalendarDays className="pointer-events-none absolute right-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-sand sm:block" strokeWidth={1.5} />
          )}
        </label>

        <label className="relative flex-1 border-b border-black/10 px-6 py-4 sm:border-b-0 sm:border-r">
          <span className="label block text-[9px] text-ink/45">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1.5 w-full appearance-none bg-transparent text-sm text-ink outline-none"
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          <Users className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand" strokeWidth={1.5} />
        </label>

        <button
          type="submit"
          className="label bg-sand px-8 py-5 text-[11px] text-white transition-colors hover:bg-sand-dark"
        >
          Check Availability
        </button>
      </div>
    </form>
  );
}
