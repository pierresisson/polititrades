export const colors = {
  // Primary - Teal (Revolut-like)
  primary: {
    DEFAULT: "#0D9488",
    light: "#14B8A6",
    dark: "#0F766E",
    50: "#F0FDFA",   // très subtil (backgrounds)
    100: "#CCFBF1",  // hover states légers
    200: "#99F6E4",  // badges légers
    300: "#5EEAD4",  // accents secondaires
    400: "#2DD4BF",  // hover sur primary
    500: "#14B8A6",  // light
    600: "#0D9488",  // DEFAULT
    700: "#0F766E",  // dark
    800: "#115E59",  // muted
    900: "#134E4A",  // très foncé
    muted: "#115E59",
    subtle: "rgba(13, 148, 136, 0.1)",
  },
  // Profit - Soft Green (calm finance)
  profit: {
    DEFAULT: "#22C55E",
    light: "#4ADE80",
    dark: "#16A34A",
    muted: "#166534",
    subtle: "rgba(34, 197, 94, 0.1)",
  },
  // Loss - Soft Red (calm finance)
  loss: {
    DEFAULT: "#EF4444",
    light: "#F87171",
    dark: "#DC2626",
    muted: "#991B1B",
    subtle: "rgba(239, 68, 68, 0.1)",
  },
  // Background - Deep Charcoal
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
  // Accent - Amber/Gold (Premium)
  accent: {
    DEFAULT: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    50: "#FFFBEB",   // backgrounds premium subtils
    100: "#FEF3C7",  // hover léger
    200: "#FDE68A",  // badges légers
    300: "#FCD34D",  // accents
    400: "#FBBF24",  // light
    500: "#F59E0B",  // DEFAULT
    600: "#D97706",  // dark
    700: "#B45309",  // pressed states
    800: "#92400E",  // muted
    900: "#78350F",  // très foncé
    muted: "#92400E",
    subtle: "rgba(245, 158, 11, 0.1)",
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
  primary: ["#0F766E", "#0D9488"],
  dark: ["#09090B", "#111113"],
  premium: ["#D97706", "#F59E0B"],
  profit: ["#16A34A", "#22C55E"],
  loss: ["#DC2626", "#EF4444"],
  card: ["rgba(13, 148, 136, 0.06)", "rgba(13, 148, 136, 0.02)"],
  subtle: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.005)"],
  teal: ["#115E59", "#0D9488"],
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
