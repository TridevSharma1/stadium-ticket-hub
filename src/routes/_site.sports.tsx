import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { useSite } from "@/context/SiteContext";

export const Route = createFileRoute("/_site/sports")({
  component: SportsPage,
  head: () => ({
    meta: [
      { title: "Sports at XYZ Stadium | Cricket & Football" },
      {
        name: "description",
        content:
          "XYZ Stadium hosts world-class cricket and football in Pune. Explore each sport, upcoming fixtures and the world-class facilities behind every match.",
      },
      { property: "og:title", content: "Sports at XYZ Stadium" },
      { property: "og:description", content: "World-class cricket and football, all under one roof in Pune." },
      { property: "og:type", content: "website" },
    ],
  }),
});

const SPORTS = [
  {
    name: "Cricket",
    image: "/images/match-cricket.jpg",
    blurb:
      "From high-voltage international T20s to Ranji Trophy classics, XYZ Stadium's drop-in pitches and 52,000 seats make every cricket night unforgettable.",
    highlights: ["Floodlit day-night ODIs & T20s", "BCCI-standard drop-in pitch", "Six huge replay screens"],
  },
  {
    name: "Football",
    image: "/images/football-pitch.jpg",
    blurb:
      "ISL blockbusters, international friendlies and cup finals on hybrid turf engineered for fast, beautiful football — with acoustics that shake the stands.",
    highlights: ["FIFA-standard hybrid grass turf", "Active stands 20m from touchlines", "Dedicated away-fan sections"],
  },
] as const;

function SportsPage() {
  const { data } = useSite();
  const counts = (sport: string) => data.matches.filter((m) => m.sport === sport && m.status === "Upcoming").length;

  return (
    <>
      <section className="bg-stadium-dark py-14 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-5xl tracking-wide md:text-6xl">Our Sports</h1>
          <p className="mt-3 text-white/80">Two games. One world-class arena. Thousands of unforgettable moments.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-16 lg:px-8">
        {SPORTS.map((s) => (
          <article key={s.name} className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-premium lg:grid-cols-2">
            <img
              src={s.image}
              alt={`${s.name} at XYZ Stadium`}
              loading="lazy"
              width={1280}
              height={800}
              className="h-64 w-full object-cover lg:h-full"
            />
            <div className="p-8 lg:p-12">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                <TrendingUp className="h-4 w-4" /> {counts(s.name)} upcoming matches
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-wide text-foreground lg:text-5xl">{s.name}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.blurb}</p>
              <ul className="mt-6 space-y-2 text-sm font-medium text-foreground">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" /> {h}
                  </li>
                ))}
              </ul>
              <Link
                to="/matches"
                search={{ sport: s.name }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-premium transition-all duration-300 hover:bg-secondary"
              >
                View {s.name} Matches <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-muted/60 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="More Than A Venue" title="Stadium Facilities" subtitle="Everything a matchday needs, for fans and players alike." />
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-6">
            {["52,000 Seats", "4,000 Parking Bays", "40+ Food Counters", "VIP Lounges", "Media Centre", "Free Matchday Shuttles"].map((f) => (
              <div key={f} className="rounded-2xl border border-border bg-card p-5 text-sm font-bold text-foreground shadow-sm">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
