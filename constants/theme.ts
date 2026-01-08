export const colors = {
  // Primary - Slate Blue (Editorial/FT Style)
  primary: {
    DEFAULT: "#5B7A99",
    light: "#7C9AB8",
    dark: "#3D5A75",
    50: "#F4F7FA",
    100: "#E1E8EF",
    500: "#5B7A99",
    600: "#4A6580",
    700: "#3D5A75",
    900: "#1E2D3A",
  },
  // Profit - Muted Emerald (sophisticated green)
  profit: {
    DEFAULT: "#34D399",
    light: "#6EE7B7",
    dark: "#10B981",
    muted: "#0D2E24",
  },
  // Loss - Coral Red (refined)
  loss: {
    DEFAULT: "#F87171",
    light: "#FCA5A5",
    dark: "#EF4444",
    muted: "#2D1515",
  },
  // Background - Deep Charcoal (Terminal aesthetic)
  background: {
    DEFAULT: "#09090B",
    card: "#111113",
    elevated: "#18181B",
    hover: "#27272A",
    border: "#27272A",
  },
  // Text - Refined contrast
  text: {
    DEFAULT: "#FAFAFA",
    secondary: "#A1A1AA",
    muted: "#71717A",
    inverse: "#09090B",
  },
  // Accent - Amber (Premium, subtle warmth)
  accent: {
    DEFAULT: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
  },
  // Surface colors - subtle layering
  surface: {
    primary: "#111113",
    secondary: "#18181B",
    tertiary: "#27272A",
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
  primary: ["#3D5A75", "#5B7A99"],
  dark: ["#09090B", "#111113"],
  premium: ["#D97706", "#F59E0B"],
  profit: ["#10B981", "#34D399"],
  loss: ["#EF4444", "#F87171"],
  card: ["rgba(91, 122, 153, 0.06)", "rgba(91, 122, 153, 0.02)"],
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
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
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
    "2xs": 11,  // minimum iOS
    xs: 13,     // small captions
    sm: 15,     // secondary
    base: 17,   // body (iOS default)
    md: 17,     // body alt
    lg: 20,     // emphasized
    xl: 22,     // subheadline
    "2xl": 26,  // headline
    "3xl": 30,  // large title
    "4xl": 34,  // display
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
} as const;

// Smaller border radius for refined look
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  "2xl": 16,
  full: 9999,
} as const;
