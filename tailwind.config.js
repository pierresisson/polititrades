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
        // Primary - Soft Teal
        primary: {
          DEFAULT: "#14B8A6",
          light: "#5EEAD4",
          dark: "#0D9488",
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
          muted: "#115E59",
          subtle: "rgba(20, 184, 166, 0.12)",
        },
        // Profit - Mint Green
        profit: {
          DEFAULT: "#34D399",
          light: "#6EE7B7",
          dark: "#10B981",
          muted: "#059669",
          subtle: "rgba(52, 211, 153, 0.12)",
        },
        // Loss - Soft Red
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
        // Accent - Coral/Peach
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
        // Accent 2 - Lavender
        accent2: {
          DEFAULT: "#A78BFA",
          light: "#C4B5FD",
          dark: "#8B5CF6",
          subtle: "rgba(167, 139, 250, 0.12)",
        },
        // Accent 3 - Sky Blue
        accent3: {
          DEFAULT: "#38BDF8",
          light: "#7DD3FC",
          dark: "#0EA5E9",
          subtle: "rgba(56, 189, 248, 0.12)",
        },
        // Accent 4 - Rose
        accent4: {
          DEFAULT: "#FB7185",
          light: "#FDA4AF",
          dark: "#F43F5E",
          subtle: "rgba(251, 113, 133, 0.12)",
        },
        // Surface
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
        // Warning - Coral
        warning: {
          DEFAULT: "#FB923C",
          light: "#FDBA74",
          dark: "#F97316",
          muted: "#C2410C",
          subtle: "rgba(251, 146, 60, 0.12)",
        },
        // Party colors
        party: {
          democrat: "#38BDF8",
          republican: "#F87171",
          independent: "#A78BFA",
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
