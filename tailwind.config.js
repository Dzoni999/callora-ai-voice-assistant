/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f8fa',
          100: '#eef1f5',
          200: '#dfe4ec',
          300: '#c2cad8',
          400: '#9aa6bd',
          500: '#6b7793',
          600: '#4a5670',
          700: '#323c52',
          800: '#1f2738',
          900: '#11161f',
          950: '#080b12',
        },
        electric: {
          50: '#eff8ff',
          100: '#daedff',
          200: '#bce0ff',
          300: '#8ecdff',
          400: '#58b0ff',
          500: '#2f8eff',
          600: '#1769f0',
          700: '#1254d4',
          800: '#1546ab',
          900: '#173e88',
          950: '#102654',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,22,31,0.04), 0 8px 24px rgba(16,22,31,0.06)',
        'soft-lg': '0 2px 4px rgba(16,22,31,0.05), 0 18px 48px rgba(16,22,31,0.10)',
        glow: '0 0 0 1px rgba(47,142,255,0.18), 0 12px 40px rgba(47,142,255,0.25)',
        'inner-line': 'inset 0 1px 0 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(16,22,31,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,22,31,0.04) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(60% 50% at 50% 0%, rgba(47,142,255,0.16) 0%, rgba(47,142,255,0) 70%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee 32s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
