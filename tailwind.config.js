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
        // Primary - Deep Navy (Investment Bank Style)
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
        // Profit green
        profit: {
          DEFAULT: "#00C853",
          light: "#69F0AE",
          dark: "#00A844",
          muted: "#1B4D3E",
        },
        // Loss red
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
        // Text
        text: {
          DEFAULT: "#F0F6FC",
          secondary: "#8B949E",
          muted: "#6E7681",
          inverse: "#0D1117",
        },
        // Accent - Gold
        accent: {
          DEFAULT: "#FFB800",
          light: "#FFD54F",
          dark: "#CC9400",
        },
        // Surface
        surface: {
          primary: "#161B22",
          secondary: "#21262D",
          tertiary: "#2D333B",
        },
      },
      fontFamily: {
        // System fonts (SF Pro on iOS)
        sans: ["System"],
        mono: ["Menlo"],
        // Keep Inter available for fallback
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
      },
      fontSize: {
        xs: ["11px", { lineHeight: "14px" }],
        sm: ["13px", { lineHeight: "18px" }],
        base: ["15px", { lineHeight: "22px" }],
        lg: ["17px", { lineHeight: "24px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "38px" }],
        "4xl": ["36px", { lineHeight: "44px" }],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        pill: "9999px",
      },
      borderWidth: {
        DEFAULT: "1px",
        hairline: "0.5px",
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        16: "0.16",
      },
    },
  },
  plugins: [],
};
