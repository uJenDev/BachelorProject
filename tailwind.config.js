/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

