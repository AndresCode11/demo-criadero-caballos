/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './src/**/*.{html,js}',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c8a675',   // Camel Arena más claro y luminoso
          hover: '#ddc295',     // Arena clara al hover
          container: '#af8c5c', // Tostado medio
          light: '#f1e6d6',     // Arena suave
          dark: '#8b6c3f',      // Marrón de contraste
        },
        surface: {
          base: '#1e222a',      // Fondo carbón suave
          lowest: '#181b22',    // Fondo secundario
          low: '#222832',       // Elevación baja
          card: '#2b323f',      // Tarjetas
          high: '#343d4d',      // Tarjetas elevadas
          highest: '#3f495a',   // Inputs y controles
          bright: '#4b576b',
        },
        sand: {
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
        border: {
          subtle: 'rgba(200, 166, 117, 0.24)',
          base: 'rgba(148, 163, 184, 0.2)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.15em',
        tighter: '-0.02em',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      maxWidth: {
        'container': '1440px',
      }
    },
  },
  plugins: [],
}
