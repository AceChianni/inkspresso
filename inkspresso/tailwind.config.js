// tailwind.config.js

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        copper: "#d07e3d", // Adjusted Copper
        cornsilk: "#f4e2b4", // Adjusted Cornsilk
        sepia: "#6a4406",
        darkMossGreen: "#485613",
        burntOrange: "#9f4814", // Adjusted Burnt Orange
        sunset: "#f2bc85", // Adjusted Sunset
        sealBrown: "#8b5d2e", // Adjusted Seal Brown
        drabDarkBrown: "#6a5a21", // Adjusted Drab Dark Brown
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
