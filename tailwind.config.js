/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Colores de marca principales
        amarillo: {
          400: "#FCE902",
          300: "#FFED66",
          200: "#FFF399",
        },
        naranja: {
          400: "#F59002",
          300: "#FFAD33",
          500: "#D97706",
        },
        rojo: {
          400: "#A82001",
          500: "#8B1A01",
        },
        granate: {
          400: "#770501",
          500: "#5A0401",
        },
        negro: {
          400: "#010005",
          300: "#0A0A0F",
          200: "#121218",
        },
        brand: {
          yellow: "#FCE902",
          orange: "#F59002",
          red: "#A82001",
          burgundy: "#770501",
          black: "#010005",
        },
        primary: {
          50: "#FFFCE6",
          100: "#FFF9CC",
          200: "#FFF399",
          300: "#FFED66",
          400: "#FCE902",
          500: "#F59002",
          600: "#D97706",
          700: "#A82001",
          800: "#770501",
          900: "#010005",
        },
        accent: {
          yellow: "#FCE902",
          orange: "#F59002",
          red: "#A82001",
        },
        background: {
          DEFAULT: "#0A0A0F",
          secondary: "#121218",
          tertiary: "#1A1A24",
          card: "#1E1E2A",
          elevated: "#252532",
        },
        surface: {
          DEFAULT: "#1E1E2A",
          light: "#2A2A3A",
          lighter: "#363648",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#71717A",
          accent: "#FCE902",
        },
        border: {
          DEFAULT: "#2A2A3A",
          light: "#363648",
        },
        success: "#22C55E",
        warning: "#F59002",
        error: "#A82001",
      },
      fontFamily: {
        sans: ["System"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(252, 233, 2, 0.3)",
        "glow-orange": "0 0 20px rgba(245, 144, 2, 0.3)",
      },
    },
  },
  plugins: [],
};