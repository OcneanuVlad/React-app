/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#1f1f1f",
        secondary: "#2d2d2d",
        contrast: "#fefefe",
        accent1: "#f56fe3",
        accent2: "#3363e9",
        contrast2: "#c4c4c4",
      },
    },
  },
  plugins: [],
};
