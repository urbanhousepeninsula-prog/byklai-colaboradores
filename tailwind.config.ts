import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        ink2: "#3a3a3a",
        ink3: "#888888",
        surface: "#fafaf8",
        surface2: "#f2f1ed",
        line: "#e0ddd8",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        serif: ["'DM Serif Display'", "serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "8px",
      },
      maxWidth: {
        wrap: "900px",
      },
    },
  },
  plugins: [],
};

export default config;
