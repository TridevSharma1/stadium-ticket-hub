import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { EmptyRow } from "@/components/admin-bits";
import { Button, Card, Field, Input, Modal, Textarea } from "@/components/ui";
import { newId, useTestimonials } from "@/context/SiteContext";
import type { Testimonial } from "@/lib/types";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const [testimonials, updateTestimonials] = useTestimonials();
  const [draft, setDraft] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  const save = () => {
    if (!draft) return;
    updateTestimonials((prev) => (isNew ? [...prev, draft] : prev.map((t) => (t.id === draft.id ? draft : t))));
    setDraft(null);
  };

  const remove = (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
    updateTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl tracking-wide">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">Customer reviews shown on the home page.</p>
        </div>
        <Button
          onClick={() => {
            setDraft({ id: newId("t"), name: "", role: "", rating: 5, review: "" });
            setIsNew(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add Review
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <EmptyRow message="No testimonials yet — add the first review." />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                  ))}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">"{t.review}"</p>
              <div className="mt-4 flex justify-end gap-1.5 border-t border-border pt-3">
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label={`Edit review by ${t.name}`}
                  onClick={() => {
                    setDraft(structuredClone(t));
                    setIsNew(false);
                  }}
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Button>
                <Button size="sm" variant="ghost" aria-label={`Delete review by ${t.name}`} onClick={() => remove(t.id)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!draft} onClose={() => setDraft(null)} title={isNew ? "Add Review" : "Edit Review"} wide>
        {draft && (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Customer name">
                <Input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </Field>
              <Field label="Role / tagline">
                <Input required value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Season ticket holder" />
              </Field>
              <Field label="Rating">
                <select
                  value={draft.rating}
                  onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
                  className="h-11 w-full cursor-pointer rounded-xl border border-input bg-card px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {"★".repeat(r)} ({r}/5)
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Review">
              <Textarea required value={draft.review} onChange={(e) => setDraft({ ...draft, review: e.target.value })} />
            </Field>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">{isNew ? "Add Review" : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
