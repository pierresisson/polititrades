export const colors = {
  // Primary - Finance teal
  primary: {
    DEFAULT: "#0D9488",
    light: "#14B8A6",
    dark: "#0F766E",
  },
  // Profit green
  profit: {
    DEFAULT: "#22C55E",
    light: "#4ADE80",
    dark: "#16A34A",
  },
  // Loss red
  loss: {
    DEFAULT: "#EF4444",
    light: "#F87171",
    dark: "#DC2626",
  },
  // Background - Dark mode
  background: {
    DEFAULT: "#0F172A",
    card: "#1E293B",
    elevated: "#334155",
  },
  // Text
  text: {
    DEFAULT: "#F8FAFC",
    secondary: "#94A3B8",
    muted: "#64748B",
  },
  // Accent - Gold for premium
  accent: {
    DEFAULT: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
  },
} as const;

export const gradients = {
  primary: ["#0D9488", "#14B8A6"],
  profit: ["#16A34A", "#22C55E"],
  loss: ["#DC2626", "#EF4444"],
  premium: ["#F59E0B", "#FBBF24"],
  dark: ["#0F172A", "#1E293B"],
} as const;

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
