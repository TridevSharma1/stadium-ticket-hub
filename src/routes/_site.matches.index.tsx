import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarRange, Search, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import { MatchCard } from "@/components/MatchCard";
import { Button, Input, Select } from "@/components/ui";
import { useSite } from "@/context/SiteContext";
import type { Sport } from "@/lib/types";

// Filter/sort state lives in the URL so navbar search and category links work.
type MatchesSearch = {
  q?: string | undefined;
  sport?: (Sport | "All") | undefined;
  date?: ("All" | "This Week" | "This Month") | undefined;
  sort?: ("date" | "price-asc" | "price-desc" | "newest") | undefined;
};

export const Route = createFileRoute("/_site/matches/")({
  validateSearch: (search: Record<string, unknown>): MatchesSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    sport: (search["sport"] as MatchesSearch["sport"]) ?? "All",
    date: (search["date"] as MatchesSearch["date"]) ?? "All",
    sort: (search["sort"] as MatchesSearch["sort"]) ?? "date",
  }),
  component: MatchesPage,
  head: () => ({
    meta: [
      { title: "Browse Cricket & Football Matches | XYZ Stadium" },
      {
        name: "description",
        content:
          "Browse all upcoming cricket and football matches at XYZ Stadium, Pune. Search, filter by sport or date, sort by price and book tickets online.",
      },
      { property: "og:title", content: "Browse Matches | XYZ Stadium" },
      {
        property: "og:description",
        content: "All upcoming cricket and football fixtures at XYZ Stadium, Pune — filter, sort and book instantly.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function MatchesPage() {
  const { data } = useSite();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const inWeek = (iso: string, offsetDays: number) =>
    Math.abs(new Date(`${iso}T00:00:00`).getTime() - Date.now()) <= offsetDays * 86400000;

  const matches = useMemo(() => {
    const q = (search.q ?? "").toLowerCase();
    let list = data.matches.filter((m) => {
      const text = `${m.teamA} ${m.teamB} ${m.sport} ${m.venue}`.toLowerCase();
      if (q && !text.includes(q)) return false;
      if (search.sport && search.sport !== "All" && m.sport !== search.sport) return false;
      if (search.date === "This Week" && !inWeek(m.date, 7)) return false;
      if (search.date === "This Month" && !inWeek(m.date, 31)) return false;
      return true;
    });
    const minPrice = (m: (typeof list)[number]) => Math.min(...m.seatTiers.map((t) => t.price));
    switch (search.sort) {
      case "price-asc":
        list = [...list].sort((a, b) => minPrice(a) - minPrice(b));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => minPrice(b) - minPrice(a));
        break;
      case "newest":
        list = [...list].sort((a, b) => b.date.localeCompare(a.date));
        break;
      default:
        list = [...list].sort((a, b) => a.date.localeCompare(b.date));
    }
    return list;
  }, [data.matches, search]);

  const setParam = (patch: Partial<MatchesSearch>) =>
    navigate({ to: "/matches", search: { ...search, ...patch } });

  return (
    <>
      <section className="bg-stadium-dark py-14 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-display text-5xl tracking-wide md:text-6xl">All Matches</h1>
          <p className="mt-3 text-white/80">
            Every fixture at XYZ Stadium — search, filter and book your seats in minutes.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-18 z-30 border-b border-border bg-background/95 py-4 backdrop-blur">
        <form
          className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row lg:px-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search.q ?? ""}
              onChange={(e) => setParam({ q: e.target.value })}
              placeholder="Search teams, venues…"
              aria-label="Search matches"
              className="pl-10"
            />
          </div>
          <Select
            value={search.sport ?? "All"}
            onChange={(e) => setParam({ sport: e.target.value as MatchesSearch["sport"] })}
            aria-label="Filter by sport"
            className="sm:w-40"
          >
            <option value="All">All Sports</option>
            <option value="Cricket">Cricket</option>
            <option value="Football">Football</option>
          </Select>
          <Select
            value={search.date ?? "All"}
            onChange={(e) => setParam({ date: e.target.value as MatchesSearch["date"] })}
            aria-label="Filter by date"
            className="sm:w-44"
          >
            <option value="All">Any Date</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </Select>
          <Select
            value={search.sort ?? "date"}
            onChange={(e) => setParam({ sort: e.target.value as MatchesSearch["sort"] })}
            aria-label="Sort matches"
            className="sm:w-48"
          >
            <option value="date">Sort: Date</option>
            <option value="price-asc">Sort: Price (Low → High)</option>
            <option value="price-desc">Sort: Price (High → Low)</option>
            <option value="newest">Sort: Newest</option>
          </Select>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarRange className="h-4 w-4 text-secondary" />
          {matches.length} {matches.length === 1 ? "match" : "matches"} found
        </p>
        {matches.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center">
            <SlidersHorizontal className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-bold">No matches found</h2>
            <p className="mt-1 text-sm text-muted-foreground">Try clearing the filters or searching for another team.</p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => navigate({ to: "/matches", search: { sport: "All", date: "All", sort: "date" } })}
            >
              Clear filters
            </Button>
          </div>
        )}
        <div className="mt-10 text-center">
          <Link to="/tickets" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Compare seat categories & pricing →
          </Link>
        </div>
      </section>
    </>
  );
}
