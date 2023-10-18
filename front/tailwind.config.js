/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0f0f0f",
        white: "#fff",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        "noto-sans": "'Noto Sans'",
      },
    },
    fontSize: {
      lg: "18px",
      xl: "20px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
