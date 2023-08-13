import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/ui/**/*.{tsx,mdx}', './src/app/**/*.{tsx,mdx}'],
  theme: {
    fontWeight: { sans: '400', serif: '500' },
    extend: {
      fontFamily: { sans: ['var(--font-sans)', ...fontFamily.sans] },
      backgroundColor: { 1: colors.neutral[950], 2: colors.neutral[800] },
      textColor: { 1: colors.neutral[400], 2: colors.neutral[500] },
      borderColor: { DEFAULT: colors.neutral[800] },
      ringColor: { DEFAULT: colors.neutral[800] },
      spacing: {
        'fluid-1': 'clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)',
        'fluid-2': 'clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)',
        'fluid-3': 'clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)',
        'fluid-4': 'clamp(1rem, calc(0.22rem + 3.9vw), 3rem)',
        'fluid-5': 'clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)',
        'fluid-6': 'clamp(2rem, calc(0.44rem + 7.8vw), 6rem)',
        'fluid-7': 'clamp(3rem, calc(0.66rem + 11.71vw), 9rem)',
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-fluid-type'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-fancy': {
          color: 'transparent',
          textShadow: '-1px -1px 0 hsla(0,0%,100%,.49), 1px 1px 0 rgba(0,0,0,.1)',
          '-webkit-text-stroke': '0.4px #ffffff80',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    }),
  ],
} satisfies Config;
