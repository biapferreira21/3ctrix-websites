import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base clean (branco quente / terroso)
        paper: "#F7F6F0", // off-white quente
        mist: "#ECEDE5", // fundo secundário (bege esverdeado claro)
        mint: {
          DEFAULT: "#E3EBE1",
          soft: "#EEF1E9",
        },
        // Verdes escuros e naturais (base sóbria, não elétrica)
        night: "#0E1712", // quase-preto esverdeado quente
        forest: {
          DEFAULT: "#1E543A",
          deep: "#123626",
          light: "#2C6E4C",
        },
        sage: {
          DEFAULT: "#8FA38A",
          light: "#B7C7B2",
          dark: "#6F8369",
        },
        // Verde de destaque — natural e sóbrio (mantém o nome "emerald")
        emerald: {
          DEFAULT: "#3E855A",
          bright: "#4C9868",
          glow: "#68AE82",
          dark: "#275A3C",
        },
        // Lilás soft — cor secundária
        lilac: {
          DEFAULT: "#B7A6EA",
          soft: "#D7CDF6",
          deep: "#9985DC",
        },
        // Dourado / castanho — cor quente de acento
        gold: {
          DEFAULT: "#C69A44",
          deep: "#946A2A",
          light: "#E1C079",
          glow: "#D8B25A",
        },
        // Texto
        ink: "#16180F",
        slate: "#5A6154",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "75rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 20, 16, 0.04), 0 10px 30px rgba(11, 20, 16, 0.06)",
        lift: "0 2px 6px rgba(11, 20, 16, 0.05), 0 24px 50px rgba(11, 79, 28, 0.12)",
        glow: "0 0 0 1px rgba(198, 154, 68, 0.3), 0 12px 40px rgba(198, 154, 68, 0.25)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
