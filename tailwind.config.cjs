/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "media",
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color : {
        ...defaultTheme,
        primary : {
          500 : '#1D3148'
        }
      },
      animation: {
        premiumColorChanging: "premiumColorChanging 3s ease infinite",
        shaking: "shake 4s ease-in-out infinite",
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
        shake: {
          "10%, 20%": {
            transform: "translate3d(0, 0, 0)",
          },
          "11%, 19%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "12%, 18%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "13%, 15%, 17%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "14%, 16%": {
            transform: "translate3d(4px, 0, 0)",
          },
          "30%, 80%": {
            transform: "translate3d(0, 0, 0)",
          },
          "35%, 75%": {
            transform: "translate3d(0, -2px, 0)",
          },

          "40%, 70%": {
            transform: "translate3d(0, 4px, 0)",
          },

          "45%, 55%, 65%": {
            transform: "translate3d(0, -8px, 0)",
          },

          "50%, 60%": {
            transform: "translate3d(0, 8px, 0)",
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
      ...defaultTheme.screens,
    },
  },
  plugins: [require("flowbite/plugin")],
};
