/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "secondary-text": "rgba(142, 142, 142, 1)",
        "post-separator": "rgba(239, 239, 239, 1)",
        "primary-button": "rgba(0, 149, 246, 1)",
      },
    },
  },
  plugins: [],
};
