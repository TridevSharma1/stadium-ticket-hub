import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Building2,
  Target,
  Flag,
  Medal,
  ParkingSquare,
  Percent,
  Trophy,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import { Card, PageHeader, SectionHeading } from "@/components/ui";
import { useSite } from "@/context/SiteContext";

export const Route = createFileRoute("/_site/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About XYZ Stadium | Pune's Premier Sports Arena" },
      {
        name: "description",
        content:
          "Learn about XYZ Stadium, Pune — our mission, history, 68,000-seat arena, world-class facilities and the cricket and football legacy we've built.",
      },
      { property: "og:title", content: "About XYZ Stadium" },
      {
        property: "og:description",
        content: "Pune's premier sports arena — mission, history, facilities and achievements.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const MILESTONES = [
  { year: "2010", title: "Ground broken in Shivajinagar", text: "Construction begins on a 68,000-seat multi-purpose arena in the heart of Pune." },
  { year: "2014", title: "Inaugural season", text: "XYZ Stadium opens with its first international cricket fixture and a record sell-out crowd." },
  { year: "2018", title: "Football arrives", text: "The arena hosts its first ISL football season and unveils the dedicated football pitch conversion system." },
  { year: "2022", title: "VIP hospitality wing", text: "A 92-box VIP lounge and hospitality wing opens, redefining premium matchday experiences." },
  { year: "2026", title: "Digital ticketing era", text: "Instant online booking, digital passes and smart gates make XYZ Stadium one of India's most modern venues." },
];

const ACHIEVEMENTS = [
  { icon: Trophy, value: "120+", label: "International matches hosted" },
  { icon: Flag, value: "8", label: "IPL / ISL seasons" },
  { icon: Medal, value: "4M+", label: "Fans welcomed" },
  { icon: Percent, value: "98%", label: "Average seat occupancy" },
];

const FACILITIES = [
  { icon: Building2, title: "Four grandstands", text: "68,000 covered seats with clear pitch views from every angle." },
  { icon: Wifi, title: "Stadium-wide Wi-Fi", text: "High-density free Wi-Fi and a live matchday app with replays and seat-finding." },
  { icon: UtensilsCrossed, title: "40+ food counters", text: "From Mumbai street food to international cuisine across every concourse." },
  { icon: ParkingSquare, title: "4,000 parking bays", text: "Four parking lots with reserved bays for Premium and VIP ticket holders." },
];

function AboutPage() {
  const { data } = useSite();
  const cricketCount = data.matches.filter((m) => m.sport === "Cricket").length;
  const footballCount = data.matches.filter((m) => m.sport === "Football").length;

  return (
    <>
      <PageHeader
        title="About XYZ Stadium"
        subtitle="Pune's home of live cricket and football since 2014."
      />

      {/* Mission & vision */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8">
            <h2 className="font-display text-3xl tracking-wide text-primary">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              To give every fan in Maharashtra an electric, safe and affordable place to watch live sport —
              with ticketing so simple that the only thing you think about on matchday is the match.
            </p>
          </Card>
          <Card className="p-8">
            <h2 className="font-display text-3xl tracking-wide text-secondary">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              To be India's most-loved multi-purpose stadium — where world-class cricket and football, premium
              hospitality and family-friendly pricing meet in one unforgettable arena.
            </p>
          </Card>
        </div>
      </section>

      {/* History timeline */}
      <section className="bg-stadium-dark py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="font-display text-4xl tracking-wide text-center">Our Story</h2>
          <ol className="mt-12 space-y-10 border-l-2 border-white/20 pl-8">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-accent" />
                <p className="font-display text-2xl tracking-wider text-accent">{m.year}</p>
                <h3 className="mt-1 text-lg font-bold">{m.title}</h3>
                <p className="mt-1 text-sm text-white/70">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="By the numbers" title="Achievements" />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a) => (
            <Card key={a.label} className="p-6 text-center">
              <a.icon className="mx-auto h-8 w-8 text-secondary" />
              <p className="mt-3 font-display text-4xl tracking-wide text-primary">{a.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Capacity & sports */}
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center bg-primary p-10 text-center text-primary-foreground">
            <p className="font-display text-6xl tracking-wide">68,000</p>
            <p className="mt-2 text-sm text-primary-foreground/80">Total stadium capacity</p>
          </Card>
          <Card className="p-8">
            <Target className="h-8 w-8 text-secondary" />
            <h3 className="mt-3 font-display text-2xl tracking-wide">Cricket</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {cricketCount} fixtures currently listed — internationals, IPL blockbusters and domestic
              showdowns under lights.
            </p>
          </Card>
          <Card className="p-8">
            <Award className="h-8 w-8 text-secondary" />
            <h3 className="mt-3 font-display text-2xl tracking-wide">Football</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {footballCount} fixtures currently listed — ISL club clashes and international qualifiers on a
              full-size FIFA-spec pitch.
            </p>
          </Card>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Built for fans" title="World-class facilities" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map((f) => (
              <Card key={f.title} className="p-6">
                <f.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-3 font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/matches"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-9 text-base font-semibold text-primary-foreground shadow-premium transition-colors hover:bg-secondary"
            >
              <Trophy className="h-5 w-5" /> Explore upcoming matches
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
