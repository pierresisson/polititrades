export const colors = {
  // Primary - Vibrant Purple (Violet palette)
  primary: {
    DEFAULT: "#7C3AED", // Violet-700 - main brand color
    light: "#A78BFA", // Violet-400 - hover states, highlights
    dark: "#6D28D9", // Violet-800 - pressed states, dark text
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    300: "#D8B4FE",
    400: "#C084FC",
    500: "#A855F7",
    600: "#9333EA",
    700: "#7C3AED", // DEFAULT
    800: "#6D28D9",
    900: "#5B21B6",
    muted: "#6D28D9",
    subtle: "rgba(124, 58, 237, 0.08)",
  },
  // Profit - Darker Green (high contrast for light mode)
  profit: {
    DEFAULT: "#16A34A", // Green-600
    light: "#22C55E", // Green-500
    dark: "#15803D", // Green-700
    muted: "#166534", // Green-800
    subtle: "rgba(22, 163, 74, 0.08)",
  },
  // Loss - Darker Red (high contrast for light mode)
  loss: {
    DEFAULT: "#DC2626", // Red-600
    light: "#EF4444", // Red-500
    dark: "#B91C1C", // Red-700
    muted: "#991B1B", // Red-800
    subtle: "rgba(220, 38, 38, 0.08)",
  },
  // Background - Light mode with blue-gray subtlety (Twilight Premium)
  background: {
    DEFAULT: "#FAFBFC", // Blue-gray ultra-subtle - main app background
    card: "#FFFFFF", // Pure white - card surfaces
    elevated: "#F3E8FF", // Purple tint - elevated cards (primary-100)
    hover: "#F5F6F7", // Subtle hover states
    border: "#E9D5FF", // Purple border (primary-200)
  },
  // Text - Dark for light mode (inverted from dark)
  text: {
    DEFAULT: "#18181B", // Zinc-900 - primary text
    secondary: "#52525B", // Zinc-600 - secondary text
    muted: "#A1A1AA", // Zinc-400 - captions
    inverse: "#FAFAFA", // Light text for dark backgrounds
  },
  // Accent - Orange (secondary CTAs)
  accent: {
    DEFAULT: "#F97316", // Orange-500
    light: "#FB923C", // Orange-400
    dark: "#EA580C", // Orange-600
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FB923C",
    500: "#F97316",
    600: "#EA580C",
    700: "#C2410C",
    800: "#9A3412",
    900: "#7C2D12",
    muted: "#C2410C",
    subtle: "rgba(249, 115, 22, 0.08)",
  },
  // Accent 2 - Lighter Purple (for variety)
  accent2: {
    DEFAULT: "#A78BFA", // Violet-400
    light: "#C4B5FD", // Violet-300
    dark: "#8B5CF6", // Violet-500
    subtle: "rgba(167, 139, 250, 0.08)",
  },
  // Accent 3 - Sky Blue (info/links)
  accent3: {
    DEFAULT: "#0EA5E9", // Sky-500
    light: "#38BDF8", // Sky-400
    dark: "#0284C7", // Sky-600
    subtle: "rgba(14, 165, 233, 0.08)",
  },
  // Accent 4 - Rose (special highlights)
  accent4: {
    DEFAULT: "#F43F5E", // Rose-500
    light: "#FB7185", // Rose-400
    dark: "#E11D48", // Rose-600
    subtle: "rgba(244, 63, 94, 0.08)",
  },
  // Surface colors - light mode layering
  surface: {
    primary: "#FFFFFF", // Pure white
    secondary: "#F5F6F7", // Blue-gray subtle
    tertiary: "#E8EAED", // Blue-gray tertiary
  },
  // Info - Sky Blue
  info: {
    DEFAULT: "#0284C7", // Sky-600
    light: "#0EA5E9", // Sky-500
    dark: "#0C4A6E", // Sky-900
    muted: "#075985", // Sky-800
    subtle: "rgba(2, 132, 199, 0.08)",
  },
  // Warning - Orange
  warning: {
    DEFAULT: "#EA580C", // Orange-600
    light: "#F97316", // Orange-500
    dark: "#9A3412", // Orange-800
    muted: "#C2410C", // Orange-700
    subtle: "rgba(234, 88, 12, 0.08)",
  },
  // Party colors for politicians (adapted for light mode)
  party: {
    democrat: "#2563EB", // Blue-600 (higher contrast)
    republican: "#DC2626", // Red-600 (same as loss)
    independent: "#7C3AED", // Primary purple (unified with brand)
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
  // Primary purple gradients
  primary: ["#9333EA", "#7C3AED"], // Violet-600 to 700
  primaryVertical: ["#C084FC", "#7C3AED"], // Light to dark (top to bottom)

  // Premium gradients (Kraken-inspired, vibrant)
  premium: ["#9333EA", "#C026D3"], // Violet-600 to Fuchsia-600
  premiumSubtle: ["#F3E8FF", "#FAE8FF"], // Very subtle for backgrounds

  // Hero gradient (splash, onboarding)
  hero: ["#A78BFA", "#7C3AED", "#6D28D9"], // 3-stop gradient

  // Card gradients
  card: ["#FFFFFF", "#FAFBFC"], // Pure white to blue-gray
  cardReverse: ["#FAFBFC", "#FFFFFF"],

  // Financial gradients
  profit: ["#22C55E", "#16A34A"], // Green-500 to 600
  loss: ["#EF4444", "#DC2626"], // Red-500 to 600

  // Glass morphism
  glass: [
    "rgba(255, 255, 255, 0.72)",
    "rgba(250, 251, 252, 0.64)",
  ],

  // Shimmer loading (blue-gray with purple accent)
  shimmer: ["#F5F6F7", "#E9D5FF", "#F5F6F7"], // Blue-gray to primary-200 to blue-gray

  // Legacy gradients (kept for compatibility)
  teal: ["#5EEAD4", "#14B8A6"],
  coral: ["#FDBA74", "#FB923C"],
  dark: ["#0F0F11", "#18181B"],
  subtle: ["rgba(124, 58, 237, 0.06)", "rgba(124, 58, 237, 0.02)"],
  sky: ["#3B82F6", "#2563EB"], // Democrat gradient
  lavender: ["#A78BFA", "#7C3AED"], // Independent gradient

  // Party gradients
  democratGradient: ["#3B82F6", "#2563EB"],
  republicanGradient: ["#EF4444", "#DC2626"],
  independentGradient: ["#A78BFA", "#7C3AED"],
} as const;

export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  // Softer shadows for light mode (lower opacity, larger radius)
  xs: {
    shadowColor: "#18181B", // Dark zinc
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, // Very subtle
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: "#18181B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: "#18181B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, // Subtle but visible
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: "#18181B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: "#18181B",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  // Premium glow for CTAs
  primaryGlow: {
    shadowColor: "#7C3AED", // Primary purple
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24, // More visible
    shadowRadius: 16,
    elevation: 4,
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

// Border radius (increased for modern feel)
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
