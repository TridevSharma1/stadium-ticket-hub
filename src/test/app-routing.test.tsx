import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
function lastRouteId(path: string) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  return router.matchRoutes(path).at(-1)?.routeId;
}

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    expect(lastRouteId("/")).not.toBe(rootRouteId);
  });

  it("matches every public page the navbar links to", () => {
    for (const path of ["/matches", "/sports", "/tickets", "/gallery", "/about", "/contact"]) {
      expect(lastRouteId(path), path).not.toBe(rootRouteId);
    }
  });

  it("matches the booking flow and admin area", () => {
    expect(lastRouteId("/book/m1")).not.toBe(rootRouteId);
    expect(lastRouteId("/matches/m1")).not.toBe(rootRouteId);
    expect(lastRouteId("/admin")).toBe("/admin/");
    expect(lastRouteId("/admin/matches")).toBe("/admin/matches");
    expect(lastRouteId("/admin/bookings")).toBe("/admin/bookings");
    expect(lastRouteId("/admin/settings")).toBe("/admin/settings");
  });
});
