import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User, Session } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type InsiderTrade = Database["public"]["Tables"]["insider_trades"]["Row"];

// Auth State
interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      profile: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      reset: () =>
        set({ user: null, session: null, profile: null, isLoading: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);

// Trades State
interface TradesState {
  recentTrades: InsiderTrade[];
  followedPoliticians: string[];
  followedSectors: string[];
  setRecentTrades: (trades: InsiderTrade[]) => void;
  addFollowedPolitician: (id: string) => void;
  removeFollowedPolitician: (id: string) => void;
  addFollowedSector: (sector: string) => void;
  removeFollowedSector: (sector: string) => void;
}

export const useTradesStore = create<TradesState>()(
  persist(
    (set, get) => ({
      recentTrades: [],
      followedPoliticians: [],
      followedSectors: [],
      setRecentTrades: (recentTrades) => set({ recentTrades }),
      addFollowedPolitician: (id) =>
        set({ followedPoliticians: [...get().followedPoliticians, id] }),
      removeFollowedPolitician: (id) =>
        set({
          followedPoliticians: get().followedPoliticians.filter((p) => p !== id),
        }),
      addFollowedSector: (sector) =>
        set({ followedSectors: [...get().followedSectors, sector] }),
      removeFollowedSector: (sector) =>
        set({
          followedSectors: get().followedSectors.filter((s) => s !== sector),
        }),
    }),
    {
      name: "trades-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Settings State
interface SettingsState {
  language: "en" | "fr";
  notificationsEnabled: boolean;
  alertThreshold: number; // Minimum trade value for alerts (in USD)
  hasCompletedOnboarding: boolean;
  setLanguage: (language: "en" | "fr") => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setAlertThreshold: (threshold: number) => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "en",
      notificationsEnabled: true,
      alertThreshold: 50000,
      hasCompletedOnboarding: false,
      setLanguage: (language) => set({ language }),
      setNotificationsEnabled: (notificationsEnabled) =>
        set({ notificationsEnabled }),
      setAlertThreshold: (alertThreshold) => set({ alertThreshold }),
      setHasCompletedOnboarding: (hasCompletedOnboarding) =>
        set({ hasCompletedOnboarding }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Paywall State
interface PaywallState {
  isPaywallOpen: boolean;
  isPremium: boolean;
  openPaywall: () => void;
  closePaywall: () => void;
  setIsPremium: (isPremium: boolean) => void;
}

export const usePaywallStore = create<PaywallState>()((set) => ({
  isPaywallOpen: false,
  isPremium: false,
  openPaywall: () => set({ isPaywallOpen: true }),
  closePaywall: () => set({ isPaywallOpen: false }),
  setIsPremium: (isPremium) => set({ isPremium }),
}));
