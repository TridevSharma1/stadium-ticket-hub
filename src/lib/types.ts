// Shared types for all mock-managed content across the site.

export type Sport = "Cricket" | "Football";

export type MatchStatus = "Upcoming" | "Live" | "Completed" | "Cancelled";

export interface SeatTier {
  name: "VIP" | "Premium" | "Standard" | "Economy";
  price: number;
  available: number;
  perks: string;
}

export interface Match {
  id: string;
  sport: Sport;
  teamA: string;
  teamB: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // e.g. "7:00 PM"
  venue: string;
  image: string;
  status: MatchStatus;
  featured: boolean;
  seatTiers: SeatTier[];
}

export type BookingStatus = "Pending" | "Approved" | "Rejected";

export interface Booking {
  id: string;
  matchId: string;
  matchName: string;
  name: string;
  email: string;
  phone: string;
  category: SeatTier["name"];
  tickets: number;
  total: number;
  payment: string;
  status: BookingStatus;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number; // 1-5
  review: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  active: boolean;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  joined: string;
  bookings: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  logoText: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  mapImage: string;
  footerText: string;
  themeColor: string;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export interface SiteData {
  banner: Banner[];
  matches: Match[];
  bookings: Booking[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  faqs: Faq[];
  users: AppUser[];
  subscribers: Subscriber[];
  messages: ContactMessage[];
  settings: SiteSettings;
}
