/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0b132b",
        slate: "#1c2541",
        steel: "#3a506b",
        mint: "#5bc0be",
        sand: "#f6f5f1"
      }
    }
  },
  plugins: []
};
