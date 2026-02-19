/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        forge: {
          50: "#F0F7F4",
          100: "#DCEEE4",
          200: "#B8DDCA",
          300: "#88C5A6",
          400: "#5AAD82",
          500: "#38896A",
          600: "#2B6B4F",
          700: "#235843",
          800: "#1C4636",
          900: "#17392D",
          950: "#0D2119",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
