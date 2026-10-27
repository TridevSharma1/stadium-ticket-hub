import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin, Ticket, Users } from "lucide-react";
import { Badge, Button, SectionHeading } from "@/components/ui";
import { MatchCard, formatMatchDate } from "@/components/MatchCard";
import { useSite } from "@/context/SiteContext";
import { seedData } from "@/mock/siteData";

export const Route = createFileRoute("/_site/matches/$id")({
  // Seed data resolves during SSR for dynamic page titles.
  loader: ({ params }) => {
    const match = seedData.matches.find((m) => m.id === params.id);
    if (!match) throw notFound();
    return { teamA: match.teamA, teamB: match.teamB };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.teamA} vs ${loaderData.teamB} Tickets | XYZ Stadium` : "Match Details | XYZ Stadium",
      },
      {
        name: "description",
        content: loaderData
          ? `Book tickets for ${loaderData.teamA} vs ${loaderData.teamB} at XYZ Stadium, Pune. VIP, Premium, Standard and Economy seating available.`
          : "Match details and ticket booking at XYZ Stadium, Pune.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.teamA} vs ${loaderData.teamB} | XYZ Stadium` : "Match Details | XYZ Stadium",
      },
      { property: "og:description", content: "Match details and ticket booking at XYZ Stadium, Pune." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MatchDetailPage,
});

function MatchDetailPage() {
  const { data } = useSite();
  const { id } = Route.useParams();
  const match = data.matches.find((m) => m.id === id) ?? seedData.matches.find((m) => m.id === id);
  if (!match) throw notFound();

  const others = data.matches.filter((m) => m.id !== id && m.status === "Upcoming").slice(0, 3);
  const statusVariant = { Upcoming: "success", Live: "warning", Completed: "muted", Cancelled: "danger" } as const;

  return (
    <>
      {/* Banner */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <img
          src={match.image}
          alt={`${match.teamA} vs ${match.teamB} at ${match.venue}`}
          className="absolute inset-0 h-full w-full object-cover"
          width={1024}
          height={1024}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 lg:px-8">
          <Link
            to="/matches"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> All matches
          </Link>
          <Badge variant={statusVariant[match.status]}>{match.status}</Badge>
          <h1 className="mt-3 font-display text-5xl tracking-wide text-white sm:text-6xl">
            {match.teamA} <span className="text-accent">vs</span> {match.teamB}
          </h1>
          <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-accent" /> {formatMatchDate(match.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" /> {match.time} IST</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> {match.venue}</span>
            <span className="flex items-center gap-1.5">{match.sport === "Cricket" ? "🏏 Cricket" : "⚽ Football"}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Seat categories */}
          <div>
            <h2 className="font-display text-3xl tracking-wide text-foreground">Seat Categories</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Four tiers of seating — every seat faces the pitch. Pick the view and comfort that suits you.
            </p>
            <div className="mt-6 space-y-4">
              {match.seatTiers.map((tier) => (
                <article
                  key={tier.name}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-premium sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-2xl tracking-wide text-foreground">{tier.name}</h3>
                      <Badge variant={tier.name === "VIP" ? "gold" : "default"}>₹{tier.price.toLocaleString("en-IN")}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{tier.perks}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-secondary">
                      <Users className="h-3.5 w-3.5" />
                      {tier.available > 0 ? `${tier.available.toLocaleString("en-IN")} seats available` : "Sold out"}
                    </p>
                  </div>
                  {match.status === "Upcoming" && tier.available > 0 ? (
                    <Link
                      to="/book/$matchId"
                      params={{ matchId: match.id }}
                      search={{ category: tier.name }}
                      className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-premium transition-all duration-300 hover:bg-secondary"
                    >
                      <Ticket className="h-4 w-4" /> Book {tier.name}
                    </Link>
                  ) : (
                    <Button size="sm" variant="ghost" disabled>
                      Unavailable
                    </Button>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Match facts sidebar */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-display text-2xl tracking-wide text-foreground">Match Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Sport", match.sport],
                ["Date", formatMatchDate(match.date)],
                ["Time", `${match.time} IST`],
                ["Venue", match.venue],
                ["Status", match.status],
                [
                  "Available Seats",
                  match.seatTiers.reduce((sum, t) => sum + t.available, 0).toLocaleString("en-IN"),
                ],
                [
                  "Starting From",
                  `₹${Math.min(...match.seatTiers.map((t) => t.price)).toLocaleString("en-IN")}`,
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-right font-semibold text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            {match.status === "Upcoming" ? (
              <Link
                to="/book/$matchId"
                params={{ matchId: match.id }}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-premium transition-all duration-300 hover:bg-secondary"
              >
                <Ticket className="h-5 w-5" /> Book Ticket
              </Link>
            ) : (
              <p className="mt-6 rounded-xl bg-muted p-4 text-center text-sm font-semibold text-muted-foreground">
                Ticket sales are closed for this match.
              </p>
            )}
          </aside>
        </div>

        {/* More matches */}
        {others.length > 0 && (
          <div className="mt-20">
            <SectionHeading align="left" eyebrow="Keep Exploring" title="More Upcoming Matches" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
