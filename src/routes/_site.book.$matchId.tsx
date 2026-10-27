import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { formatMatchDate } from "@/components/MatchCard";
import { newId, useBookings, useSite } from "@/context/SiteContext";
import type { SeatTier } from "@/lib/types";

type BookSearch = { category: SeatTier["name"] | undefined };

export const Route = createFileRoute("/_site/book/$matchId")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    category: (search["category"] as SeatTier["name"]) ?? undefined,
  }),
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Book Tickets | XYZ Stadium" },
      {
        name: "description",
        content: "Complete your ticket booking for matches at XYZ Stadium, Pune — choose seats, review the summary and confirm.",
      },
      { property: "og:title", content: "Book Tickets | XYZ Stadium" },
      { property: "og:description", content: "Complete your ticket booking for matches at XYZ Stadium, Pune." },
      { property: "og:type", content: "website" },
    ],
  }),
});

function BookingPage() {
  const { matchId } = Route.useParams();
  const { category: initialCategory } = Route.useSearch();
  const navigate = useNavigate();
  const { data } = useSite();
  const [, updateBookings] = useBookings();

  const match = data.matches.find((m) => m.id === matchId);
  const openTier = match?.seatTiers.find((t) => t.available > 0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 2,
    category: (initialCategory ?? openTier?.name ?? "Economy") as SeatTier["name"],
    payment: "UPI",
  });
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{ id: string; total: number } | null>(null);

  if (!match || match.status !== "Upcoming") {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-wide">Booking Unavailable</h1>
        <p className="mt-3 text-muted-foreground">
          This match doesn't exist or ticket sales are closed. Browse upcoming matches to book your seats.
        </p>
        <Button className="mt-6" onClick={() => navigate({ to: "/matches" })}>
          View Matches
        </Button>
      </section>
    );
  }

  const tier = match.seatTiers.find((t) => t.name === form.category) ?? openTier!;
  const total = tier.price * form.tickets;
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.tickets < 1 || form.tickets > 10) return setError("You can book between 1 and 10 tickets.");
    if (form.tickets > tier.available) return setError(`Only ${tier.available} ${tier.name} seats remain for this match.`);
    const bookingId = newId("BK").toUpperCase();
    updateBookings((prev) => [
      {
        id: bookingId,
        matchId: match.id,
        matchName: `${match.teamA} vs ${match.teamB}`,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        category: form.category,
        tickets: form.tickets,
        total,
        payment: form.payment,
        status: "Pending",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setConfirmed({ id: bookingId, total });
  };

  /* ------------------------------ Success view ------------------------------ */
  if (confirmed) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/15">
          <BadgeCheck className="h-10 w-10 text-secondary" />
        </span>
        <h1 className="mt-6 font-display text-5xl tracking-wide text-foreground">Booking Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Your seats are reserved. Show your booking ID at the gate — a confirmation has been sent to your email.
        </p>
        <Card className="mt-8 p-6 text-left">
          <p className="text-sm text-muted-foreground">Booking ID</p>
          <p className="font-display text-3xl tracking-wider text-primary">{confirmed.id}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Match</dt><dd className="font-semibold">{match.teamA} vs {match.teamB}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd className="font-semibold">{formatMatchDate(match.date)} · {match.time} IST</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Category</dt><dd className="font-semibold">{form.category} × {form.tickets}</dd></div>
            <div className="flex justify-between border-t border-border pt-2"><dt className="text-muted-foreground">Total Paid</dt><dd className="font-bold text-primary">₹{confirmed.total.toLocaleString("en-IN")}</dd></div>
          </dl>
        </Card>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate({ to: "/matches" })}>
            Book Another Match
          </Button>
          <Button onClick={() => navigate({ to: "/" })}>Back Home</Button>
        </div>
      </section>
    );
  }

  /* ------------------------------- Form view -------------------------------- */
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/matches" className="hover:text-primary">Matches</Link> /{" "}
        <Link to="/matches/$id" params={{ id: match.id }} className="hover:text-primary">
          {match.teamA} vs {match.teamB}
        </Link>{" "}
        / <span className="font-semibold text-foreground">Book Tickets</span>
      </nav>
      <h1 className="font-display text-4xl tracking-wide text-foreground sm:text-5xl">Book Your Tickets</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <Card className="p-6 sm:p-8">
          <form onSubmit={confirm} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
            <Field label="Full Name">
              <Input required value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="Your name" aria-label="Full name" />
            </Field>
            <Field label="Email">
              <Input required type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@example.com" aria-label="Email" />
            </Field>
            <Field label="Phone">
              <Input required type="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+91 …" aria-label="Phone number" />
            </Field>
            <Field label="Number of Tickets">
              <Select
                value={form.tickets}
                onChange={(e) => set({ tickets: Number(e.target.value) })}
                aria-label="Number of tickets"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Select>
            </Field>
            <Field label="Seat Category">
              <Select value={form.category} onChange={(e) => set({ category: e.target.value as SeatTier["name"] })} aria-label="Seat category">
                {match.seatTiers.map((t) => (
                  <option key={t.name} value={t.name} disabled={t.available === 0}>
                    {t.name} — ₹{t.price.toLocaleString("en-IN")}{t.available === 0 ? " (sold out)" : ""}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Payment Method">
              <Select value={form.payment} onChange={(e) => set({ payment: e.target.value })} aria-label="Payment method">
                <option>UPI</option>
                <option>Card</option>
                <option>Net Banking</option>
                <option>Pay at Gate</option>
              </Select>
            </Field>
            {error && (
              <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive sm:col-span-2">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="sm:col-span-2">
              <Ticket className="h-5 w-5" /> Confirm Booking — ₹{total.toLocaleString("en-IN")}
            </Button>
            <p className="text-center text-xs text-muted-foreground sm:col-span-2">
              Mock checkout — no real payment is processed. Your booking is saved locally.
            </p>
          </form>
        </Card>

        {/* Summary */}
        <aside className="h-fit rounded-2xl bg-stadium-dark p-6 text-white shadow-premium lg:sticky lg:top-24">
          <img
            src={match.image}
            alt={`${match.teamA} vs ${match.teamB}`}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-40 w-full rounded-xl object-cover"
          />
          <h2 className="mt-4 font-display text-3xl tracking-wide">
            {match.teamA} <span className="text-accent">vs</span> {match.teamB}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" /> {formatMatchDate(match.date)}</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> {match.time} IST</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {match.venue}</li>
          </ul>
          <div className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
            <p className="flex justify-between text-white/75">
              <span>{form.category} × {form.tickets}</span>
              <span>₹{tier.price.toLocaleString("en-IN")} each</span>
            </p>
            <p className="flex justify-between text-white/75">
              <span>Convenience fee</span>
              <span>Free</span>
            </p>
            <p className="flex justify-between border-t border-white/15 pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-accent">₹{total.toLocaleString("en-IN")}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
