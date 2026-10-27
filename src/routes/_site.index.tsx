import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Armchair,
  BadgeIndianRupee,
  ChevronRight,
  Headset,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { MatchCard, formatMatchDate } from "@/components/MatchCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Newsletter } from "@/components/Newsletter";
import { Button, SectionHeading, Badge } from "@/components/ui";
import { useSite } from "@/context/SiteContext";


export const Route = createFileRoute("/_site/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "XYZ Stadium | Book Cricket & Football Tickets Online in Pune" },
      {
        name: "description",
        content:
          "Experience live cricket and football at XYZ Stadium, Pune. Book tickets instantly — VIP, Premium, Standard and Economy seats with secure booking and instant confirmation.",
      },
      { property: "og:title", content: "XYZ Stadium | Cricket & Football Ticket Booking" },
      {
        property: "og:description",
        content: "Book tickets instantly for exciting cricket and football matches at XYZ Stadium, Pune.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const WHY_CHOOSE = [
  { icon: ShieldCheck, title: "Secure Booking", text: "Every booking is protected and confirmed against the official stadium inventory." },
  { icon: Zap, title: "Instant Confirmation", text: "Your tickets are confirmed the moment you book — no waiting, no uncertainty." },
  { icon: BadgeIndianRupee, title: "Affordable Tickets", text: "Prices for every fan, from family-friendly Economy seats to premium hospitality." },
  { icon: Armchair, title: "Premium Seating", text: "World-class seating tiers with excellent pitch views from every stand." },
  { icon: RotateCcw, title: "Easy Refund Policy", text: "Plans changed? Refund your tickets up to 48 hours before the match." },
  { icon: Headset, title: "Fast Support", text: "Our matchday support team answers within minutes on phone, email and WhatsApp." },
];

function HomePage() {
  const { data } = useSite();
  const banner = data.banner.find((b) => b.active) ?? data.banner[0];
  const featured = data.matches.filter((m) => m.featured && m.status === "Upcoming").slice(0, 3);
  const upcoming = data.matches
    .filter((m) => m.status === "Upcoming")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
  const gallery = data.gallery.slice(0, 6);
  const cricketCount = data.matches.filter((m) => m.sport === "Cricket" && m.status === "Upcoming").length;
  const footballCount = data.matches.filter((m) => m.sport === "Football" && m.status === "Upcoming").length;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden">
        <img
          src={banner?.image ?? "/images/hero-stadium.jpg"}
          alt="XYZ Stadium under floodlights on match night"
          className="absolute inset-0 h-full w-full object-cover"
          width={1024}
          height={1024}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="gold" className="glass mb-5 border-white/30 text-white">
              <Trophy className="h-3.5 w-3.5" /> Pune's Premier Sports Arena
            </Badge>
            <h1 className="font-display text-5xl leading-[1.05] tracking-wide text-white sm:text-6xl lg:text-7xl">
              {banner?.title ?? "Experience the Thrill of Live Cricket & Football"}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              {banner?.subtitle ?? "Book tickets instantly for exciting matches at XYZ Stadium."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => (window.location.href = "/matches")}>
                {banner?.buttonText ?? "Book Tickets"}
              </Button>
              <Link
                to="/matches"
                className="inline-flex h-13 items-center justify-center rounded-full border-2 border-white/70 px-9 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary"
              >
                View Matches
              </Link>
            </div>
            {/* Match highlight stats strip */}
            <dl className="mt-10 flex flex-wrap gap-8 text-white">
              {[
                { label: "Stadium Capacity", value: "52,000+" },
                { label: "Upcoming Matches", value: upcoming.length },
                { label: "Sports Hosted", value: "Cricket & Football" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{s.label}</dt>
                  <dd className="mt-1 font-display text-2xl tracking-wide">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Featured matches */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Featured Fixtures"
          title="Matches You Can't Miss"
          subtitle="The biggest fixtures at XYZ Stadium — grab your seats before they sell out."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" onClick={() => (window.location.href = "/matches")}>
            View All Matches <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Sports categories */}
      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Sports" title="Pick Your Game" subtitle="World-class cricket and electric football nights, all under one roof." />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { sport: "Cricket" as const, image: "/images/match-cricket.jpg", count: cricketCount, blurb: "International fixtures, T20 blockbusters and domestic giants under the lights." },
              { sport: "Football" as const, image: "/images/football-pitch.jpg", count: footballCount, blurb: "ISL clashes, international friendlies and cup finals on a pristine turf." },
            ].map((c) => (
              <Link
                key={c.sport}
                to="/matches"
                search={{ sport: c.sport }}
                className="group relative block overflow-hidden rounded-3xl shadow-premium"
              >
                <img
                  src={c.image}
                  alt={`${c.sport} at XYZ Stadium`}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stadium-dark/90 via-stadium-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{c.count} upcoming matches</p>
                  <h3 className="mt-1 font-display text-4xl tracking-wide text-white">{c.sport}</h3>
                  <p className="mt-1 max-w-sm text-sm text-white/80">{c.blurb}</p>
                </div>
                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-accent group-hover:text-stadium-dark">
                  <ChevronRight className="h-5 w-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeading eyebrow="Why XYZ Stadium" title="Built For The Best Matchday" subtitle="From booking to the final whistle, everything is designed around the fan." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-premium"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Upcoming events timeline */}
      <section className="bg-stadium-dark py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeading light eyebrow="Mark The Calendar" title="Upcoming Events" subtitle="Your season at a glance — every home fixture at XYZ Stadium." />
          <ol className="relative space-y-8 border-l-2 border-white/15 pl-8">
            {upcoming.map((m) => (
              <li key={m.id} className="relative">
                <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-stadium-dark" />
                <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:bg-white/15">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {formatMatchDate(m.date)} · {m.time} IST
                      </p>
                      <h3 className="mt-1 font-display text-2xl tracking-wide">
                        {m.teamA} <span className="text-accent">vs</span> {m.teamB}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                        <MapPin className="h-4 w-4" /> {m.venue}
                      </p>
                    </div>
                    <Link
                      to="/matches/$id"
                      params={{ id: m.id }}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-stadium-dark transition-all duration-300 hover:brightness-110"
                    >
                      View Match <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeading eyebrow="Stadium Gallery" title="Feel The Atmosphere" subtitle="Lights, roar and unforgettable nights at XYZ Stadium." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((img, i) => (
            <figure
              key={img.id}
              className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={img.image}
                alt={img.title}
                loading="lazy"
                width={1024}
                height={1024}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "h-full min-h-64" : "h-44 md:h-52"}`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stadium-dark/85 to-transparent p-4 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {img.title}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" onClick={() => (window.location.href = "/gallery")}>
            Explore Full Gallery <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Fan Stories" title="What Our Fans Say" subtitle="Thousands of fans book with XYZ Stadium every season." />
          <div className="grid gap-6 md:grid-cols-3">
            {data.testimonials.slice(0, 3).map((t) => (
              <article
                key={t.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium"
              >
                <div className="flex gap-1" aria-label={`Rated ${t.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`}
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">"{t.review}"</p>
                <footer className="mt-5 border-t border-border pt-4">
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeading eyebrow="Good To Know" title="Frequently Asked Questions" subtitle="Everything you need before booking your seats." />
        <FaqAccordion />
      </section>

      <Newsletter />
    </>
  );
}

