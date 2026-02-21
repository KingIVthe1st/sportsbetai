import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0E17",
          secondary: "#0D1219"
        },
        accent: {
          cyan: "#00F0FF",
          green: "#10B981"
        },
        text: {
          primary: "#FFFFFF",
          muted: "#94A3B8"
        },
        card: {
          bg: "rgba(13, 18, 30, 0.75)",
          border: "rgba(0, 240, 255, 0.12)"
        }
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "wave-drift": {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(24px)" },
          "100%": { transform: "translateX(0px)" }
        }
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "wave-drift": "wave-drift 15s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
