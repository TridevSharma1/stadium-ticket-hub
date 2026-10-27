import type { SiteData } from "@/lib/types";
import { defaultBanners } from "./banner";
import { defaultMatches } from "./matches";
import { defaultBookings } from "./bookings";
import { defaultGallery } from "./gallery";
import { defaultTestimonials } from "./testimonials";
import { defaultFaqs } from "./faq";
import { defaultUsers } from "./users";
import { defaultSettings } from "./settings";

/**
 * Seed content used until an admin edits anything. Once saved, all data lives
 * in localStorage under DATA_KEY so admin changes survive reloads.
 */
export const seedData: SiteData = {
  banner: defaultBanners,
  matches: defaultMatches,
  bookings: defaultBookings,
  gallery: defaultGallery,
  testimonials: defaultTestimonials,
  faqs: defaultFaqs,
  users: defaultUsers,
  subscribers: [
    { id: "s1", email: "fan.one@example.com", createdAt: "2026-10-05T08:00:00Z" },
    { id: "s2", email: "fan.two@example.com", createdAt: "2026-10-18T11:30:00Z" },
  ],
  messages: [],
  settings: defaultSettings,
};

export const DATA_KEY = "xyz-stadium-data-v1";
export const ADMIN_AUTH_KEY = "xyz-stadium-admin-auth";
