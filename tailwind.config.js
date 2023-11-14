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
        'black': '#191414',
      },
    },
  },
  plugins: [],
};

