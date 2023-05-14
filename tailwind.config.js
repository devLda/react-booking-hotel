/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      Alegreya: '"Alegreya variant0", Tofu',
    },
  },
  extend: {
    flexShrink: {
      2: "2",
    },
  },
  plugins: [],
};
