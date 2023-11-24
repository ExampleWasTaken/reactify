/** @type {import('tailwindcss').Config} */

export default {
  content: [
      './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green': '#1db954',
        'purple': '#400073',
        'white': '#ffffff',
        'black': '#121212',
        'subdued': '#a7a7a7'
      },
      backgroundImage: {
        'aboutUsPattern': "url(/hero/pattern1.svg)"
      }
    },
  },
  plugins: [],
};

