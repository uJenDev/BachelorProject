/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'settingText': 'orange-700',
        'settingBackground': 'orange-200'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

