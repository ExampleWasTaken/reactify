/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'green': '#1db954',
      'purple': 'rgb(49, 0, 69)',
      'white': '#ffffff',
      'black': '#191414',
    },
    extend: {},
  },
  plugins: [],
};

