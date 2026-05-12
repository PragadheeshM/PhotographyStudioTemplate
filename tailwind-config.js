tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#080608',
          50:  '#f5f0f2',
          100: '#e1dce0',
          200: '#c2bcbf',
          300: '#a39d9f',
          400: '#858082',
          500: '#666364',
          600: '#4d4b4c',
          700: '#333232',
          800: '#1a1819',
          900: '#080608',
        },
        secondary: {
          DEFAULT: '#160B10',
          50:  '#f2eef0',
          100: '#d9ced3',
          200: '#b0a0a5',
          300: '#877378',
          400: '#5c464c',
          500: '#402a30',
          600: '#2e1c21',
          700: '#241318',
          800: '#160B10',
          900: '#0a0305',
        },
        accent: {
          DEFAULT: '#E11D48',
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'bold': '600',
        'extrabold': '600',
        'black': '600',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':    'spin 20s linear infinite',
        'fade-in-up':   'fadeInUp 0.6s ease forwards',
        'counter':      'counter 2s ease forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glass':    '0 8px 32px 0 rgba(225,29,72,0.15)',
        'gold':     '0 0 30px rgba(225,29,72,0.4)',
        'premium':  '0 25px 50px -12px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
};
