import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/ui/**/*.{tsx,mdx}', './src/app/**/*.{tsx,mdx}'],
  theme: {
    fontWeight: { sans: '400', 'sans-semibold': '700', serif: '500' },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
      },
      textColor: { 1: '#b0b0b0', 2: '#7b7b7b' },
      backgroundColor: { 1: '#0e0f11', 2: '#222222' },
      colors: { brand: '#fff' },
      borderColor: { DEFAULT: '#313131', default: '#313131' },
      spacing: {
        'fluid-1': 'clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)',
        'fluid-2': 'clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)',
        'fluid-3': 'clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)',
        'fluid-4': 'clamp(1rem, calc(0.22rem + 3.9vw), 3rem)',
        'fluid-5': 'clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)',
        'fluid-6': 'clamp(2rem, calc(0.44rem + 7.8vw), 6rem)',
        'fluid-7': 'clamp(3rem, calc(0.66rem + 11.71vw), 9rem)',
      },
      // prettier-ignore
      boxShadow: { DEFAULT: '0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12)' },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-fluid-type'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-fancy': {
          color: 'transparent',
          textShadow: '-1px -1px 0 hsla(0,0%,100%,.2), 1px 1px 0 rgba(0,0,0,.1)',
          '-webkit-text-stroke': '0.4px #ffffff80',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-gradient': { background: 'linear-gradient(to bottom right, #1a1a1a, #0c0c0c)' },
        '.bg-gradient-hover': { background: 'linear-gradient(to bottom right, #2c2c2c, #0c0c0c)' },
      });
    }),
  ],
} satisfies Config;
