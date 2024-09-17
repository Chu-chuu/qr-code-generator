/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "aot",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#BD9E5A",
        secondary: "#1E2C68",
        background: "#FFFFFF",
      },
    },
  },
  variants: {},
  plugins: [],
};
