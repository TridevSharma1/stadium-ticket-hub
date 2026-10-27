import { createFileRoute } from "@tanstack/react-router";
import { Mail, Users as UsersIcon } from "lucide-react";
import { EmptyRow } from "@/components/admin-bits";
import { Card } from "@/components/ui";
import { useSite } from "@/context/SiteContext";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const { data } = useSite();

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-4xl tracking-wide">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">Registered fans and newsletter subscribers.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl tracking-wide">Registered users</h2>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <UsersIcon className="h-4.5 w-4.5 text-primary" />
            </span>
          </div>
          {data.users.length === 0 ? (
            <div className="mt-4">
              <EmptyRow message="No registered users yet." />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {data.users.map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{u.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {u.email} · joined {new Date(u.joined).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {u.bookings} booking{u.bookings === 1 ? "" : "s"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl tracking-wide">Newsletter subscribers</h2>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10">
              <Mail className="h-4.5 w-4.5 text-secondary" />
            </span>
          </div>
          {data.subscribers.length === 0 ? (
            <div className="mt-4">
              <EmptyRow message="No subscribers yet." />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {data.subscribers.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <p className="truncate text-sm font-semibold">{s.email}</p>
                  <p className="shrink-0 text-xs text-muted-foreground">
                    {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
