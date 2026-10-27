import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Globe, RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Card, Field, Input, Textarea } from "@/components/ui";
import { useSite } from "@/context/SiteContext";
import type { SiteSettings } from "@/lib/types";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { data, setSettings, resetAll } = useSite();
  const [draft, setDraft] = useState<SiteSettings>(data.settings);
  const [saved, setSaved] = useState(false);

  // Re-sync the draft if another admin screen changes settings.
  useEffect(() => {
    setDraft(data.settings);
  }, [data.settings]);

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const setSocial = (key: keyof SiteSettings["social"], value: string) =>
    setDraft((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(draft);
    setSaved(true);
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-4xl tracking-wide">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Business information and website-wide options.</p>
      </div>

      <form className="grid gap-6 xl:grid-cols-2" onSubmit={save}>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-4.5 w-4.5 text-primary" />
            </span>
            <h2 className="font-display text-2xl tracking-wide">Contact information</h2>
          </div>
          <div className="mt-5 grid gap-4">
            <Field label="Business name">
              <Input required value={draft.siteName} onChange={(e) => set("siteName", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone">
                <Input required value={draft.phone} onChange={(e) => set("phone", e.target.value)} />
              </Field>
              <Field label="Email">
                <Input required type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
            </div>
            <Field label="Address">
              <Input required value={draft.address} onChange={(e) => set("address", e.target.value)} />
            </Field>
            <Field label="Working hours">
              <Input required value={draft.hours} onChange={(e) => set("hours", e.target.value)} />
            </Field>
            <Field label="Map image URL">
              <Input value={draft.mapImage} onChange={(e) => set("mapImage", e.target.value)} placeholder="/images/gallery-night.jpg" />
            </Field>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10">
              <Globe className="h-4.5 w-4.5 text-secondary" />
            </span>
            <h2 className="font-display text-2xl tracking-wide">Website settings</h2>
          </div>
          <div className="mt-5 grid gap-4">
            <Field label="Logo text">
              <Input required value={draft.logoText} onChange={(e) => set("logoText", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Theme color">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={draft.themeColor}
                    onChange={(e) => set("themeColor", e.target.value)}
                    aria-label="Theme color"
                    className="h-11 w-14 cursor-pointer rounded-xl border border-input bg-card p-1"
                  />
                  <Input value={draft.themeColor} onChange={(e) => set("themeColor", e.target.value)} />
                </div>
              </Field>
            </div>
            <Field label="Footer text">
              <Textarea value={draft.footerText} onChange={(e) => set("footerText", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Facebook URL">
                <Input value={draft.social.facebook} onChange={(e) => setSocial("facebook", e.target.value)} />
              </Field>
              <Field label="Instagram URL">
                <Input value={draft.social.instagram} onChange={(e) => setSocial("instagram", e.target.value)} />
              </Field>
              <Field label="Twitter / X URL">
                <Input value={draft.social.twitter} onChange={(e) => setSocial("twitter", e.target.value)} />
              </Field>
              <Field label="YouTube URL">
                <Input value={draft.social.youtube} onChange={(e) => setSocial("youtube", e.target.value)} />
              </Field>
            </div>
          </div>
        </Card>

        <div className="xl:col-span-2">
          <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <p className="font-bold">Danger zone</p>
              <p className="text-sm text-muted-foreground">Reset all site content back to the original mock data.</p>
            </div>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                if (!window.confirm("Reset ALL site content (matches, bookings, gallery, settings…) back to defaults?")) return;
                resetAll();
              }}
            >
              <RotateCcw className="h-4 w-4" /> Reset all data
            </Button>
          </Card>
        </div>

        <div className="flex items-center gap-4 xl:col-span-2">
          <Button type="submit" size="lg">
            <Save className="h-4 w-4" /> Save settings
          </Button>
          {saved && <span className="text-sm font-semibold text-secondary">Settings saved — visible across the whole site.</span>}
          <Link to="/" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            View website →
          </Link>
        </div>
      </form>
    </div>
  );
}
