export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,json}"],
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/typography"),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#438DFF",
        navy: {
          50: "#E7E9EF",
          100: "#C2C9D6",
          200: "#A3ADC2",
          300: "#697A9B",
          400: "#5C6B8A",
          450: "#465675",
          500: "#384766",
          600: "#313E59",
          700: "#26334D",
          750: "#222E45",
          800: "#202B40",
          900: "#192132",
        },
      },
      fontFamily: { poppins: ["Poppins", "sans-serif"] },
      keyframes: {
        "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        "fade-out": {
          "0%": { opacity: 1, visibility: "visible" },
          "100%": { opacity: 0, visibility: "hidden" },
        },
      },
    },
  },
  variants: {
    lineClamp: ["responsive", "hover"],
  },
};
