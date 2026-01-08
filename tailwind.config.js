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
        // Primary - Finance blue/green
        primary: {
          DEFAULT: "#0D9488", // Teal
          light: "#14B8A6",
          dark: "#0F766E",
        },
        // Secondary - Profit green
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
        // Background
        background: {
          DEFAULT: "#0F172A", // Dark slate
          card: "#1E293B",
          elevated: "#334155",
        },
        // Text
        text: {
          DEFAULT: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        // Accent - Gold for premium/alerts
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
