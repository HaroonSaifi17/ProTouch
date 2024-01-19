/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/*.{html,ts}",
    "./src/app/pages/**/*.{html,ts}",
    "./src/app/pages/**/**/*.{html,ts}",
    "./src/app/pages/**/**/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
