import { ChevronDown } from "lucide-react";
import { useSite } from "@/context/SiteContext";

// Lightweight accordion built on native <details> — accessible and dependency-free.
export function FaqAccordion() {
  const { data } = useSite();

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {data.faqs.map((faq, i) => (
        <details
          key={faq.id}
          open={i === 0}
          className="group rounded-2xl border border-border bg-card px-6 py-4 shadow-sm transition-colors open:border-primary/30 open:shadow-premium"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-180">
              <ChevronDown className="h-4 w-4" />
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
