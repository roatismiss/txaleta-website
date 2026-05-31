"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { site, rooms } from "@/lib/site";
import { DatePicker } from "@/components/date-picker";
import { addDays } from "date-fns";

type Props = {
  initialCheckin?: string;
  initialCheckout?: string;
  initialGuests?: string;
  initialRoom?: string;
};

export function BookingForm({ initialCheckin, initialCheckout, initialGuests, initialRoom }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: initialCheckin ?? "",
    checkout: initialCheckout ?? "",
    guests: initialGuests ?? "2",
    room: initialRoom ?? "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const roomName = rooms.find((r) => r.slug === form.room)?.name;
    const message = [roomName ? `Preferred room: ${roomName}` : null, form.message]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(`${site.cloudreef.baseUrl}/api/widget/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          widgetKey: site.cloudreef.widgetKey,
          name: form.name,
          email: form.email,
          phone: form.phone,
          checkin: form.checkin,
          checkout: form.checkout,
          guests: form.guests,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setBookingRef(data?.bookingRef ?? null);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-sm border border-sand/40 bg-cream px-8 py-16 text-center">
        <CheckCircle2 className="h-14 w-14 text-sand" strokeWidth={1.2} />
        <h2 className="font-display mt-6 text-3xl font-light text-ink">Request Received</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/70">
          Thank you, {form.name.split(" ")[0]}. We&apos;ve received your booking request
          {bookingRef ? (
            <>
              {" "}— your reference is <span className="font-medium text-ink">{bookingRef}</span>.
            </>
          ) : (
            "."
          )}{" "}
          Our team will confirm availability and reach out by email shortly.
        </p>
        <a
          href={`https://wa.me/${site.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-8 inline-block border-b border-sand pb-1 text-[11px] text-ink transition-colors hover:text-sand"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  const field =
    "mt-2 w-full border-b border-ink/15 bg-transparent pb-2 text-sm text-ink outline-none transition-colors focus:border-sand [color-scheme:light]";
  const lbl = "label block text-[9px] text-ink/45";

  return (
    <form onSubmit={submit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label>
          <span className={lbl}>Full Name *</span>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={field} placeholder="Jane Dela Cruz" />
        </label>
        <label>
          <span className={lbl}>Email *</span>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={field} placeholder="jane@email.com" />
        </label>
        <label>
          <span className={lbl}>Phone / WhatsApp</span>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={field} placeholder="+63 9XX XXX XXXX" />
        </label>
        <label>
          <span className={lbl}>Guests</span>
          <select value={form.guests} onChange={(e) => update("guests", e.target.value)} className={field}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
            ))}
          </select>
        </label>
        <DatePicker
          label="Arrival"
          value={form.checkin}
          onChange={(date) => update("checkin", date)}
          minDate={new Date()}
          placeholder="Check-in date"
        />
        <DatePicker
          label="Departure"
          value={form.checkout}
          onChange={(date) => update("checkout", date)}
          minDate={form.checkin ? addDays(new Date(form.checkin), 1) : addDays(new Date(), 1)}
          placeholder="Check-out date"
        />
      </div>

      <label className="block">
        <span className={lbl}>Preferred Room</span>
        <select value={form.room} onChange={(e) => update("room", e.target.value)} className={field}>
          <option value="">No preference</option>
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>{r.name}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={lbl}>Message</span>
        <textarea rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} className={field} placeholder="Anything we should know — transfers, dietary needs, special occasion…" />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">
          {errorMsg}. Please try again or message us on{" "}
          <a href={`https://wa.me/${site.contact.whatsapp}`} className="underline">WhatsApp</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="label inline-flex items-center gap-3 bg-ink px-10 py-4 text-[11px] text-white transition-colors hover:bg-sand disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? "Sending…" : "Request to Book"}
      </button>
    </form>
  );
}
