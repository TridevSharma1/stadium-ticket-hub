import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import {
  useEffect,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------- Button --------------------------------- */

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-premium hover:bg-secondary",
        accent: "bg-accent text-accent-foreground hover:brightness-110 shadow-premium",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        light: "border-2 border-white/70 text-white bg-transparent hover:bg-white hover:text-primary",
        ghost: "text-primary hover:bg-muted",
        danger: "bg-destructive text-destructive-foreground hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-9 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/* ---------------------------------- Badge ---------------------------------- */

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      green: "bg-secondary/10 text-secondary",
      gold: "bg-accent/15 text-accent-foreground",
      muted: "bg-muted text-muted-foreground",
      success: "bg-secondary/15 text-secondary",
      warning: "bg-accent/15 text-accent-foreground",
      danger: "bg-destructive/10 text-destructive",
      dark: "bg-stadium-dark text-white",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/* ---------------------------------- Inputs --------------------------------- */

const fieldClasses =
  "w-full rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  return <input className={cn(fieldClasses, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClasses, "min-h-28 py-3", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldClasses, "h-11 cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
}

export function Label({ className, children, ...props }: HTMLAttributes<HTMLLabelElement> & { htmlFor?: string }) {
  return (
    <label className={cn("mb-1.5 block text-sm font-semibold text-foreground", className)} {...props}>
      {children}
    </label>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

/* ----------------------------------- Card ---------------------------------- */

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  );
}

/* ---------------------------------- Modal ---------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stadium-dark/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-2xl bg-card p-6 shadow-premium",
          wide ? "max-w-2xl" : "max-w-lg",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-2xl tracking-wide text-foreground">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------- Page header ------------------------------- */

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-stadium-dark py-20 text-center">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url(/images/hero-stadium.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="hero-gradient absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-4">
        <h1 className="font-display text-5xl tracking-wide text-white md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 text-base text-white/80 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

/* ------------------------------ Section header ----------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={cn("mb-10", align === "center" ? "text-center" : "text-left")}>
      {eyebrow && (
        <span
          className={cn(
            "mb-2 inline-block text-sm font-bold uppercase tracking-[0.2em]",
            light ? "text-accent" : "text-secondary",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={cn("font-display text-4xl tracking-wide md:text-5xl", light ? "text-white" : "text-foreground")}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base",
            light ? "text-white/75" : "text-muted-foreground",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* --------------------------------- Spinner --------------------------------- */

export function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
