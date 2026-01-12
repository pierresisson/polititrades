export const colors = {
  // Primary - Gold (Fearless, Robinhood-inspired)
  primary: {
    DEFAULT: "#E6B800",
    light: "#FFD700",
    dark: "#D4AF37",
    50: "#FFFBEB",   // gold tints
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#FFD700",  // light
    600: "#E6B800",  // DEFAULT
    700: "#D4AF37",  // dark
    800: "#B8941E",  // muted
    900: "#9A7A0F",  // very dark
    muted: "#B8941E",
    subtle: "rgba(230, 184, 0, 0.12)",
  },
  // Profit - Spring Green (gaming energy)
  profit: {
    DEFAULT: "#00FF7F",
    light: "#4FFFB0",
    dark: "#00E070",
    muted: "#00B35C",
    subtle: "rgba(0, 255, 127, 0.1)",
  },
  // Loss - Hot Red (punchier)
  loss: {
    DEFAULT: "#FF4444",
    light: "#FF6666",
    dark: "#E63939",
    muted: "#CC2E2E",
    subtle: "rgba(255, 68, 68, 0.1)",
  },
  // Background - Deep Charcoal
  background: {
    DEFAULT: "#09090B",
    card: "#111113",
    elevated: "#18181B",
    hover: "#27272A",
    border: "#27272A",
  },
  // Text - Pure white for contrast
  text: {
    DEFAULT: "#FFFFFF",
    secondary: "#94A3B8",
    muted: "#64748B",
    inverse: "#09090B",
  },
  // Accent - Coral (energetic CTAs)
  accent: {
    DEFAULT: "#FF6B4A",
    light: "#FF8A70",
    dark: "#F44336",
    50: "#FFF5F3",   // coral tints
    100: "#FFE4DE",
    200: "#FFC9BC",
    300: "#FFA799",
    400: "#FF8A70",
    500: "#FF6B4A",  // DEFAULT
    600: "#F44336",  // dark
    700: "#D32F2F",
    800: "#B71C1C",
    900: "#8B0000",
    muted: "#D32F2F",
    subtle: "rgba(255, 107, 74, 0.12)",
  },
  // Action colors (NEW/TRENDING badges)
  action: {
    cyan: "#00D9FF",
    pink: "#FF2E63",
  },
  // Surface colors - subtle layering
  surface: {
    primary: "#111113",
    secondary: "#18181B",
    tertiary: "#27272A",
  },
  // Info - Blue
  info: {
    DEFAULT: "#3B82F6",
    light: "#60A5FA",
    dark: "#2563EB",
    muted: "#1E40AF",
    subtle: "rgba(59, 130, 246, 0.1)",
  },
  // Warning
  warning: {
    DEFAULT: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    muted: "#92400E",
    subtle: "rgba(245, 158, 11, 0.1)",
  },
  // Party colors for politicians
  party: {
    democrat: "#3B82F6",
    republican: "#EF4444",
    independent: "#8B5CF6",
  },
} as const;

// Financial-specific semantic colors
export const semanticColors = {
  buy: colors.profit.DEFAULT,
  sell: colors.loss.DEFAULT,
  hold: colors.accent.DEFAULT,
  positive: colors.profit.DEFAULT,
  negative: colors.loss.DEFAULT,
  neutral: colors.text.secondary,
} as const;

export const gradients = {
  primary: ["#D4AF37", "#E6B800"],
  gold: ["#B8941E", "#FFD700"],
  coral: ["#F44336", "#FF8A70"],
  profit: ["#00B35C", "#00FF7F"],
  loss: ["#E63939", "#FF6666"],
  premium: ["#E6B800", "#FFD700"],
  dark: ["#09090B", "#111113"],
  card: ["rgba(230, 184, 0, 0.06)", "rgba(230, 184, 0, 0.02)"],
  subtle: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.005)"],
} as const;

export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
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

// Typography scale - iOS HIG compliant
export const typography = {
  fontFamily: {
    sans: "System",
    mono: "SF Mono, Menlo",
    display: "System",
  },
  // iOS compliant font sizes - 17pt body minimum
  fontSize: {
    "2xs": 11, // minimum iOS
    xs: 13, // small captions
    sm: 15, // secondary
    base: 17, // body (iOS default)
    md: 17, // body alt
    lg: 20, // emphasized
    xl: 22, // subheadline
    "2xl": 26, // headline
    "3xl": 30, // large title
    "4xl": 34, // display
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeight: {
    none: 1,
    tight: 1.15,
    snug: 1.25,
    normal: 1.4,
    relaxed: 1.6,
  },
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
} as const;

// Tighter spacing scale
export const spacing = {
  px: 1,
  "0.5": 2,
  1: 4,
  "1.5": 6,
  2: 8,
  "2.5": 10,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

// Border radius
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  "2xl": 16,
  "3xl": 24,
  full: 9999,
} as const;

// Animation durations
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;
