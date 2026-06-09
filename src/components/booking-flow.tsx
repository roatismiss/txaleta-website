"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { addDays, format } from "date-fns";
import {
  CheckCircle2,
  Check,
  Loader2,
  ChevronLeft,
  ShieldCheck,
  Users,
  Lock,
  BedDouble,
  AlertCircle,
} from "lucide-react";
import { site, rooms as siteRooms } from "@/lib/site";
import { DatePicker } from "@/components/date-picker";
import {
  fetchRooms,
  fetchAvailability,
  confirmBooking,
  validatePromo,
  formatMoney,
  nightsBetween,
  nightKeysInRange,
  ymdToDate,
  type ApiRoomType,
  type ConfirmResponse,
} from "@/lib/booking-api";

// Real resort photography per CloudReef room-type name (falls back gracefully).
// Keys must match the room names seeded in CloudReef (033_txaleta_seed.sql).
const ROOM_IMAGES: Record<string, string> = {
  "Premier Seaview Suite": "/images/rooms/ocean-view-suite/Ocean_view.webp",
  "Premier Seaview Room w/ Balcony": "/images/rooms/ocean-view-suite/Ocean_view_private_terrace.webp",
  "Ocean View Glamping": "/images/rooms/glamping/glamping_sunset_view.webp",
  "Deluxe Garden Room": "/images/rooms/double-bedroom/double_bedroom.webp",
  "Oceanview Family Room": "/images/rooms/ocean-view-suite/Ocean_view_room.webp",
  "Lanai Villa — Upper Deck": "/images/resort/terrace_view.webp",
};
const FALLBACK_IMAGE = "/images/resort/txaleta_hero.webp";

function roomImage(name: string, apiImages?: string[]): string {
  if (apiImages && apiImages.length > 0) {
    // CloudReef returns ABSOLUTE urls to this site's own /images (the chatbot,
    // hosted elsewhere, needs them absolute). next/image treats an absolute url
    // as remote and renders it broken unless the host is in images.remotePatterns
    // — so strip the same-origin prefix and serve it as a local file instead.
    return apiImages[0].replace(/^https?:\/\/[^/]+(?=\/)/, "");
  }
  return ROOM_IMAGES[name] ?? FALLBACK_IMAGE;
}

type Step = "stay" | "details" | "payment" | "done";
type PayMethod = "apple_pay" | "google_pay" | "card";

type Props = {
  initialCheckin?: string;
  initialCheckout?: string;
  initialGuests?: string;
  initialRoom?: string; // slug from site.ts
  initialPromo?: string; // ?promo= deep link or a pop-up "copy code"
};

export function BookingFlow({ initialCheckin, initialCheckout, initialGuests, initialRoom, initialPromo }: Props) {
  // ── Remote data ───────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currency, setCurrency] = useState("PHP");
  const [roomTypes, setRoomTypes] = useState<ApiRoomType[]>([]);
  const [fullyBookedByType, setFullyBookedByType] = useState<Record<string, string[]>>({});

  // ── Selection ─────────────────────────────────────────────────────────────
  const [step, setStep] = useState<Step>("stay");
  const [typeName, setTypeName] = useState<string>("");
  const [checkin, setCheckin] = useState(initialCheckin ?? "");
  const [checkout, setCheckout] = useState(initialCheckout ?? "");
  const [guests, setGuests] = useState<number>(Number(initialGuests) || 2);

  const [contact, setContact] = useState({ name: "", email: "", phone: "", message: "" });
  const [payMethod, setPayMethod] = useState<PayMethod>("apple_pay");
  const [card, setCard] = useState({ number: "4242 4242 4242 4242", exp: "12 / 30", cvc: "123" });

  const [processing, setProcessing] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [result, setResult] = useState<ConfirmResponse | null>(null);

  // ── Promo code ─────────────────────────────────────────────────────────────
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountAmount: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoChecking, setPromoChecking] = useState(false);

  // Top of the flow, so each step transition can scroll back into view.
  const flowRef = useRef<HTMLDivElement>(null);
  const isMountScroll = useRef(true);

  // Map an incoming room slug → CloudReef display name (best-effort).
  const initialTypeName = useMemo(() => {
    if (!initialRoom) return "";
    return siteRooms.find((r) => r.slug === initialRoom)?.name ?? "";
  }, [initialRoom]);

  // Gentle note when a stale/invalid date selection is cleared for a room.
  const [availNote, setAvailNote] = useState<string | null>(null);

  // Pull LIVE availability (all room types in one call) from CloudReef.
  const refreshAvailability = useCallback(async () => {
    try {
      const from = format(new Date(), "yyyy-MM-dd");
      const to = format(addDays(new Date(), 180), "yyyy-MM-dd");
      const availRes = await fetchAvailability(from, to);
      const map: Record<string, string[]> = {};
      for (const t of availRes.types) map[t.name] = t.fullyBookedDates;
      setFullyBookedByType(map);
    } catch {
      /* keep last-known availability rather than blanking the calendar */
    }
  }, []);

  // Initial load: rooms + first availability pull.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const roomsRes = await fetchRooms();
        if (!alive) return;
        setCurrency(roomsRes.currency || "PHP");
        setRoomTypes(roomsRes.roomTypes);
        await refreshAvailability();
        if (!alive) return;
        if (initialTypeName && roomsRes.roomTypes.some((t) => t.name === initialTypeName)) {
          setTypeName(initialTypeName);
        }
      } catch (e) {
        if (alive) setLoadError(e instanceof Error ? e.message : "Could not load rooms");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [initialTypeName, refreshAvailability]);

  // Re-pull availability whenever the guest focuses a different room — keeps the
  // calendar live (e.g. reflects a booking just made this session).
  useEffect(() => {
    if (typeName) refreshAvailability();
  }, [typeName, refreshAvailability]);

  const selectedType = roomTypes.find((t) => t.name === typeName) ?? null;
  const nights = nightsBetween(checkin, checkout);
  const subtotal = selectedType ? selectedType.base_rate * nights : 0;
  const promoDiscount = appliedPromo ? Math.min(appliedPromo.discountAmount, subtotal) : 0;
  const total = Math.max(0, subtotal - promoDiscount);

  const disabledDatesForSelected = useMemo(() => {
    const list = (typeName && fullyBookedByType[typeName]) || [];
    return list.map(ymdToDate);
  }, [typeName, fullyBookedByType]);

  // First booked night strictly after check-in — caps check-out so a stay can't
  // be selected straddling an occupied block.
  const checkoutMaxDate = useMemo(() => {
    if (!typeName || !checkin) return undefined;
    const after = (fullyBookedByType[typeName] ?? []).filter((d) => d > checkin).sort();
    return after.length ? ymdToDate(after[0]) : undefined;
  }, [typeName, checkin, fullyBookedByType]);

  // When the room (or its live availability) changes, drop any now-unavailable
  // dates so the guest is never told "those dates aren't free" AFTER picking.
  useEffect(() => {
    if (!typeName || !checkin) return;
    const booked = new Set(fullyBookedByType[typeName] ?? []);
    const keys = checkout ? nightKeysInRange(checkin, checkout) : [checkin];
    if (keys.some((k) => booked.has(k))) {
      setCheckin("");
      setCheckout("");
      setAvailNote("Those dates are booked for this room — please pick from the available days.");
    } else {
      setAvailNote(null);
    }
    // Only re-check on room / availability change (not on every date keystroke).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeName, fullyBookedByType]);

  // Does the chosen span include any fully-booked night for the selected type?
  function spanAvailable(): boolean {
    if (!selectedType || !checkin || !checkout || nights < 1) return false;
    const booked = new Set(fullyBookedByType[typeName] ?? []);
    return nightKeysInRange(checkin, checkout).every((k) => !booked.has(k));
  }

  // ── Promo handlers ─────────────────────────────────────────────────────────
  const applyPromo = useCallback(async () => {
    const code = promoInput.trim();
    if (!code) return;
    if (!selectedType || !checkin || !checkout || nights < 1) {
      setPromoError("Choose your room and dates first.");
      return;
    }
    setPromoChecking(true);
    setPromoError(null);
    try {
      const res = await validatePromo({ code, checkin, checkout, roomType: selectedType.name });
      if (res.valid) {
        setAppliedPromo({ code: res.code, discountAmount: res.discountAmount });
        setPromoInput(res.code);
        setPromoError(null);
      } else {
        setAppliedPromo(null);
        setPromoError(res.message);
      }
    } catch {
      setAppliedPromo(null);
      setPromoError("Couldn't check that code right now.");
    } finally {
      setPromoChecking(false);
    }
  }, [promoInput, selectedType, checkin, checkout, nights]);

  function clearPromo() {
    setAppliedPromo(null);
    setPromoError(null);
    setPromoInput("");
    try {
      localStorage.removeItem("txaleta:promo-code");
    } catch {
      /* ignore */
    }
  }

  // Seed the code once from ?promo= / a pop-up "copy code".
  useEffect(() => {
    let seed = (initialPromo ?? "").trim();
    if (!seed) {
      try {
        seed = (localStorage.getItem("txaleta:promo-code") ?? "").trim();
      } catch {
        /* ignore */
      }
    }
    if (seed) setPromoInput(seed.toUpperCase());
    // one-shot on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A change of room or dates invalidates a computed discount — drop it so the
  // guest re-applies against the new subtotal (the typed code is kept).
  useEffect(() => {
    setAppliedPromo(null);
    setPromoError(null);
  }, [typeName, checkin, checkout]);

  // ── Step transitions ──────────────────────────────────────────────────────
  function goToDetails() {
    setStepError(null);
    if (!selectedType) return setStepError("Please choose a room.");
    if (!checkin || !checkout || nights < 1) return setStepError("Please choose your dates.");
    if (guests > selectedType.max_occupancy)
      return setStepError(`${selectedType.name} sleeps up to ${selectedType.max_occupancy}.`);
    if (!spanAvailable())
      return setStepError("Those dates aren't fully available for this room — please adjust.");
    setStep("details");
  }

  function goToPayment() {
    setStepError(null);
    if (!contact.name.trim()) return setStepError("Please enter your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim()))
      return setStepError("Please enter a valid email.");
    setStep("payment");
    // Auto-apply a seeded code (deep link / pop-up) the moment dates are locked.
    if (promoInput.trim() && !appliedPromo) void applyPromo();
  }

  async function pay() {
    if (processing) return;
    setStepError(null);
    setProcessing(true);
    try {
      // Simulated wallet / card sheet
      await new Promise((r) => setTimeout(r, 1600));
      const ref = `demo_${payMethod}_${Math.random().toString(36).slice(2, 10)}`;
      const res = await confirmBooking({
        name: contact.name.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim() || undefined,
        roomType: selectedType!.name,
        checkin,
        checkout,
        guests,
        message: contact.message.trim() || undefined,
        promoCode: appliedPromo?.code,
        payment: { method: payMethod, simulated: true, reference: ref },
      });
      setResult(res);
      setStep("done");
    } catch (e) {
      setStepError(e instanceof Error ? e.message : "Payment could not be completed.");
    } finally {
      setProcessing(false);
    }
  }

  // Scroll the booking form into view on mount (user lands on /book and the form
  // is below the hero banner) and on every step change (Continue / Pay / Back).
  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    const doScroll = () => {
      const top = el.getBoundingClientRect().top + window.scrollY - 96; // clear condensed nav + air
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    };
    if (isMountScroll.current) {
      isMountScroll.current = false;
      // Brief delay on first render so the hero gets a moment to show,
      // then glide down to the form.
      const id = setTimeout(doScroll, 350);
      return () => clearTimeout(id);
    }
    doScroll();
  }, [step]);

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) return <FlowSkeleton />;

  if (loadError) {
    return (
      <div className="rounded-sm border border-ink/10 bg-cream p-8">
        <div className="flex items-center gap-3 text-ink">
          <AlertCircle className="h-5 w-5 text-brand" />
          <p className="text-sm">We couldn&apos;t load live availability right now.</p>
        </div>
        <p className="mt-3 text-sm text-ink/60">
          Please try again, or message us on{" "}
          <a className="underline hover:text-sand" href={`https://wa.me/${site.contact.whatsapp}`}>
            WhatsApp
          </a>{" "}
          and we&apos;ll book you in directly.
        </p>
      </div>
    );
  }

  if (step === "done" && result) {
    return (
      <div ref={flowRef}>
        <SuccessCard result={result} currency={currency} email={contact.email} />
      </div>
    );
  }

  return (
    <div ref={flowRef} className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <StepNav step={step} />

        {step === "stay" && (
          <StayStep
            currency={currency}
            roomTypes={roomTypes}
            typeName={typeName}
            setTypeName={(n) => {
              setTypeName(n);
              setStepError(null);
            }}
            checkin={checkin}
            checkout={checkout}
            setCheckin={(d) => {
              setCheckin(d);
              if (checkout && d >= checkout) setCheckout("");
            }}
            setCheckout={setCheckout}
            guests={guests}
            setGuests={setGuests}
            disabledDates={disabledDatesForSelected}
            checkoutMaxDate={checkoutMaxDate}
            availNote={availNote}
            selectedType={selectedType}
          />
        )}

        {step === "details" && (
          <DetailsStep contact={contact} setContact={setContact} />
        )}

        {step === "payment" && (
          <PaymentStep
            currency={currency}
            total={total}
            payMethod={payMethod}
            setPayMethod={setPayMethod}
            card={card}
            setCard={setCard}
            processing={processing}
            onPay={pay}
            promoInput={promoInput}
            setPromoInput={setPromoInput}
            appliedPromo={appliedPromo}
            promoError={promoError}
            promoChecking={promoChecking}
            onApplyPromo={applyPromo}
            onClearPromo={clearPromo}
          />
        )}

        {stepError && (
          <p className="mt-5 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" /> {stepError}
          </p>
        )}

        {/* Step controls */}
        <div className="mt-9 flex items-center justify-between">
          {step !== "stay" ? (
            <button
              type="button"
              onClick={() => {
                setStepError(null);
                setStep(step === "payment" ? "details" : "stay");
              }}
              className="label inline-flex items-center gap-2 text-[11px] text-ink/55 transition-colors hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}

          {step === "stay" && (
            <button
              type="button"
              onClick={goToDetails}
              className="label bg-ink px-10 py-4 text-[11px] text-white transition-colors hover:bg-sand"
            >
              Continue
            </button>
          )}
          {step === "details" && (
            <button
              type="button"
              onClick={goToPayment}
              className="label bg-ink px-10 py-4 text-[11px] text-white transition-colors hover:bg-sand"
            >
              Continue to Payment
            </button>
          )}
        </div>
      </div>

      {/* Summary rail */}
      <SummaryRail
        currency={currency}
        selectedType={selectedType}
        checkin={checkin}
        checkout={checkout}
        nights={nights}
        guests={guests}
        subtotal={subtotal}
        discount={promoDiscount}
        promoCode={appliedPromo?.code ?? null}
        total={total}
      />
    </div>
  );
}

// ── Step navigation ──────────────────────────────────────────────────────────
function StepNav({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "stay", label: "Your Stay" },
    { key: "details", label: "Details" },
    { key: "payment", label: "Payment" },
  ];
  const idx = steps.findIndex((s) => s.key === step);
  return (
    <div className="mb-9 flex items-center gap-3">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-3">
          <span
            className={`label text-[10px] ${i <= idx ? "text-ink" : "text-ink/30"}`}
          >
            <span
              className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                i < idx
                  ? "bg-brand text-white"
                  : i === idx
                    ? "bg-ink text-white"
                    : "bg-ink/10 text-ink/40"
              }`}
            >
              {i + 1}
            </span>
            {s.label}
          </span>
          {i < steps.length - 1 && <span className="h-px w-6 bg-ink/15" />}
        </div>
      ))}
    </div>
  );
}

// ── Step 1: stay ─────────────────────────────────────────────────────────────
function StayStep(props: {
  currency: string;
  roomTypes: ApiRoomType[];
  typeName: string;
  setTypeName: (n: string) => void;
  checkin: string;
  checkout: string;
  setCheckin: (d: string) => void;
  setCheckout: (d: string) => void;
  guests: number;
  setGuests: (n: number) => void;
  disabledDates: Date[];
  checkoutMaxDate?: Date;
  availNote: string | null;
  selectedType: ApiRoomType | null;
}) {
  const {
    currency,
    roomTypes,
    typeName,
    setTypeName,
    checkin,
    checkout,
    setCheckin,
    setCheckout,
    guests,
    setGuests,
    disabledDates,
    checkoutMaxDate,
    availNote,
    selectedType,
  } = props;

  const maxGuests = selectedType?.max_occupancy ?? 8;

  // Bumped whenever check-in is picked → auto-opens the check-out calendar.
  const [checkoutOpenSignal, setCheckoutOpenSignal] = useState(0);

  return (
    <div className="space-y-10">
      {/* Rooms — photo + facilities cards */}
      <div>
        <h2 className="font-display text-2xl font-light text-ink">Choose your room</h2>
        <p className="mt-1.5 text-[13px] text-ink/50">Rates are all-in — taxes included, no booking fees.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {roomTypes.map((t) => {
            const active = t.name === typeName;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setTypeName(t.name)}
                className={`group overflow-hidden border text-left transition-all ${
                  active ? "border-ink ring-1 ring-ink" : "border-ink/12 hover:border-ink/40"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={roomImage(t.name, t.images)}
                    alt={t.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <span className="label absolute left-3 top-3 bg-white/85 px-2 py-1 text-[8px] uppercase text-ink backdrop-blur-sm">
                    {t.type}
                  </span>
                  {active && (
                    <span className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white shadow-lg">
                      <Check className="h-4 w-4" strokeWidth={2} />
                    </span>
                  )}
                  <span className="font-display absolute inset-x-3 bottom-3 text-[19px] font-light leading-tight text-white">
                    {t.name}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="label inline-flex items-center gap-1.5 text-[9px] text-ink/45">
                      <BedDouble className="h-3.5 w-3.5 text-brand" strokeWidth={1.5} />
                      Sleeps {t.max_occupancy} · {t.count} {t.count === 1 ? "room" : "rooms"}
                    </span>
                    <span className="text-ink">
                      <span className="font-mono text-lg">{formatMoney(currency, t.base_rate)}</span>
                      <span className="text-[11px] text-ink/45"> /night</span>
                    </span>
                  </div>
                  {t.amenities.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {t.amenities.slice(0, 4).map((a) => (
                        <li
                          key={a}
                          className="rounded-full border border-ink/12 px-2.5 py-1 text-[10px] text-ink/55"
                        >
                          {a}
                        </li>
                      ))}
                      {t.amenities.length > 4 && (
                        <li className="rounded-full px-1.5 py-1 text-[10px] text-ink/40">
                          +{t.amenities.length - 4} more
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Check-in & check-out + guests */}
      <div>
        <h2 className="font-display text-2xl font-light text-ink">Check-in &amp; check-out</h2>
        {!selectedType ? (
          <p className="mt-2 text-[13px] text-ink/45">Pick a room above to see live availability.</p>
        ) : (
          <p className="mt-2 text-[13px] text-ink/45">
            Live availability for <span className="text-ink">{selectedType.name}</span>.
          </p>
        )}
        <div className="mt-5 grid gap-7 sm:grid-cols-3">
          <div className="border-b border-ink/15 pb-2">
            <DatePicker
              label="Check-in"
              value={checkin}
              onChange={(d) => {
                setCheckin(d);
                // Picking arrival immediately opens the departure calendar.
                setCheckoutOpenSignal((n) => n + 1);
              }}
              minDate={new Date()}
              placeholder="Add date"
              disabledDates={disabledDates}
            />
          </div>
          <div className="border-b border-ink/15 pb-2">
            <DatePicker
              label="Check-out"
              value={checkout}
              onChange={setCheckout}
              minDate={checkin ? addDays(ymdToDate(checkin), 1) : addDays(new Date(), 1)}
              maxDate={checkoutMaxDate}
              placeholder="Add date"
              disabledDates={disabledDates}
              openSignal={checkoutOpenSignal}
              defaultMonth={checkin ? ymdToDate(checkin) : undefined}
            />
          </div>
          <label className="relative border-b border-ink/15 pb-2">
            <span className="label block text-[9px] tracking-widest text-ink/45">Guests</span>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1.5 w-full appearance-none bg-transparent text-sm text-ink outline-none"
            >
              {Array.from({ length: Math.min(8, maxGuests) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
            <Users className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-sand" strokeWidth={1.5} />
          </label>
        </div>
        {availNote && (
          <p className="mt-4 flex items-center gap-2 text-[12px] text-amber-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {availNote}
          </p>
        )}
        {disabledDates.length > 0 && (
          <p className="mt-3 flex items-center gap-2 text-[12px] text-ink/45">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-ink/15" />
            Greyed-out dates are already booked for this room.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Step 2: details ──────────────────────────────────────────────────────────
function DetailsStep({
  contact,
  setContact,
}: {
  contact: { name: string; email: string; phone: string; message: string };
  setContact: (c: { name: string; email: string; phone: string; message: string }) => void;
}) {
  const field =
    "mt-2 w-full border-b border-ink/15 bg-transparent pb-2 text-sm text-ink outline-none transition-colors focus:border-sand [color-scheme:light]";
  const lbl = "label block text-[9px] text-ink/45";
  return (
    <div>
      <h2 className="font-display text-2xl font-light text-ink">Who&apos;s staying?</h2>
      <div className="mt-6 grid gap-7 sm:grid-cols-2">
        <label>
          <span className={lbl}>Full Name *</span>
          <input
            required
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className={field}
            placeholder="Jane Dela Cruz"
          />
        </label>
        <label>
          <span className={lbl}>Email *</span>
          <input
            required
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className={field}
            placeholder="jane@email.com"
          />
        </label>
        <label>
          <span className={lbl}>Phone / WhatsApp</span>
          <input
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className={field}
            placeholder="+63 9XX XXX XXXX"
          />
        </label>
      </div>
      <label className="mt-7 block">
        <span className={lbl}>Anything we should know?</span>
        <textarea
          rows={3}
          value={contact.message}
          onChange={(e) => setContact({ ...contact, message: e.target.value })}
          className={field}
          placeholder="Transfers, dietary needs, a special occasion…"
        />
      </label>
    </div>
  );
}

// ── Step 3: payment (simulated) ──────────────────────────────────────────────
function PaymentStep(props: {
  currency: string;
  total: number;
  payMethod: PayMethod;
  setPayMethod: (m: PayMethod) => void;
  card: { number: string; exp: string; cvc: string };
  setCard: (c: { number: string; exp: string; cvc: string }) => void;
  processing: boolean;
  onPay: () => void;
  promoInput: string;
  setPromoInput: (v: string) => void;
  appliedPromo: { code: string; discountAmount: number } | null;
  promoError: string | null;
  promoChecking: boolean;
  onApplyPromo: () => void;
  onClearPromo: () => void;
}) {
  const {
    currency,
    total,
    payMethod,
    setPayMethod,
    card,
    setCard,
    processing,
    onPay,
    promoInput,
    setPromoInput,
    appliedPromo,
    promoError,
    promoChecking,
    onApplyPromo,
    onClearPromo,
  } = props;
  const amount = formatMoney(currency, total);

  return (
    <div>
      <h2 className="font-display text-2xl font-light text-ink">Payment</h2>

      <div className="mt-3 inline-flex items-center gap-2 rounded-sm bg-cream px-3 py-1.5 text-[11px] text-ink/60">
        <ShieldCheck className="h-3.5 w-3.5 text-brand" />
        Demo mode — no real charge. Card <span className="font-mono">4242 4242 4242 4242</span> works.
      </div>

      {/* Promo code */}
      <div className="mt-6">
        {appliedPromo ? (
          <div className="flex items-center justify-between gap-3 rounded-sm border border-brand/30 bg-brand/[0.06] px-3.5 py-3">
            <span className="flex items-center gap-2 text-[13px] text-ink">
              <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
              <span className="font-mono font-medium">{appliedPromo.code}</span>
              <span className="text-ink/60">— you save {formatMoney(currency, appliedPromo.discountAmount)}</span>
            </span>
            <button
              type="button"
              onClick={onClearPromo}
              className="shrink-0 text-[12px] text-ink/45 underline transition-colors hover:text-ink"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <label className="label block text-[9px] text-ink/45">Promo code</label>
            <div className="mt-2 flex items-end gap-3">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onApplyPromo();
                  }
                }}
                placeholder="Have a code?"
                className="flex-1 border-b border-ink/15 bg-transparent pb-2 font-mono text-sm uppercase text-ink outline-none transition-colors focus:border-sand placeholder:normal-case placeholder:text-ink/35"
              />
              <button
                type="button"
                onClick={onApplyPromo}
                disabled={promoChecking || !promoInput.trim()}
                className="label inline-flex items-center gap-2 border-b border-ink pb-2 text-[11px] text-ink transition-colors hover:text-sand disabled:opacity-40"
              >
                {promoChecking && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Apply
              </button>
            </div>
          </>
        )}
        {promoError && (
          <p className="mt-2 flex items-center gap-1.5 text-[12px] text-red-600">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {promoError}
          </p>
        )}
      </div>

      {/* Wallet buttons */}
      <div className="mt-6 space-y-3">
        <button
          type="button"
          disabled={processing}
          onClick={() => {
            setPayMethod("apple_pay");
            onPay();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-black py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {processing && payMethod === "apple_pay" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <AppleLogo className="h-5 w-5" />
          )}
          Pay
        </button>

        <button
          type="button"
          disabled={processing}
          onClick={() => {
            setPayMethod("google_pay");
            onPay();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-ink/15 bg-white py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-cream disabled:opacity-50"
        >
          {processing && payMethod === "google_pay" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GoogleLogo className="h-5 w-5" />
          )}
          Pay
        </button>
      </div>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4 text-[10px] uppercase tracking-widest text-ink/35">
        <span className="h-px flex-1 bg-ink/10" /> or pay with card <span className="h-px flex-1 bg-ink/10" />
      </div>

      {/* Card */}
      <div className="space-y-4">
        <label className="block">
          <span className="label block text-[9px] text-ink/45">Card number</span>
          <div className="mt-2 flex items-center gap-2 border-b border-ink/15 pb-2">
            <input
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              className="w-full bg-transparent font-mono text-sm text-ink outline-none"
              inputMode="numeric"
            />
            <CardMarks />
          </div>
        </label>
        <div className="grid grid-cols-2 gap-5">
          <label className="block">
            <span className="label block text-[9px] text-ink/45">Expiry</span>
            <input
              value={card.exp}
              onChange={(e) => setCard({ ...card, exp: e.target.value })}
              className="mt-2 w-full border-b border-ink/15 bg-transparent pb-2 font-mono text-sm text-ink outline-none"
            />
          </label>
          <label className="block">
            <span className="label block text-[9px] text-ink/45">CVC</span>
            <input
              value={card.cvc}
              onChange={(e) => setCard({ ...card, cvc: e.target.value })}
              className="mt-2 w-full border-b border-ink/15 bg-transparent pb-2 font-mono text-sm text-ink outline-none"
            />
          </label>
        </div>
        <button
          type="button"
          disabled={processing}
          onClick={() => {
            setPayMethod("card");
            onPay();
          }}
          className="label mt-2 inline-flex w-full items-center justify-center gap-3 bg-ink py-4 text-[11px] text-white transition-colors hover:bg-sand disabled:opacity-60"
        >
          {processing && payMethod === "card" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Lock className="h-3.5 w-3.5" />
          )}
          {processing && payMethod === "card" ? "Processing…" : `Pay ${amount}`}
        </button>
      </div>
    </div>
  );
}

// ── Summary rail ─────────────────────────────────────────────────────────────
function SummaryRail(props: {
  currency: string;
  selectedType: ApiRoomType | null;
  checkin: string;
  checkout: string;
  nights: number;
  guests: number;
  subtotal: number;
  discount: number;
  promoCode: string | null;
  total: number;
}) {
  const { currency, selectedType, checkin, checkout, nights, guests, subtotal, discount, promoCode, total } = props;
  const fmtD = (s: string) => (s ? format(ymdToDate(s), "EEE, dd MMM yyyy") : "—");

  return (
    <aside className="h-fit border border-ink/10 bg-cream p-7 lg:sticky lg:top-28">
      <h3 className="label text-[10px] text-ink/45">Your stay</h3>
      {selectedType && (
        <div className="relative mt-3 aspect-[16/9] overflow-hidden bg-white">
          <Image
            src={roomImage(selectedType.name, selectedType.images)}
            alt={selectedType.name}
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>
      )}
      <p className="font-display mt-3 text-2xl font-light text-ink">
        {selectedType?.name ?? "Select a room"}
      </p>
      {selectedType && selectedType.amenities.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {selectedType.amenities.slice(0, 5).map((a) => (
            <li
              key={a}
              className="rounded-full border border-ink/12 px-2 py-0.5 text-[10px] text-ink/55"
            >
              {a}
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink/50">Check-in</dt>
          <dd className="text-ink">{fmtD(checkin)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/50">Check-out</dt>
          <dd className="text-ink">{fmtD(checkout)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/50">Guests</dt>
          <dd className="text-ink">{guests}</dd>
        </div>
      </dl>

      {selectedType && nights > 0 && (
        <div className="mt-6 border-t border-ink/10 pt-5">
          <div className="flex justify-between text-sm text-ink/60">
            <span>
              {formatMoney(currency, selectedType.base_rate)} × {nights} night{nights !== 1 ? "s" : ""}
            </span>
            <span className="font-mono">{formatMoney(currency, subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="mt-2 flex justify-between text-sm text-brand">
              <span>Promo{promoCode ? ` (${promoCode})` : ""}</span>
              <span className="font-mono">−{formatMoney(currency, discount)}</span>
            </div>
          )}
          <div className="mt-4 flex items-baseline justify-between">
            <span className="label text-[10px] text-ink/45">Total</span>
            <span className="font-mono text-2xl text-ink">{formatMoney(currency, total)}</span>
          </div>
          <p className="mt-2 text-[11px] text-ink/40">Taxes included. No booking fees.</p>
        </div>
      )}
    </aside>
  );
}

// ── Success ──────────────────────────────────────────────────────────────────
function SuccessCard({
  result,
  currency,
  email,
}: {
  result: ConfirmResponse;
  currency: string;
  email: string;
}) {
  const fmtD = (s: string) => format(ymdToDate(s), "EEE, dd MMM yyyy");
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col items-center rounded-sm border border-brand/25 bg-cream px-8 py-14 text-center">
        <CheckCircle2 className="h-16 w-16 text-brand" strokeWidth={1.1} />
        <h2 className="font-display mt-6 text-4xl font-light text-ink">You&apos;re booked</h2>
        <p className="mt-3 text-[15px] text-ink/65">
          Confirmation <span className="font-mono font-medium text-ink">{result.bookingRef}</span>
        </p>

        <dl className="mt-8 w-full space-y-3 border-t border-ink/10 pt-6 text-left text-sm">
          <Row label="Room" value={result.room} />
          <Row label="Check-in" value={fmtD(result.checkIn)} />
          <Row label="Check-out" value={fmtD(result.checkOut)} />
          <Row label="Nights" value={String(result.nights)} />
          <Row label="Guests" value={String(result.guests)} />
          {result.discountAmount ? (
            <div className="flex justify-between">
              <dt className="text-ink/50">Discount{result.promoCode ? ` (${result.promoCode})` : ""}</dt>
              <dd className="font-mono text-brand">−{formatMoney(currency, result.discountAmount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-ink/10 pt-3">
            <dt className="text-ink/50">Paid</dt>
            <dd className="font-mono text-base text-ink">{formatMoney(currency, result.amountPaid)}</dd>
          </div>
        </dl>

        <p className="mt-7 text-[14px] leading-relaxed text-ink/65">
          {result.emailSent ? (
            <>A confirmation email is on its way to <span className="text-ink">{email}</span>.</>
          ) : (
            <>We&apos;ve saved your booking — our team will email your confirmation shortly.</>
          )}
        </p>

        <a
          href={`https://wa.me/${site.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-8 inline-block border-b border-brand pb-1 text-[11px] text-ink transition-colors hover:text-sand"
        >
          Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink/50">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function FlowSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-6">
        <div className="h-6 w-40 animate-pulse bg-ink/10" />
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse border border-ink/10 bg-ink/[0.04]" />
          ))}
        </div>
        <div className="h-10 w-full animate-pulse bg-ink/10" />
      </div>
      <div className="h-72 animate-pulse border border-ink/10 bg-ink/[0.04]" />
    </div>
  );
}

// ── Brand marks ──────────────────────────────────────────────────────────────
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} aria-hidden="true" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function CardMarks() {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <span className="inline-block h-4 w-6 rounded-[2px] bg-gradient-to-r from-[#1a1f71] to-[#2566af]" title="Visa" />
      <span className="inline-block h-4 w-6 rounded-[2px] bg-gradient-to-r from-[#eb001b] to-[#f79e1b]" title="Mastercard" />
    </div>
  );
}
