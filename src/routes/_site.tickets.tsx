import { createFileRoute, Link } from "@tanstack/react-router";
import { Armchair, BadgeCheck, Ticket } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Newsletter } from "@/components/Newsletter";
import { Button, SectionHeading } from "@/components/ui";
import { useSite } from "@/context/SiteContext";
import type { SeatTier } from "@/lib/types";

export const Route = createFileRoute("/_site/tickets")({
  component: TicketsPage,
  head: () => ({
    meta: [
      { title: "Ticket Categories & Pricing | XYZ Stadium" },
      {
        name: "description",
        content:
          "Compare VIP, Premium, Standard and Economy ticket categories at XYZ Stadium, Pune — perks, pricing and refund policy explained.",
      },
      { property: "og:title", content: "Ticket Categories & Pricing | XYZ Stadium" },
      { property: "og:description", content: "VIP, Premium, Standard and Economy seats — compare perks and pricing." },
      { property: "og:type", content: "website" },
    ],
  }),
});

const TIER_META: { name: SeatTier["name"]; icon: string; blurb: string }[] = [
  { name: "VIP", icon: "🥂", blurb: "The ultimate matchday — hospitality suites with the best view in the house." },
  { name: "Premium", icon: "⭐", blurb: "Mid-tier comfort with lounge access and dedicated food counters." },
  { name: "Standard", icon: "🎟️", blurb: "Excellent pitch views at the heart of the atmosphere." },
  { name: "Economy", icon: "🧢", blurb: "Great-value seats with the full roar of the stadium." },
];

function TicketsPage() {
  const { data } = useSite();
  const upcoming = data.matches.filter((m) => m.status === "Upcoming");

  // Cheapest and dearest current price per category, across live fixtures.
  const priceRange = (name: SeatTier["name"]) => {
    const prices = upcoming.flatMap((m) => m.seatTiers.filter((t) => t.name === name).map((t) => t.price));
    if (!prices.length) return null;
    return { min: Math.min(...prices), max: Math.max(...prices) };
  };

  return (
    <>
      <section className="bg-stadium-dark py-14 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-5xl tracking-wide md:text-6xl">Tickets</h1>
          <p className="mt-3 text-white/80">Four ways to watch the game — one unbeatable stadium.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Seat Categories" title="Choose Your View" subtitle="Live pricing across all upcoming fixtures. Book early — the best seats go first." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIER_META.map((meta) => {
            const range = priceRange(meta.name);
            return (
              <article
                key={meta.name}
                className={`flex flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium ${
                  meta.name === "VIP" ? "border-accent/50 bg-card" : "border-border bg-card"
                }`}
              >
                <span className="text-3xl" aria-hidden>{meta.icon}</span>
                <h3 className="mt-3 font-display text-3xl tracking-wide text-foreground">{meta.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{meta.blurb}</p>
                <p className="mt-4 text-sm font-bold text-primary">
                  {range ? `₹${range.min.toLocaleString("en-IN")} – ₹${range.max.toLocaleString("en-IN")}` : "Currently unavailable"}
                </p>
                <Link
                  to="/matches"
                  className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
                >
                  <Ticket className="h-4 w-4" /> Find Seats
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/60 py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeading eyebrow="Booking Essentials" title="Know Before You Book" />
          <ul className="mx-auto max-w-2xl space-y-4">
            {[
              { icon: Armchair, text: "Every seat faces the pitch — sightlines are verified for all four tiers." },
              { icon: BadgeCheck, text: "Instant confirmation with your booking ID sent to email and WhatsApp." },
              { icon: Ticket, text: "Refunds accepted up to 48 hours before the match, minus a small processing fee." },
              { icon: Ticket, text: "Children under 3 enter free on a parent's lap; every other guest needs a ticket." },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-sm text-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Good To Know" title="Frequently Asked Questions" />
        <FaqAccordion />
      </section>

      <Newsletter />
    </>
  );
}
