/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Iqra Vista brand palette
        navy: {
          950: '#020B24',
          900: '#041538',
          800: '#061B4F',
          700: '#071F49',
          600: '#0A2A66',
        },
        brand: {
          royal: '#1455B8',
          bright: '#168FE8',
          emerald: '#18A96B',
          teal: '#16A6A0',
          gold: '#D9A441',
        },
        // Keep primary for backward compat
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#168FE8',
          600: '#1455B8',
          700: '#0A2A66',
          800: '#061B4F',
          900: '#041538',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#18A96B',
          600: '#059669',
          700: '#047857',
        },
        quran: {
          gold: '#D9A441',
          dark: '#061B4F',
          light: '#F5F8FC',
        },
        'iqra-primary': '#1455B8',
        'iqra-gold': '#D9A441',
        'iqra-navy': '#061B4F',
        'iqra-cream': '#F5F8FC',
        surface: '#F5F8FC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Scheherazade New', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(6,27,79,0.06), 0 4px 16px 0 rgba(6,27,79,0.06)',
        'card-hover': '0 4px 24px 0 rgba(6,27,79,0.12)',
        'glow-blue': '0 0 24px rgba(22,143,232,0.25)',
        'glow-emerald': '0 0 24px rgba(24,169,107,0.25)',
        'glow-gold': '0 0 24px rgba(217,164,65,0.25)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #061B4F 0%, #1455B8 50%, #168FE8 100%)',
        'gradient-dark': 'linear-gradient(160deg, #020B24 0%, #041538 50%, #061B4F 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #061B4F 0%, #18A96B 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D9A441 0%, #F0C060 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
