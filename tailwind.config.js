/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bebas Neue", "Impact", "Arial Narrow", "sans-serif"],
        script: ["Brush Script MT", "Segoe Script", "cursive"],
      },
      colors: {
        ocean: "#051e2a",
        lagoon: "#0d6f88",
        cyanGlow: "#62d9ef",
        hotpink: "#ff2f93",
        pearl: "#f7fbff",
      },
      boxShadow: {
        album: "0 24px 70px rgba(0, 0, 0, 0.52)",
        pink: "0 0 28px rgba(255, 47, 147, 0.45)",
      },
    },
  },
  plugins: [],
};
