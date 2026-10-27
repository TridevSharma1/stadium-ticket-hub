import { Link, Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  ExternalLink,
  HelpCircle,
  Images,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  Star,
  Ticket,
  Users,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { Button, Field, Input } from "@/components/ui";
import { useSite } from "@/context/SiteContext";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/matches", label: "Matches", icon: CalendarDays },
  { to: "/admin/bookings", label: "Bookings", icon: Ticket },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { to: "/admin/banners", label: "Banners", icon: Megaphone },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function AdminLogin() {
  const { loginAdmin } = useSite();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      navigate({ to: "/admin" });
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stadium-dark px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-premium">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary font-display text-2xl text-white shadow-premium">
            X
          </span>
          <h1 className="mt-4 font-display text-4xl tracking-wide text-foreground">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">XYZ Stadium management console</p>
        </div>

        <form className="mt-8 grid gap-4" onSubmit={submit}>
          <Field label="Username">
            <Input
              required
              autoComplete="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(false); }}
              placeholder="admin"
            />
          </Field>
          <Field label="Password">
            <Input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
            />
          </Field>
          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive">
              Invalid username or password. Try again.
            </p>
          )}
          <Button type="submit" size="lg" className="mt-2 w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo credentials — username <code className="font-semibold text-foreground">admin</code>, password{" "}
          <code className="font-semibold text-foreground">admin123</code>
        </p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminLayout() {
  const { isAdmin, hydrated, logoutAdmin } = useSite();
  const navigate = useNavigate();

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }
  if (!isAdmin) {
    return <AdminLogin />;
  }

  const logout = () => {
    logoutAdmin();
    navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-stadium-dark lg:flex">
        <Link to="/" className="flex items-center gap-2.5 px-6 pb-6 pt-7">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-display text-xl text-stadium-dark">
            X
          </span>
          <span className="font-display text-2xl tracking-wider text-white">
            XYZ <span className="text-accent">Admin</span>
          </span>
        </Link>
        <nav className="flex-1 overflow-y-auto px-3" aria-label="Admin sections">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: "exact" in item && item.exact }}
                  activeProps={{ className: "bg-primary text-white shadow-premium" }}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4.5 w-4.5" /> View website
          </Link>
          <button
            onClick={logout}
            className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-destructive/20 hover:text-white"
          >
            <LogOut className="h-4.5 w-4.5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="bg-stadium-dark px-4 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-lg text-stadium-dark">
                X
              </span>
              <span className="font-display text-xl tracking-wider text-white">XYZ Admin</span>
            </Link>
            <div className="flex gap-2">
              <Link
                to="/"
                className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white"
              >
                Site
              </Link>
              <button
                onClick={logout}
                className="cursor-pointer rounded-full bg-destructive px-3 py-1.5 text-xs font-semibold text-white"
              >
                Logout
              </button>
            </div>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Admin sections">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item && item.exact }}
                activeProps={{ className: "bg-primary text-white" }}
                className="shrink-0 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white/80"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
