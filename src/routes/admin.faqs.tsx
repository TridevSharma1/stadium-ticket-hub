import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { EmptyRow } from "@/components/admin-bits";
import { Button, Card, Field, Input, Modal, Textarea } from "@/components/ui";
import { newId, useFaqs } from "@/context/SiteContext";
import type { Faq } from "@/lib/types";

export const Route = createFileRoute("/admin/faqs")({
  component: AdminFaqs,
});

function AdminFaqs() {
  const [faqs, updateFaqs] = useFaqs();
  const [draft, setDraft] = useState<Faq | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const save = () => {
    if (!draft) return;
    updateFaqs((prev) => (isNew ? [...prev, draft] : prev.map((f) => (f.id === draft.id ? draft : f))));
    setDraft(null);
  };

  const remove = (id: string) => {
    if (!window.confirm("Delete this FAQ?")) return;
    updateFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl tracking-wide">FAQ</h1>
          <p className="mt-1 text-sm text-muted-foreground">Questions and answers shown on the home page.</p>
        </div>
        <Button
          onClick={() => {
            setDraft({ id: newId("f"), question: "", answer: "" });
            setIsNew(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </Button>
      </div>

      {faqs.length === 0 ? (
        <EmptyRow message="No FAQs yet — add the first question." />
      ) : (
        <div className="grid gap-3">
          {faqs.map((f, i) => (
            <Card key={f.id} className="overflow-hidden p-0">
              <button
                onClick={() => setOpenId(openId === f.id ? null : f.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left"
                aria-expanded={openId === f.id}
              >
                <span className="text-sm font-bold sm:text-base">
                  <span className="mr-2 text-muted-foreground">{String(i + 1).padStart(2, "0")}.</span>
                  {f.question}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openId === f.id ? "rotate-180" : ""}`} />
              </button>
              {openId === f.id && (
                <div className="border-t border-border px-5 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                  <div className="mt-3 flex justify-end gap-1.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setDraft(structuredClone(f));
                        setIsNew(false);
                      }}
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(f.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!draft} onClose={() => setDraft(null)} title={isNew ? "Add FAQ" : "Edit FAQ"} wide>
        {draft && (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <Field label="Question">
              <Input required value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} />
            </Field>
            <Field label="Answer">
              <Textarea required value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} />
            </Field>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">{isNew ? "Add FAQ" : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
