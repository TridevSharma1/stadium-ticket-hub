import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { DEFAULT_IMAGE, ImageSelect, VENUE_IMAGES, EmptyRow } from "@/components/admin-bits";
import { Button, Card, Field, Input, Modal } from "@/components/ui";
import { newId, useGallery } from "@/context/SiteContext";
import type { GalleryImage } from "@/lib/types";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const [gallery, updateGallery] = useGallery();
  const [draft, setDraft] = useState<GalleryImage | null>(null);
  const [isNew, setIsNew] = useState(false);

  const save = () => {
    if (!draft) return;
    updateGallery((prev) => (isNew ? [...prev, draft] : prev.map((g) => (g.id === draft.id ? draft : g))));
    setDraft(null);
  };

  const remove = (id: string) => {
    if (!window.confirm("Remove this image from the gallery?")) return;
    updateGallery((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl tracking-wide">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage the photos shown on the public gallery page.</p>
        </div>
        <Button
          onClick={() => {
            setDraft({ id: newId("g"), title: "", image: DEFAULT_IMAGE });
            setIsNew(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add Image
        </Button>
      </div>

      {gallery.length === 0 ? (
        <EmptyRow message="The gallery is empty — add your first photo." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <Card key={g.id} className="overflow-hidden p-0">
              <img src={g.image} alt={g.title} loading="lazy" className="h-44 w-full object-cover" />
              <div className="flex items-center justify-between gap-3 p-4">
                <p className="min-w-0 truncate font-semibold">{g.title}</p>
                <div className="flex shrink-0 gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Edit ${g.title}`}
                    onClick={() => {
                      setDraft(structuredClone(g));
                      setIsNew(false);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" aria-label={`Delete ${g.title}`} onClick={() => remove(g.id)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!draft} onClose={() => setDraft(null)} title={isNew ? "Add Image" : "Edit Image"}>
        {draft && (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <Field label="Title">
              <Input required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Match Night Atmosphere" />
            </Field>
            <Field label="Image">
              <ImageSelect value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
            </Field>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">{isNew ? "Add Image" : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
