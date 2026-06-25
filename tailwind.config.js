/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          950: '#0A0F1E',
          900: '#0F172A',
          800: '#1E1B4B',
          700: '#312E81',
          600: '#4338CA',
        },
        // Logo-based Color Theme Mapping
        orange: {
          50: '#F5F3FF',   // light purple tint
          100: '#EDE9FE',  // light purple
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7E22CE',  // main brand purple
          550: '#6D28D9',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3B0764',  // deep purple
        },
        red: {
          50: '#F5F3FF',   // light brand purple tint
          100: '#EDE9FE',
          500: '#7E22CE',  // brand purple
          600: '#6D28D9',
          650: '#3C0764',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F59E0B',
          500: '#D4AF37',  // premium gold
          600: '#B89218',
          750: '#91710E',
        },
        purple: {
          50: '#F5F3FF',   // light purple tint
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7E22CE',  // main brand purple
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          850: '#3C0764',
          900: '#3B0764',  // deep purple
          950: '#2E054E',
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4.5s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
