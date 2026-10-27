import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, Ticket, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@/components/ui";
import { useSite } from "@/context/SiteContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Matches", to: "/matches" },
  { label: "Sports", to: "/sports" },
  { label: "Tickets", to: "/tickets" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const { data } = useSite();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    setQuery("");
    setOpen(false);
    navigate({ to: "/matches", search: q ? { q, sport: "All", date: "All", sort: "date" } : {} });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled ? "border-border bg-background/95 shadow-sm backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="XYZ Stadium home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-display text-xl leading-none text-white shadow-premium">
            X
          </span>
          <span className="font-display text-2xl tracking-wider text-foreground">
            {data.settings.logoText}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                activeProps={{ className: "bg-primary/10 text-primary" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={submitSearch} className="hidden md:block">
              <Input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search matches, teams…"
                aria-label="Search matches"
                className="h-10 w-56"
              />
            </form>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            aria-label={searchOpen ? "Close search" : "Search matches"}
            onClick={() => setSearchOpen((v) => !v)}
            className="hidden md:inline-flex"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="sm" className="hidden md:inline-flex" onClick={() => navigate({ to: "/admin" })}>
            Login
          </Button>
          <Button size="sm" className="hidden md:inline-flex" onClick={() => navigate({ to: "/matches" })}>
            <Ticket className="h-4 w-4" /> Book Tickets
          </Button>

          {/* Mobile hamburger */}
          <button
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-6 pt-3 lg:hidden">
          <form onSubmit={submitSearch} className="mb-3 md:hidden">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search matches, teams…"
              aria-label="Search matches"
            />
          </form>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                  activeProps={{ className: "bg-primary/10 text-primary" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); navigate({ to: "/admin" }); }}>
              Login
            </Button>
            <Button className="flex-1" onClick={() => { setOpen(false); navigate({ to: "/matches" }); }}>
              <Ticket className="h-4 w-4" /> Book Tickets
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
