import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ImageSelect, EmptyRow } from "@/components/admin-bits";
import { formatMatchDate } from "@/components/MatchCard";
import { Badge, Button, Card, Field, Input, Modal, Select } from "@/components/ui";
import { newId, useMatches } from "@/context/SiteContext";
import type { Match, Sport } from "@/lib/types";

export const Route = createFileRoute("/admin/matches")({
  component: AdminMatches,
});

const STATUSES: Match["status"][] = ["Upcoming", "Live", "Completed", "Cancelled"];

const blankMatch = (): Match => ({
  id: newId("m"),
  sport: "Cricket",
  teamA: "",
  teamB: "",
  date: new Date().toISOString().slice(0, 10),
  time: "7:00 PM",
  venue: "XYZ Stadium, Pune",
  image: "/images/match-cricket.jpg",
  status: "Upcoming",
  featured: false,
  seatTiers: [
    { name: "VIP", price: 5000, available: 480, perks: "Padded lounge seats, complimentary food & beverage, private entrance" },
    { name: "Premium", price: 3000, available: 840, perks: "Mid-tier seating, lounge access, dedicated food counters" },
    { name: "Standard", price: 1800, available: 1680, perks: "Excellent pitch views, in-seat concessions available" },
    { name: "Economy", price: 799, available: 1680, perks: "Great value seats with full stadium atmosphere" },
  ],
});

function AdminMatches() {
  const [matches, updateMatches] = useMatches();
  const [draft, setDraft] = useState<Match | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setDraft(blankMatch());
    setIsNew(true);
  };
  const openEdit = (m: Match) => {
    setDraft(structuredClone(m));
    setIsNew(false);
  };

  const save = () => {
    if (!draft) return;
    updateMatches((prev) => (isNew ? [...prev, draft] : prev.map((m) => (m.id === draft.id ? draft : m))));
    setDraft(null);
  };

  const remove = (id: string) => {
    if (!window.confirm("Delete this match? Existing bookings will keep their records.")) return;
    updateMatches((prev) => prev.filter((m) => m.id !== id));
  };

  const setTier = (name: Match["seatTiers"][number]["name"], key: "price" | "available", raw: string) => {
    if (!draft) return;
    const num = Math.max(0, Number(raw) || 0);
    setDraft({
      ...draft,
      seatTiers: draft.seatTiers.map((t) => (t.name === name ? { ...t, [key]: num } : t)),
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl tracking-wide">Matches</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add, edit or remove fixtures — changes appear on the site instantly.</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" /> Add Match
        </Button>
      </div>

      {matches.length === 0 ? (
        <EmptyRow message="No matches yet — add your first fixture." />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Match</th>
                <th className="px-4 py-3">Sport</th>
                <th className="px-4 py-3">Date & time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">From ₹</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {matches.map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={m.image} alt="" className="h-10 w-16 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold">
                          {m.teamA} <span className="text-accent">vs</span> {m.teamB}
                        </p>
                        <p className="text-xs text-muted-foreground">{m.venue}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={m.sport === "Cricket" ? "warning" : "success"}>{m.sport}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatMatchDate(m.date)}
                    <br />
                    {m.time} IST
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        m.status === "Upcoming" ? "success" : m.status === "Live" ? "warning" : m.status === "Cancelled" ? "danger" : "muted"
                      }
                    >
                      {m.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary">
                    ₹{Math.min(...m.seatTiers.map((t) => t.price)).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(m)} aria-label={`Edit ${m.teamA} vs ${m.teamB}`}>
                        <Pencil className="h-4 w-4" /> Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => remove(m.id)} aria-label={`Delete ${m.teamA} vs ${m.teamB}`}>
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

      <Modal open={!!draft} onClose={() => setDraft(null)} title={isNew ? "Add Match" : "Edit Match"} wide>
        {draft && (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Sport">
                <Select value={draft.sport} onChange={(e) => setDraft({ ...draft, sport: e.target.value as Sport })}>
                  <option>Cricket</option>
                  <option>Football</option>
                </Select>
              </Field>
              <Field label="Status">
                <Select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Match["status"] })}>
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Team A">
                <Input required value={draft.teamA} onChange={(e) => setDraft({ ...draft, teamA: e.target.value })} placeholder="India" />
              </Field>
              <Field label="Team B">
                <Input required value={draft.teamB} onChange={(e) => setDraft({ ...draft, teamB: e.target.value })} placeholder="Australia" />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Date">
                <Input type="date" required value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
              </Field>
              <Field label="Time">
                <Input required value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} placeholder="7:00 PM" />
              </Field>
              <Field label="Venue">
                <Input required value={draft.venue} onChange={(e) => setDraft({ ...draft, venue: e.target.value })} />
              </Field>
            </div>
            <Field label="Match image">
              <ImageSelect value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
            </Field>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                className="h-4 w-4 accent-[#0B3D91]"
              />
              Featured on the home page
            </label>

            <fieldset className="rounded-2xl border border-border p-4">
              <legend className="px-2 text-sm font-bold">Seat tiers</legend>
              <div className="grid gap-3">
                {draft.seatTiers.map((t) => (
                  <div key={t.name} className="grid grid-cols-[auto_1fr_1fr] items-center gap-3 text-sm">
                    <Badge variant={t.name === "VIP" ? "warning" : "default"} className="justify-center">
                      {t.name}
                    </Badge>
                    <Input
                      type="number"
                      min={0}
                      value={t.price}
                      onChange={(e) => setTier(t.name, "price", e.target.value)}
                      aria-label={`${t.name} price`}
                    />
                    <Input
                      type="number"
                      min={0}
                      value={t.available}
                      onChange={(e) => setTier(t.name, "available", e.target.value)}
                      aria-label={`${t.name} available seats`}
                    />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">Columns: price (₹) and available seats per tier.</p>
              </div>
            </fieldset>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">{isNew ? "Add Match" : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
