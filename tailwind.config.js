/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        inkspresso: {
          "primary": "#5A4632",
          "primary-focus": "#3F2F22",
          "primary-content": "#F5F1EB",

          "secondary": "#A3A392",
          "accent": "#C7A269",

          "neutral": "#3B2F2F",

          "base-100": "#F5F1EB",
          "base-200": "#E8E3DA",
          "base-300": "#D6CFC4",

          "info": "#8E8C84",
          "success": "#6F7C56",
          "warning": "#C9A66B",
          "error": "#8A4B47",
        },
      },
      "dark",
    ],
  },
};
