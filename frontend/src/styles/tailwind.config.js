// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        copper: "#af7b3a",
        cornsilk: "#fef7d5",
        sepia: "#6a4406",
        darkMossGreen: "#485613",
        burntOrange: "#be5615",
        sunset: "#ffdaa7",
        sealBrown: "#632c02",
        drabDarkBrown: "#4c3f07",
      },
    },
  },
  plugins: [],
};
