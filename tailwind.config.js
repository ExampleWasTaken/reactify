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
        'subdued': '#a7a7a7',
        'negative': '#e91429',
        'warning': '#ffa42b',
        'positive': '#1ed760',
      },
      backgroundImage: {
        'aboutUsPattern': "url(/hero/pattern1.svg)"
      },
      scale: {
        active: '0.99'
      }
    },
  },
  plugins: [],
};

