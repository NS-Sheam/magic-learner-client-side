/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        bandOrange: '#fca311', 
        bandBlue: '#14213d', 
        bandSlate: '#e5e5e5',
        custom: {
          100: '#F0F0F0', // Custom color with variant
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake'
    ],
  },

}

