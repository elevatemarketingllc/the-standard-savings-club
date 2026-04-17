/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50:  '#fdf2f3',
          100: '#fce7e8',
          200: '#f8d2d4',
          300: '#f2adb1',
          400: '#e87c82',
          500: '#d94f57',
          600: '#c4333b',
          700: '#6e383b',
          800: '#5a2d2f',
          900: '#4a2526',
          950: '#2a1415',
        },
        accent: {
          100: '#f0f0f0',
          200: '#d8d8d8',
          300: '#c2c2c2',
          400: '#a8a8a8',
          500: '#8c8c8c',
          600: '#707070',
        },
        cream: '#f8f4ef',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
