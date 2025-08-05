import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'card-bg': 'var(--card-bg)',
        'card-border': 'var(--card-border)',
        beige: {
          light: 'var(--beige-light)',
          DEFAULT: 'var(--beige)',
          dark: 'var(--beige-dark)',
        },
        cream: 'var(--cream)',
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        'warm-white': 'var(--warm-white)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config