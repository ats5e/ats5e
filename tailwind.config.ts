import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ats-blue": "#148be6",
        "deep-black": "#050505",
      },
      fontFamily: {
        sans: ["var(--font-september)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "ultra-tight": "-0.05em",
        "wide-body": "0.08em",
      },
      boxShadow: {
        "glow-blue":    "0 0 60px 12px rgba(20,139,230,0.35)",
        "glow-blue-md": "0 0 32px  8px rgba(20,139,230,0.25)",
        "glow-blue-sm": "0 0 20px  4px rgba(20,139,230,0.18)",
        "glow-blue-xs": "0 0 10px  2px rgba(20,139,230,0.12)",
        "card-lift":    "0 24px 64px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "metallic-light":
          "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.08) 100%)",
        "metallic-blue":
          "linear-gradient(135deg, rgba(20,139,230,0.55) 0%, rgba(20,139,230,0.08) 50%, rgba(20,139,230,0.35) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
