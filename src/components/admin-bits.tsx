import { Card } from "@/components/ui";

/** Known venue photos admins can pick from; custom URLs also supported. */
export const VENUE_IMAGES = [
  "/images/hero-stadium.jpg",
  "/images/match-cricket.jpg",
  "/images/football-pitch.jpg",
  "/images/gallery-crowd.jpg",
  "/images/gallery-night.jpg",
  "/images/gallery-vip.jpg",
  "/images/gallery-players.jpg",
];

export function ImageSelect({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (url: string) => void;
  id?: string;
}) {
  return (
    <div className="grid gap-3">
      <select
        id={id}
        value={VENUE_IMAGES.includes(value) ? value : "custom"}
        onChange={(e) => e.target.value !== "custom" && onChange(e.target.value)}
        className="h-11 w-full cursor-pointer rounded-xl border border-input bg-card px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {VENUE_IMAGES.map((img) => (
          <option key={img} value={img}>
            {img.replace("/images/", "").replace(".jpg", "")}
          </option>
        ))}
        <option value="custom">Custom URL…</option>
      </select>
      {!VENUE_IMAGES.includes(value) && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or /images/photo.jpg"
          className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      )}
      {value ? (
        <img src={value} alt="Selected preview" className="h-36 w-full rounded-xl object-cover" />
      ) : null}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </span>
      </div>
      <p className="mt-3 font-display text-4xl tracking-wide text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}

export function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground">
          {value} · {pct}%
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function EmptyRow({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
