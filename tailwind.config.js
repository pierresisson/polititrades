/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary - Gold (Fearless, Robinhood-inspired)
        primary: {
          DEFAULT: "#E6B800",
          light: "#FFD700",
          dark: "#D4AF37",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#FFD700",
          600: "#E6B800",
          700: "#D4AF37",
          800: "#B8941E",
          900: "#9A7A0F",
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
          50: "#FFF5F3",
          100: "#FFE4DE",
          200: "#FFC9BC",
          300: "#FFA799",
          400: "#FF8A70",
          500: "#FF6B4A",
          600: "#F44336",
          700: "#D32F2F",
          800: "#B71C1C",
          900: "#8B0000",
          muted: "#D32F2F",
          subtle: "rgba(255, 107, 74, 0.12)",
        },
        // Action colors
        action: {
          cyan: "#00D9FF",
          pink: "#FF2E63",
        },
        // Surface
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
      },
      fontFamily: {
        sans: ["System"],
        mono: ["Menlo"],
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
      },
      // iOS HIG compliant typography - 17pt body minimum
      fontSize: {
        "2xs": ["11px", { lineHeight: "14px" }], // minimum iOS (notes)
        xs: ["13px", { lineHeight: "17px" }], // small captions
        sm: ["15px", { lineHeight: "20px" }], // secondary text
        base: ["17px", { lineHeight: "24px" }], // body (iOS default)
        md: ["17px", { lineHeight: "24px" }], // body alt
        lg: ["20px", { lineHeight: "26px" }], // emphasized
        xl: ["22px", { lineHeight: "28px" }], // subheadline
        "2xl": ["26px", { lineHeight: "32px" }], // headline
        "3xl": ["30px", { lineHeight: "36px" }], // large title
        "4xl": ["34px", { lineHeight: "40px" }], // display (iOS large title)
      },
      // Border radius
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        pill: "9999px",
      },
      borderWidth: {
        DEFAULT: "1px",
        hairline: "0.5px",
      },
      opacity: {
        4: "0.04",
        6: "0.06",
        8: "0.08",
        12: "0.12",
        16: "0.16",
      },
      // Spacing scale
      spacing: {
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "2.5": "10px",
        "3": "12px",
        "3.5": "14px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
    },
  },
  plugins: [],
};
