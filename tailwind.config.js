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
        // Primary - Vibrant Purple
        primary: {
          DEFAULT: "#7C3AED",
          light: "#A78BFA",
          dark: "#6D28D9",
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7C3AED",
          800: "#6D28D9",
          900: "#5B21B6",
          muted: "#6D28D9",
          subtle: "rgba(124, 58, 237, 0.08)",
        },
        // Profit - Darker Green
        profit: {
          DEFAULT: "#16A34A",
          light: "#22C55E",
          dark: "#15803D",
          muted: "#166534",
          subtle: "rgba(22, 163, 74, 0.08)",
        },
        // Loss - Darker Red
        loss: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          dark: "#B91C1C",
          muted: "#991B1B",
          subtle: "rgba(220, 38, 38, 0.08)",
        },
        // Background - Light mode with purple tints
        background: {
          DEFAULT: "#F8F7FF",
          card: "#FFFFFF",
          elevated: "#F3E8FF",
          hover: "#F4F4F5",
          border: "#E9D5FF",
        },
        // Text - Dark for light mode
        text: {
          DEFAULT: "#18181B",
          secondary: "#52525B",
          muted: "#A1A1AA",
          inverse: "#FAFAFA",
        },
        // Accent - Orange
        accent: {
          DEFAULT: "#F97316",
          light: "#FB923C",
          dark: "#EA580C",
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
        // Accent 2 - Lighter Purple
        accent2: {
          DEFAULT: "#A78BFA",
          light: "#C4B5FD",
          dark: "#8B5CF6",
          subtle: "rgba(167, 139, 250, 0.08)",
        },
        // Accent 3 - Sky Blue
        accent3: {
          DEFAULT: "#0EA5E9",
          light: "#38BDF8",
          dark: "#0284C7",
          subtle: "rgba(14, 165, 233, 0.08)",
        },
        // Accent 4 - Rose
        accent4: {
          DEFAULT: "#F43F5E",
          light: "#FB7185",
          dark: "#E11D48",
          subtle: "rgba(244, 63, 94, 0.08)",
        },
        // Surface
        surface: {
          primary: "#FFFFFF",
          secondary: "#F4F4F5",
          tertiary: "#E4E4E7",
        },
        // Info - Sky Blue
        info: {
          DEFAULT: "#0284C7",
          light: "#0EA5E9",
          dark: "#0C4A6E",
          muted: "#075985",
          subtle: "rgba(2, 132, 199, 0.08)",
        },
        // Warning - Orange
        warning: {
          DEFAULT: "#EA580C",
          light: "#F97316",
          dark: "#9A3412",
          muted: "#C2410C",
          subtle: "rgba(234, 88, 12, 0.08)",
        },
        // Party colors
        party: {
          democrat: "#2563EB",
          republican: "#DC2626",
          independent: "#7C3AED",
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
