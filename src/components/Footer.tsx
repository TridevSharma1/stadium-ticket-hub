import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useSite } from "@/context/SiteContext";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Matches", to: "/matches" },
  { label: "Sports", to: "/sports" },
  { label: "Tickets", to: "/tickets" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const SPORT_LINKS = [
  { label: "Cricket Matches", to: "/matches" },
  { label: "Football Matches", to: "/matches" },
  { label: "Ticket Categories", to: "/tickets" },
  { label: "Upcoming Events", to: "/matches" },
] as const;

const SUPPORT_LINKS = [
  { label: "FAQs", to: "/tickets" },
  { label: "Refund Policy", to: "/about" },
  { label: "Privacy Policy", to: "/about" },
  { label: "Terms of Service", to: "/about" },
] as const;

export function Footer() {
  const { data } = useSite();
  const s = data.settings;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stadium-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand + contact */}
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-display text-xl leading-none text-stadium-dark">
              X
            </span>
            <span className="font-display text-2xl tracking-wider">{s.logoText}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{s.footerText}</p>
          <ul className="mt-5 space-y-2.5 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {s.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-accent">{s.phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${s.email}`} className="transition-colors hover:text-accent">{s.email}</a>
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h3 className="font-display text-xl tracking-wider text-accent">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-white/70 transition-colors hover:text-accent">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sports + support */}
        <div>
          <nav aria-label="Sports">
            <h3 className="font-display text-xl tracking-wider text-accent">Sports</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/70 transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Support" className="mt-6">
            <h3 className="font-display text-xl tracking-wider text-accent">Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/70 transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-display text-xl tracking-wider text-accent">Follow Us</h3>
          <p className="mt-4 text-sm text-white/70">Get matchday updates, offers and behind-the-scenes content.</p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Facebook, href: s.social.facebook, label: "Facebook" },
              { icon: Instagram, href: s.social.instagram, label: "Instagram" },
              { icon: Twitter, href: s.social.twitter, label: "Twitter" },
              { icon: Youtube, href: s.social.youtube, label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-stadium-dark"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-white/60 sm:flex-row lg:px-8">
          <p>© {year} {s.siteName}. All rights reserved.</p>
          {/* Required admin entry point */}
          <Link to="/admin" className="font-semibold text-white/70 underline-offset-4 transition-colors hover:text-accent hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
