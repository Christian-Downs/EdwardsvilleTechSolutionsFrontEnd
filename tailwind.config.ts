import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#F4EEDF", dark: "#E8DDC4", light: "#FBF8EF" },
        ink: { DEFAULT: "#18202F", soft: "#4A5366", faint: "#8A8F99" },
        blueprint: { DEFAULT: "#1B3F8F", deep: "#142F6C", line: "#C9DBFF" },
        stamp: { DEFAULT: "#C4362B", dark: "#9E2A21" },
        carbon: { yellow: "#F5DC6B", pink: "#F2B9B0" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        ticket: "0 1px 0 rgba(24,32,47,.08), 6px 8px 0 rgba(24,32,47,.12)",
        lift: "0 1px 0 rgba(24,32,47,.08), 10px 14px 0 rgba(24,32,47,.16)",
      },
    },
  },
  plugins: [],
};
export default config;
