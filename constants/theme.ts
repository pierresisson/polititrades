export const colors = {
  // Primary - Soft Teal (calm but vibrant)
  primary: {
    DEFAULT: "#14B8A6",
    light: "#5EEAD4",
    dark: "#0D9488",
    50: "#F0FDFA",
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    400: "#2DD4BF",
    500: "#14B8A6",  // DEFAULT
    600: "#0D9488",
    700: "#0F766E",
    800: "#115E59",
    900: "#134E4A",
    muted: "#115E59",
    subtle: "rgba(20, 184, 166, 0.12)",
  },
  // Profit - Mint Green (fresh, not neon)
  profit: {
    DEFAULT: "#34D399",
    light: "#6EE7B7",
    dark: "#10B981",
    muted: "#059669",
    subtle: "rgba(52, 211, 153, 0.12)",
  },
  // Loss - Soft Red (not aggressive)
  loss: {
    DEFAULT: "#F87171",
    light: "#FCA5A5",
    dark: "#EF4444",
    muted: "#DC2626",
    subtle: "rgba(248, 113, 113, 0.12)",
  },
  // Background - Dark but not pure black
  background: {
    DEFAULT: "#0F0F11",
    card: "#18181B",
    elevated: "#27272A",
    hover: "#3F3F46",
    border: "#3F3F46",
  },
  // Text - Light for dark mode
  text: {
    DEFAULT: "#FAFAFA",
    secondary: "#A1A1AA",
    muted: "#71717A",
    inverse: "#0F0F11",
  },
  // Accent - Coral/Peach (CTAs, premium)
  accent: {
    DEFAULT: "#FB923C",
    light: "#FDBA74",
    dark: "#F97316",
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
    subtle: "rgba(251, 146, 60, 0.12)",
  },
  // Accent 2 - Lavender (secondary actions)
  accent2: {
    DEFAULT: "#A78BFA",
    light: "#C4B5FD",
    dark: "#8B5CF6",
    subtle: "rgba(167, 139, 250, 0.12)",
  },
  // Accent 3 - Sky Blue (info/links)
  accent3: {
    DEFAULT: "#38BDF8",
    light: "#7DD3FC",
    dark: "#0EA5E9",
    subtle: "rgba(56, 189, 248, 0.12)",
  },
  // Accent 4 - Rose (alerts/special)
  accent4: {
    DEFAULT: "#FB7185",
    light: "#FDA4AF",
    dark: "#F43F5E",
    subtle: "rgba(251, 113, 133, 0.12)",
  },
  // Surface colors - subtle layering (for dark mode)
  surface: {
    primary: "#18181B",
    secondary: "#27272A",
    tertiary: "#3F3F46",
  },
  // Info - Sky Blue
  info: {
    DEFAULT: "#38BDF8",
    light: "#7DD3FC",
    dark: "#0EA5E9",
    muted: "#0284C7",
    subtle: "rgba(56, 189, 248, 0.12)",
  },
  // Warning - Coral (same as accent)
  warning: {
    DEFAULT: "#FB923C",
    light: "#FDBA74",
    dark: "#F97316",
    muted: "#C2410C",
    subtle: "rgba(251, 146, 60, 0.12)",
  },
  // Party colors for politicians (updated for pastel)
  party: {
    democrat: "#38BDF8",    // soft sky blue
    republican: "#F87171",  // soft red
    independent: "#A78BFA", // lavender
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
  primary: ["#5EEAD4", "#14B8A6"],
  teal: ["#5EEAD4", "#14B8A6"],
  coral: ["#FDBA74", "#FB923C"],
  profit: ["#6EE7B7", "#34D399"],
  loss: ["#FCA5A5", "#F87171"],
  premium: ["#FDBA74", "#FB923C"],
  card: ["#27272A", "#18181B"],
  dark: ["#0F0F11", "#18181B"],
  subtle: ["rgba(20, 184, 166, 0.06)", "rgba(20, 184, 166, 0.02)"],
  sky: ["#7DD3FC", "#38BDF8"],
  lavender: ["#C4B5FD", "#A78BFA"],
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
