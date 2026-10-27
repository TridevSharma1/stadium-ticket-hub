import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button, Card, Field, Input, PageHeader, SectionHeading, Textarea } from "@/components/ui";
import { useMessages, newId } from "@/context/SiteContext";

export const Route = createFileRoute("/_site/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact XYZ Stadium | Pune Ticketing Support" },
      {
        name: "description",
        content:
          "Contact XYZ Stadium, Pune — phone, email, address and working hours. Send us a message about tickets, bookings or matchday support.",
      },
      { property: "og:title", content: "Contact XYZ Stadium" },
      {
        property: "og:description",
        content: "Get in touch with the XYZ Stadium team in Pune — phone, email, address and working hours.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const SUBJECTS = ["Ticket booking help", "Refund or exchange", "Group & corporate bookings", "Venue facilities", "Something else"];

function ContactPage() {
  const { data } = useSite();
  const s = data.settings;
  const [messages, updateMessages] = useMessages();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessages((prev) => [
      ...prev,
      {
        id: newId("msg"),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const INFO = [
    { icon: Phone, label: "Phone", value: s.phone, href: `tel:${s.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: s.email, href: `mailto:${s.email}` },
    { icon: MapPin, label: "Address", value: s.address, href: undefined },
    { icon: Clock, label: "Working hours", value: s.hours, href: undefined },
  ];

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Questions about tickets, refunds or matchday? Our team replies within minutes."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        {/* Info cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map((item) => {
            const body = item.href ? (
              <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {item.value}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">{item.value}</p>
            );
            return (
              <Card key={item.label} className="p-6">
                <item.icon className="h-7 w-7 text-secondary" />
                <h2 className="mt-3 font-display text-xl tracking-wide">{item.label}</h2>
                {body}
              </Card>
            );
          })}
        </div>

        {/* Form + map */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="p-8">
            <SectionHeading eyebrow="Write to us" title="Send a message" align="left" />
            {sent ? (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-secondary" />
                <div>
                  <p className="font-bold text-secondary">Message sent!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Thanks for reaching out — our support desk will reply to your email shortly.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-3 px-0" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form className="mt-6 grid gap-4" onSubmit={submit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <Input required value={form.name} onChange={set("name")} placeholder="Your full name" />
                  </Field>
                  <Field label="Email">
                    <Input required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone">
                    <Input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                  </Field>
                  <Field label="Subject">
                    <select
                      value={form.subject}
                      onChange={set("subject")}
                      className="h-11 w-full cursor-pointer rounded-xl border border-input bg-card px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {SUBJECTS.map((sub) => (
                        <option key={sub}>{sub}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Message">
                  <Textarea required value={form.message} onChange={set("message")} placeholder="How can we help?" />
                </Field>
                <Button type="submit" size="lg" className="justify-self-start">
                  <Send className="h-4 w-4" /> Send message
                </Button>
              </form>
            )}
          </Card>

          {/* Map + quick info */}
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <img
                src={s.mapImage}
                alt={`Map showing ${s.address}`}
                loading="lazy"
                width={1280}
                height={720}
                className="h-72 w-full object-cover"
              />
              <div className="flex items-start gap-3 p-6">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <p className="font-bold">{s.siteName}</p>
                  <p className="text-sm text-muted-foreground">{s.address}</p>
                </div>
              </div>
            </Card>
            <Card className="bg-stadium-dark p-8 text-white">
              <h2 className="font-display text-3xl tracking-wide">Ticket hotline</h2>
              <p className="mt-2 text-sm text-white/70">
                Booking help on matchdays is available from gates opening until one hour after the final whistle.
              </p>
              <p className="mt-4 font-display text-4xl tracking-wider text-accent">{s.phone}</p>
              <p className="mt-1 text-sm text-white/70">{s.hours}</p>
            </Card>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          {messages.length > 0
            ? `We've received ${messages.length} message${messages.length === 1 ? "" : "s"} from fans like you.`
            : "We typically reply within 30 minutes during working hours."}
        </p>
      </section>
    </>
  );
}
