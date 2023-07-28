/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#94A3B8",
      },
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false
  },
}