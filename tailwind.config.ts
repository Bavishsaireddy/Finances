import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a12",
          card: "#111118",
          elevated: "#18181f",
          hover: "#1e1e28",
        },
        border: {
          DEFAULT: "#262637",
          subtle: "#1a1a28",
          bright: "#363650",
        },
        accent: {
          purple: "#7c3aed",
          "purple-light": "#a78bfa",
          blue: "#3b82f6",
          "blue-light": "#93c5fd",
          cyan: "#06b6d4",
        },
        success: {
          DEFAULT: "#10b981",
          muted: "#064e3b",
          light: "#6ee7b7",
        },
        danger: {
          DEFAULT: "#ef4444",
          muted: "#450a0a",
          light: "#fca5a5",
        },
        warning: {
          DEFAULT: "#f59e0b",
          muted: "#451a03",
          light: "#fcd34d",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#475569",
          disabled: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-card": "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        "gradient-purple": "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
        "gradient-blue": "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
        "gradient-green": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "gradient-gold": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.6)",
        glow: "0 0 20px rgba(124,58,237,0.3)",
        "glow-blue": "0 0 20px rgba(59,130,246,0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
