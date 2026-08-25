import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["var(--font-vazir)", "Tahoma", "sans-serif"],
      },
      colors: {
        cream: "#FDF6EC",
        ink: "#2D2A26",
        brand: {
          50: "#EAF7EC",
          100: "#D6F0DA",
          400: "#4CAF50",
          500: "#3F9142",
          600: "#2F7A3D",
          700: "#25632F",
        },
        purple: {
          50: "#F1EDFF",
          400: "#8B7CF6",
          500: "#7C5CFC",
          600: "#6A46E5",
        },
        gold: {
          50: "#FFF6DC",
          400: "#F5B324",
          500: "#F5A623",
        },
        pink: {
          50: "#FFEAF2",
          400: "#FF7CA8",
          500: "#FF5C97",
        },
        sky: {
          50: "#EAF2FF",
          400: "#5B9BFF",
          500: "#4285F4",
        },
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(45, 42, 38, 0.06)",
        card: "0 2px 12px rgba(45, 42, 38, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
