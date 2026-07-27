/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './public/admin/**/*.{html,yml}'],
  theme: {
    extend: {
      fontFamily: {
        bangla: ['Noto Sans Bengali', 'Hind Siliguri', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff8ed',
          100: '#fcedd4',
          200: '#f8d69b',
          300: '#f1b85a',
          400: '#e99829',
          500: '#d87b18',
          600: '#b85d11',
          700: '#934516',
          800: '#76381a',
          900: '#5f3019'
        },
        leaf: {
          50: '#f3f8ec',
          100: '#e4eed5',
          500: '#6f8f3a',
          700: '#3f5523'
        }
      },
      boxShadow: {
        soft: '0 18px 60px rgba(95, 48, 25, .12)'
      }
    },
  },
  plugins: [],
}
