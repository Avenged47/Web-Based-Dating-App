/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Alegreya: ["Alegreya", "serif"],
      },
      colors: {
        "custom-indigo": "#6C51A2",
        "custom-pink": "#ff70a9",
        "custom-grey": "#FFDCF0",
        "custom-white": "#D2D2D2",
        "custom-dim-indigo": "#9781c4",
        "custom-dim-grey": "#727272",
      },
    },
    aspectRatio: {
      "3/2": "3 / 2",
      "4/3": "4 / 3",
    },
    keyframes: {
      "slide-up": {
        "0%": {
          transform: "translateY(80%)", // Start from below
          opacity: "0", // Initially hidden
        },
        "100%": {
          transform: "translateY(0)", // Move to its final position
          opacity: "1", // Fully visible
        },
      },
      "slide-down": {
        "0%": {
          transform: "translateY(-80%)",
          opacity: 0,
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
    },
    animation: {
      "slide-up": "slide-up 0.5s ease-out forwards",
      "slide-down": "slide-down 1s ease-out forwards",
    },
  },

  plugins: [],
};
