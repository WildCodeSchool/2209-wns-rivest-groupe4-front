/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        premiumColorChanging: "premiumColorChanging 3s ease infinite",
      },
      keyframes: {
        premiumColorChanging: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
    fontFamily: {
      barlow: ["Barlow Condensed", "sans-serif"],
      aldrich: ["Aldrich", "sans-serif"],
    },
    screens: {
      mobileSmall: { min: "320px", max: "400px" },
      mobileLarge: { min: "401px", max: "550px" },
      phablet: { min: "551px", max: "768px" },
      tablet: { min: "769px", max: "1000px" },
      desktopSmall: { min: "1001px", max: "1200px" },
      desktopLarge: { min: "1201px" },
    },
  },
  plugins: [],
};
