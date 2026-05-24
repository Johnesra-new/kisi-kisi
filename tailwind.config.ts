import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          elevated: "var(--color-bg-elevated)",
        },
        metallic: {
          100: "var(--color-metallic-100)",
          200: "var(--color-metallic-200)",
          300: "var(--color-metallic-300)",
          400: "var(--color-metallic-400)",
        },
        accent: {
          primary: "var(--color-accent-primary)",
          glow: "var(--color-accent-glow)",
          dim: "var(--color-accent-dim)",
        },
        warm: {
          silver: "var(--color-warm-silver)",
        },
        cold: {
          silver: "var(--color-cold-silver)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          default: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
        },
        semantic: {
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          error: "var(--color-error)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(192,192,192,0.20)",
        'glow-sm': "0 0 20px rgba(192,192,192,0.15)",
        'glow-lg': "0 0 80px rgba(192,192,192,0.25)",
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
        'in-out-quad': 'var(--ease-in-out-quad)',
        'spring': 'var(--ease-spring)',
        'smooth': 'var(--ease-smooth)',
      }
    },
  },
  plugins: [],
};
export default config;
