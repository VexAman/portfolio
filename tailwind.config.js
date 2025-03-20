/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans all files
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000", // Default black color
          100: "#000319", // Custom shade
        },
      },
    },
  },
  plugins: [],
};
