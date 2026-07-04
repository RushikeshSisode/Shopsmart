/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'amazon-orange': '#FF9900',
        'amazon-nav': '#232F3E',
        'amazon-dark': '#131A22',
        'amazon-blue': '#007185',
        'amazon-yellow': '#F0C14B',
      },
      fontFamily: {
        'amazon': ['"Amazon Ember"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};