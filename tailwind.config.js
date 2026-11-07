/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scaler: {
          blue: '#1949D8',
          darkBlue: '#0b163f',
          deepNavy: '#070e28',
          royalBlue: '#153ca8',
          accentBlue: '#2563EB',
          lightBlue: '#EAF0FC',
          tableHeader: '#e9f1fc',
          tableBorder: '#cbdcf7',
          grayText: '#64748b',
          navText: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

