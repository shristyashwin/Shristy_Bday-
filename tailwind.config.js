/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe4e8',
          200: '#ffd1dc',
          300: '#fca5b9',
          400: '#f87192',
          500: '#f43f6e',
          600: '#e11d53',
        },
        roseGold: {
          300: '#e8b8a9',
          400: '#d99b89',
          500: '#b76e79',
          600: '#9b5660',
        },
        romantic: {
          red: '#be123c',
          darkRed: '#881337',
          cream: '#fffdf9',
          lavender: '#f5f0ff',
        }
      },
      fontFamily: {
        script: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        handwriting: ['"Caveat"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'flicker': 'candleFlicker 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(244,63,94,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(244,63,94,0.8))' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        candleFlicker: {
          '0%': { transform: 'scaleY(1) scaleX(1) rotate(-1deg)', opacity: '0.9' },
          '25%': { transform: 'scaleY(1.08) scaleX(0.95) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scaleY(0.92) scaleX(1.02) rotate(-2deg)', opacity: '0.85' },
          '75%': { transform: 'scaleY(1.05) scaleX(0.98) rotate(2deg)', opacity: '0.95' },
          '100%': { transform: 'scaleY(1) scaleX(1) rotate(0deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

