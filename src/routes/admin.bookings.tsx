import { createFileRoute } from "@tanstack/react-router";
import { Check, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyRow } from "@/components/admin-bits";
import { Badge, Button, Card, Select } from "@/components/ui";
import { useBookings } from "@/context/SiteContext";
import type { BookingStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/bookings")({
  component: AdminBookings,
});

const STATUSES: (BookingStatus | "All")[] = ["All", "Pending", "Approved", "Rejected"];

function AdminBookings() {
  const [bookings, updateBookings] = useBookings();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BookingStatus | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (status !== "All" && b.status !== status) return false;
      if (!q) return true;
      return `${b.name} ${b.email} ${b.matchName} ${b.category}`.toLowerCase().includes(q);
    });
  }, [bookings, query, status]);

  const setStatusFor = (id: string, next: BookingStatus) =>
    updateBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: next } : b)));

  const remove = (id: string) => {
    if (!window.confirm("Delete this booking permanently?")) return;
    updateBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-4xl tracking-wide">Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review, approve or reject ticket bookings.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, match or category…"
            aria-label="Search bookings"
            className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as BookingStatus | "All")}
          aria-label="Filter bookings by status"
          className="sm:w-44"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyRow message={bookings.length === 0 ? "No bookings yet — bookings made on the site appear here." : "No bookings match your search."} />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Fan</th>
                <th className="px-4 py-3">Match</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Tickets</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{b.matchName}</td>
                  <td className="px-4 py-3">{b.category}</td>
                  <td className="px-4 py-3">{b.tickets}</td>
                  <td className="px-4 py-3 font-semibold text-primary">₹{b.total.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.payment}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={b.status === "Approved" ? "success" : b.status === "Rejected" ? "danger" : "warning"}
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Button size="sm" variant="ghost" onClick={() => setStatusFor(b.id, "Approved")} aria-label={`Approve booking for ${b.name}`} className="text-secondary hover:bg-secondary/10">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setStatusFor(b.id, "Rejected")} aria-label={`Reject booking for ${b.name}`} className="text-destructive hover:bg-destructive/10">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => remove(b.id)} aria-label={`Delete booking for ${b.name}`} className="text-muted-foreground hover:bg-muted">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
