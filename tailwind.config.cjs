/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        belly: "belly 1s ease-in-out",
      },
      keyframes: {
        belly: {
          "0%": {
            transform: "rotate(0deg) ",
          },
          "20%": {
            transform: "rotate(30deg) translateX(-3px)",
          },
          "60%": {
            transform: "rotate(-20deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
      animation: {
        scale: "scale 0.2s ease-in-out",
      },
      keyframes: {
        scale: {
          "0%": {
            transform: "scale(1) ",
          },

          "60%": {
            transform: "scale(0.9)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
