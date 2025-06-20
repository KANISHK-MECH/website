/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // New minimalist color palette
        'forest': {
          50: '#f0f9f4',
          100: '#dcf2e7',
          200: '#bce5d1',
          300: '#8dd0b1',
          400: '#5ab48c',
          500: '#114b5f', // Main forest dark
          600: '#0f4254',
          700: '#0d3646',
          800: '#0b2b38',
          900: '#08202a',
        },
        'emerald': {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#1a936f', // Main emerald
          600: '#0f766e',
          700: '#0d5f5a',
          800: '#134e4a',
          900: '#134e4a',
        },
        'mint': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#88d498', // Main mint
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'sage': {
          50: '#f8faf8',
          100: '#f1f5f1',
          200: '#e3ebe3',
          300: '#d1ddd1',
          400: '#bcc9bc',
          500: '#c6dabf', // Main sage
          600: '#9fb09f',
          700: '#7a8a7a',
          800: '#5f6f5f',
          900: '#4a5a4a',
        },
        'cream': {
          50: '#fefefe',
          100: '#fdfcfa',
          200: '#fbf8f3',
          300: '#f8f3ea',
          400: '#f5ede1',
          500: '#f3e9d2', // Main cream
          600: '#e6d4b8',
          700: '#d4c09e',
          800: '#c2ac84',
          900: '#b0986a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};