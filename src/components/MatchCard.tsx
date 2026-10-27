import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { Match } from "@/lib/types";

export function formatMatchDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statusVariant: Record<Match["status"], "success" | "warning" | "muted" | "danger"> = {
  Upcoming: "success",
  Live: "warning",
  Completed: "muted",
  Cancelled: "danger",
};

export function MatchCard({ match }: { match: Match }) {
  const minPrice = Math.min(...match.seatTiers.map((t) => t.price));

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium">
      <Link to="/matches/$id" params={{ id: match.id }} className="relative block overflow-hidden">
        <img
          src={match.image}
          alt={`${match.teamA} vs ${match.teamB} at ${match.venue}`}
          loading="lazy"
          width={1280}
          height={800}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stadium-dark/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="dark">{match.sport === "Cricket" ? "🏏 Cricket" : "⚽ Football"}</Badge>
        </div>
        <div className="absolute right-3 top-3">
          <Badge variant={statusVariant[match.status]}>{match.status}</Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to="/matches/$id" params={{ id: match.id }} className="transition-colors hover:text-primary">
          <h3 className="font-display text-2xl tracking-wide text-foreground">
            {match.teamA} <span className="text-accent">vs</span> {match.teamB}
          </h3>
        </Link>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-secondary" /> {formatMatchDate(match.date)}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" /> {match.time} IST
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" /> {match.venue}
          </li>
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            From <span className="text-lg font-bold text-primary">₹{minPrice.toLocaleString("en-IN")}</span>
          </p>
          {match.status === "Upcoming" ? (
            <Link
              to="/book/$matchId"
              params={{ matchId: match.id }}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
            >
              <Ticket className="h-4 w-4" /> Book Now
            </Link>
          ) : (
            <Button size="sm" variant="ghost" disabled>
              Sales closed
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
