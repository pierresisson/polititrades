export const colors = {
  // Primary - Deep Navy Blue (Investment Bank Style)
  primary: {
    DEFAULT: "#1E3A5F",
    light: "#2D5A8A",
    dark: "#0F1F33",
    50: "#E6EBF2",
    100: "#C2D1E3",
    500: "#1E3A5F",
    600: "#163049",
    700: "#0F2238",
    900: "#0A1520",
  },
  // Profit - Finance Green
  profit: {
    DEFAULT: "#00C853",
    light: "#69F0AE",
    dark: "#00A844",
    muted: "#1B4D3E",
  },
  // Loss - Finance Red
  loss: {
    DEFAULT: "#FF5252",
    light: "#FF867F",
    dark: "#D32F2F",
    muted: "#4D1B1B",
  },
  // Background - Dark Slate (Bloomberg-style)
  background: {
    DEFAULT: "#0D1117",
    card: "#161B22",
    elevated: "#21262D",
    hover: "#2D333B",
    border: "#30363D",
  },
  // Text - High contrast
  text: {
    DEFAULT: "#F0F6FC",
    secondary: "#8B949E",
    muted: "#6E7681",
    inverse: "#0D1117",
  },
  // Accent - Gold (Premium, Alerts)
  accent: {
    DEFAULT: "#FFB800",
    light: "#FFD54F",
    dark: "#CC9400",
  },
  // Surface colors for cards/containers
  surface: {
    primary: "#161B22",
    secondary: "#21262D",
    tertiary: "#2D333B",
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
  primary: ["#1E3A5F", "#2D5A8A"],
  dark: ["#0D1117", "#161B22"],
  premium: ["#FFB800", "#FFD54F"],
  profit: ["#00A844", "#00C853"],
  loss: ["#D32F2F", "#FF5252"],
  card: ["rgba(30, 58, 95, 0.1)", "rgba(30, 58, 95, 0.05)"],
} as const;

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    shadowColor: "#1E3A5F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: "#1E3A5F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;

// Typography scale
export const typography = {
  fontFamily: {
    sans: "System",
    mono: "Menlo",
  },
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const borderRadius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 28,
  full: 9999,
} as const;
