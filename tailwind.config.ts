import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        primary: {
          DEFAULT: 'var(--color-primary, #6A5446)',
          foreground: '#FFFFFF',
          50: '#F7F5F3',
          100: '#EFEBE7',
          200: '#DFD7CF',
          300: '#C7B8AA',
          400: '#A4907F',
          500: '#8A7363',
          600: '#6A5446',
          700: '#544136',
          800: '#3F3128',
          900: '#2B211C',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary, #B8924A)',
          foreground: '#FFFFFF',
          50: '#FBF8F0',
          100: '#F5ECCF',
          200: '#EDDC9E',
          300: '#E1C769',
          400: '#CFAC42',
          500: '#B8924A',
          600: '#997334',
          700: '#755427',
          800: '#563D20',
          900: '#3D2A18',
        },
        cream: {
          DEFAULT: 'var(--color-cream, #F5EEE2)',
          light: '#FAF6EE',
          dark: '#E8DCC9',
        },
        espresso: {
          DEFAULT: 'var(--color-espresso, #2B211C)',
          light: '#3C2F28',
          dark: '#1C1512',
        },
        blush: {
          DEFAULT: 'var(--color-blush, #E8D5C8)',
          light: '#F3E8DF',
          dark: '#D8BCAF',
        },
        gold: {
          400: '#E6C687',
          500: '#B8924A',
          600: '#997334',
        },
      },
      fontFamily: {
        serif: ['var(--font-heading)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Inter', 'Poppins', 'sans-serif'],
        script: ['var(--font-script)', 'Great Vibes', 'cursive'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(43, 33, 28, 0.08), 0 0 20px -5px rgba(184, 146, 74, 0.12)',
        'luxury-dark': '0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(184, 146, 74, 0.25)',
        'gold-glow': '0 0 25px rgba(184, 146, 74, 0.35)',
        'glass': '0 8px 32px 0 rgba(106, 84, 70, 0.12)',
      },
      borderRadius: {
        brand: 'var(--radius, 0.75rem)',
      },
      keyframes: {
        'cloth-wave': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'cloth-wave': 'cloth-wave 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;

