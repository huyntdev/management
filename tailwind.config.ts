/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMain: "#FFFFFF",
        grayEB: "#EBEBEB",
        primary: "#475BE8",
        grayFC: "#FCFCFC",
        dark30: "#303030",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
