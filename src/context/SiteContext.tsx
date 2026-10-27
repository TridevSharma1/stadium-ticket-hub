import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  Banner,
  Booking,
  ContactMessage,
  Faq,
  GalleryImage,
  Match,
  SiteData,
  SiteSettings,
  Subscriber,
  Testimonial,
  AppUser,
} from "@/lib/types";
import { seedData, DATA_KEY, ADMIN_AUTH_KEY } from "@/mock/siteData";

type EntityKey = keyof Omit<SiteData, "settings">;

interface SiteContextValue {
  data: SiteData;
  hydrated: boolean;
  updateList: <K extends EntityKey>(
    key: K,
    updater: (items: SiteData[K]) => SiteData[K],
  ) => void;
  setSettings: (settings: SiteSettings) => void;
  resetAll: () => void;
  isAdmin: boolean;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const newId = (prefix: string) => `${prefix}-${uid()}`;

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(seedData);
  const [hydrated, setHydrated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const loadedRef = useRef(false);

  // Load admin-edited data + auth flag from localStorage (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DATA_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SiteData;
        // Merge with seed so newly added fields always exist.
        setData((prev) => ({
          ...prev,
          ...parsed,
          settings: { ...prev.settings, ...parsed.settings },
        }));
      }
      setIsAdmin(window.localStorage.getItem(ADMIN_AUTH_KEY) === "1");
    } catch {
      // Corrupt storage falls back to seed data.
    }
    loadedRef.current = true;
    setHydrated(true);
  }, []);

  // Persist every admin change.
  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(DATA_KEY, JSON.stringify(data));
    } catch {
      // Storage full / private mode — changes stay in memory for this session.
    }
  }, [data]);

  const updateList = useCallback(
    <K extends EntityKey>(key: K, updater: (items: SiteData[K]) => SiteData[K]) => {
      setData((prev) => ({ ...prev, [key]: updater(prev[key]) }));
    },
    [],
  );

  const setSettings = useCallback((settings: SiteSettings) => {
    setData((prev) => ({ ...prev, settings }));
  }, []);

  const resetAll = useCallback(() => {
    setData(seedData);
    try {
      window.localStorage.removeItem(DATA_KEY);
    } catch {
      // ignore
    }
  }, []);

  const loginAdmin = useCallback((username: string, password: string) => {
    if (username.trim() === "admin" && password === "admin123") {
      try {
        window.localStorage.setItem(ADMIN_AUTH_KEY, "1");
      } catch {
        // ignore
      }
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    try {
      window.localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({ data, hydrated, updateList, setSettings, resetAll, isAdmin, loginAdmin, logoutAdmin }),
    [data, hydrated, updateList, setSettings, resetAll, isAdmin, loginAdmin, logoutAdmin],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

// Convenience typed helpers so call sites stay readable.
export const useMatches = (): [Match[], (u: (m: Match[]) => Match[]) => void] => {
  const { data, updateList } = useSite();
  return [data.matches, (u) => updateList("matches", u)];
};
export const useBookings = (): [Booking[], (u: (b: Booking[]) => Booking[]) => void] => {
  const { data, updateList } = useSite();
  return [data.bookings, (u) => updateList("bookings", u)];
};
export const useBanner = (): [Banner[], (u: (b: Banner[]) => Banner[]) => void] => {
  const { data, updateList } = useSite();
  return [data.banner, (u) => updateList("banner", u)];
};
export const useGallery = (): [GalleryImage[], (u: (g: GalleryImage[]) => GalleryImage[]) => void] => {
  const { data, updateList } = useSite();
  return [data.gallery, (u) => updateList("gallery", u)];
};
export const useTestimonials = (): [Testimonial[], (u: (t: Testimonial[]) => Testimonial[]) => void] => {
  const { data, updateList } = useSite();
  return [data.testimonials, (u) => updateList("testimonials", u)];
};
export const useFaqs = (): [Faq[], (u: (f: Faq[]) => Faq[]) => void] => {
  const { data, updateList } = useSite();
  return [data.faqs, (u) => updateList("faqs", u)];
};
export const useUsers = (): [AppUser[], (u: (x: AppUser[]) => AppUser[]) => void] => {
  const { data, updateList } = useSite();
  return [data.users, (u) => updateList("users", u)];
};
export const useSubscribers = (): [Subscriber[], (u: (s: Subscriber[]) => Subscriber[]) => void] => {
  const { data, updateList } = useSite();
  return [data.subscribers, (u) => updateList("subscribers", u)];
};
export const useMessages = (): [ContactMessage[], (u: (m: ContactMessage[]) => ContactMessage[]) => void] => {
  const { data, updateList } = useSite();
  return [data.messages, (u) => updateList("messages", u)];
};
