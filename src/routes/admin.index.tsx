import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, IndianRupee, Ticket, Users } from "lucide-react";
import { formatMatchDate } from "@/components/MatchCard";
import { EmptyRow, ProgressBar, StatCard } from "@/components/admin-bits";
import { Badge, Card } from "@/components/ui";
import { useSite } from "@/context/SiteContext";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data } = useSite();

  const upcoming = data.matches
    .filter((m) => m.status === "Upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const bookings = data.bookings;
  const revenue = bookings.filter((b) => b.status !== "Rejected").reduce((sum, b) => sum + b.total, 0);
  const pending = bookings.filter((b) => b.status === "Pending").length;
  const approved = bookings.filter((b) => b.status === "Approved").length;
  const rejected = bookings.filter((b) => b.status === "Rejected").length;
  const visitors = 12480 + bookings.length * 35 + data.subscribers.length * 12;

  const byCategory = ["VIP", "Premium", "Standard", "Economy"].map((cat) => ({
    cat,
    count: bookings.filter((b) => b.category === cat).length,
  }));
  const cricket = data.matches.filter((m) => m.sport === "Cricket").length;
  const football = data.matches.length - cricket;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-4xl tracking-wide text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of XYZ Stadium's ticketing activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarDays} label="Total Matches" value={String(data.matches.length)} hint={`${upcoming.length} upcoming`} />
        <StatCard icon={Ticket} label="Total Bookings" value={String(bookings.length)} hint={`${pending} awaiting approval`} />
        <StatCard
          icon={IndianRupee}
          label="Revenue"
          value={`₹${revenue.toLocaleString("en-IN")}`}
          hint="Approved + pending bookings"
        />
        <StatCard icon={Users} label="Visitors" value={visitors.toLocaleString("en-IN")} hint="This season" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-2xl tracking-wide">Bookings by status</h2>
          <div className="mt-5 grid gap-4">
            <ProgressBar label="Approved" value={approved} max={bookings.length} color="#16A34A" />
            <ProgressBar label="Pending" value={pending} max={bookings.length} color="#F59E0B" />
            <ProgressBar label="Rejected" value={rejected} max={bookings.length} color="#DC2626" />
          </div>
          <h2 className="mt-8 font-display text-2xl tracking-wide">Seat categories sold</h2>
          <div className="mt-5 grid gap-4">
            {byCategory.map((c) => (
              <ProgressBar
                key={c.cat}
                label={c.cat}
                value={c.count}
                max={bookings.length}
                color="#0B3D91"
              />
            ))}
          </div>
        </Card>

        <div className="grid content-start gap-6">
          <Card className="p-6">
            <h2 className="font-display text-2xl tracking-wide">Matches by sport</h2>
            <div className="mt-5 grid gap-4">
              <ProgressBar label="Cricket" value={cricket} max={data.matches.length} color="#F59E0B" />
              <ProgressBar label="Football" value={football} max={data.matches.length} color="#16A34A" />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-2xl tracking-wide">Upcoming matches</h2>
            {upcoming.length === 0 ? (
              <div className="mt-4">
                <EmptyRow message="No upcoming matches scheduled." />
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {upcoming.slice(0, 5).map((m) => (
                  <li key={m.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {m.teamA} <span className="text-accent">vs</span> {m.teamB}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatMatchDate(m.date)} · {m.time} IST
                      </p>
                    </div>
                    <Badge variant={m.sport === "Cricket" ? "warning" : "success"}>{m.sport}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
