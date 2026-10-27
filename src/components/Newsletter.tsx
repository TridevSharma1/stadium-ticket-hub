import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { newId, useSubscribers } from "@/context/SiteContext";

// Newsletter signup: mock only — saves the email into site state/localStorage.
export function Newsletter() {
  const [subscribers, updateSubscribers] = useSubscribers();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    updateSubscribers((prev) => [
      ...prev,
      { id: newId("s"), email: email.trim(), createdAt: new Date().toISOString() },
    ]);
    setDone(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-stadium-dark py-16">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/images/gallery-night.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <Mail className="mx-auto h-10 w-10 text-accent" />
        <h2 className="mt-3 font-display text-4xl tracking-wide text-white md:text-5xl">
          Never Miss A Match
        </h2>
        <p className="mt-2 text-sm text-white/75 md:text-base">
          Subscribe for ticket alerts, exclusive offers and stadium news.
        </p>
        {done ? (
          <p className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-secondary/15 px-6 py-4 text-sm font-semibold text-white">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            You're subscribed! Watch your inbox for matchday updates.
          </p>
        ) : (
          <form onSubmit={subscribe} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 border-transparent"
            />
            <Button type="submit" variant="accent">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
