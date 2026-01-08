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
        // Profit - Muted Emerald
        profit: {
          DEFAULT: "#34D399",
          light: "#6EE7B7",
          dark: "#10B981",
          muted: "#0D2E24",
        },
        // Loss - Coral Red
        loss: {
          DEFAULT: "#F87171",
          light: "#FCA5A5",
          dark: "#EF4444",
          muted: "#2D1515",
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
        // Accent - Amber
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        // Surface
        surface: {
          primary: "#111113",
          secondary: "#18181B",
          tertiary: "#27272A",
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
      // COMPACT typography - smaller, denser
      fontSize: {
        "2xs": ["9px", { lineHeight: "12px" }],
        xs: ["10px", { lineHeight: "13px" }],
        sm: ["11px", { lineHeight: "14px" }],
        base: ["12px", { lineHeight: "16px" }],
        md: ["13px", { lineHeight: "17px" }],
        lg: ["14px", { lineHeight: "18px" }],
        xl: ["16px", { lineHeight: "20px" }],
        "2xl": ["18px", { lineHeight: "22px" }],
        "3xl": ["22px", { lineHeight: "26px" }],
        "4xl": ["26px", { lineHeight: "30px" }],
      },
      // Tighter border radius
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
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
      // Tighter spacing
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
