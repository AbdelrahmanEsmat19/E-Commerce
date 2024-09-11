/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      scale: {
        102: '1.02',
      },}
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
