/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      Alegreya: '"Alegreya variant0", Tofu',
      OpenSans: '"Open Sans", sans-serif',
    },
    extend: {
      flexShrink: {
        2: "2",
      },
      boxShadow: {
        "3xl": "0px 5px 15px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
