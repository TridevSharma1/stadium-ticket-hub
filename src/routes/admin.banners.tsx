import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { DEFAULT_IMAGE, ImageSelect, VENUE_IMAGES, EmptyRow } from "@/components/admin-bits";
import { Badge, Button, Card, Field, Input, Modal } from "@/components/ui";
import { newId, useBanner } from "@/context/SiteContext";
import type { Banner } from "@/lib/types";

export const Route = createFileRoute("/admin/banners")({
  component: AdminBanners,
});

function AdminBanners() {
  const [banners, updateBanners] = useBanner();
  const [draft, setDraft] = useState<Banner | null>(null);
  const [isNew, setIsNew] = useState(false);

  const save = () => {
    if (!draft) return;
    updateBanners((prev) => {
      // Only one banner can be active at a time.
      const saved = draft.active ? prev.map((b) => ({ ...b, active: false })) : prev;
      return isNew ? [...saved, draft] : saved.map((b) => (b.id === draft.id ? draft : b));
    });
    setDraft(null);
  };

  const activate = (id: string) =>
    updateBanners((prev) => prev.map((b) => ({ ...b, active: b.id === id })));

  const remove = (id: string) => {
    if (!window.confirm("Delete this banner?")) return;
    updateBanners((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl tracking-wide">Hero Banners</h1>
          <p className="mt-1 text-sm text-muted-foreground">The headline banner shown at the top of the home page.</p>
        </div>
        <Button
          onClick={() => {
            setDraft({
              id: newId("banner"),
              title: "",
              subtitle: "",
              buttonText: "Book Tickets",
              image: DEFAULT_IMAGE,
              active: banners.length === 0,
            });
            setIsNew(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add Banner
        </Button>
      </div>

      {banners.length === 0 ? (
        <EmptyRow message="No banners yet — add one to control the home page hero." />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {banners.map((b) => (
            <Card key={b.id} className="overflow-hidden p-0">
              <div className="relative">
                <img src={b.image} alt="" className="h-40 w-full object-cover" />
                <div className="absolute inset-0 hero-gradient" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-2xl tracking-wide text-white">{b.title}</p>
                  <p className="text-sm text-white/80">{b.subtitle}</p>
                </div>
                {b.active && <Badge variant="gold" className="absolute right-3 top-3">Active on site</Badge>}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-4">
                <p className="text-xs text-muted-foreground">Button text: "{b.buttonText}"</p>
                <div className="flex gap-1.5">
                  {!b.active && (
                    <Button size="sm" variant="ghost" onClick={() => activate(b.id)}>
                      Set active
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Edit banner "${b.title}"`}
                    onClick={() => {
                      setDraft(structuredClone(b));
                      setIsNew(false);
                    }}
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </Button>
                  <Button size="sm" variant="ghost" aria-label={`Delete banner "${b.title}"`} onClick={() => remove(b.id)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!draft} onClose={() => setDraft(null)} title={isNew ? "Add Banner" : "Edit Banner"} wide>
        {draft && (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <Field label="Title">
              <Input required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Experience the Thrill of Live Cricket & Football" />
            </Field>
            <Field label="Subtitle">
              <Input required value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} placeholder="Book tickets instantly for exciting matches at XYZ Stadium." />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Button text">
                <Input required value={draft.buttonText} onChange={(e) => setDraft({ ...draft, buttonText: e.target.value })} />
              </Field>
              <label className="flex items-end gap-2 pb-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
                  className="h-4 w-4 accent-[#0B3D91]"
                />
                Show on the website
              </label>
            </div>
            <Field label="Background image">
              <ImageSelect value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
            </Field>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">{isNew ? "Add Banner" : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
