import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      screens: {
        phone: '414px',
        phonelg: '568px',
        phoneToast:"600px",
        tablet: '768px',
        tabletlg: '960px',
        tabletxl: '1024px',
        laptop: '1200px',
        laptoplg: '1400px',
        desktop: '1700px'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.transform-text-front-laptop': {
          transform:
            'translateX(calc(0rem * var(--scale))) translateY(calc(-9rem * var(--scale))) translateZ(calc(7rem * var(--scale)))'
        },
        '.transform-text-front-movile': {
          transform:
            'translateX(0rem) translateY(-7.5rem) translateZ(7rem)'
        },
        '.transform-text-back-movile': {
          transform: 'translateX(0rem) translateY(-11rem) translateZ(-3rem)'
        },
        '.hover\\:transform-text-back-movile:hover': {
          transform: 'translateX(0rem) translateY(-11rem) translateZ(-3rem)'
        },
        '.transform-text-back-left-laptop': {
          transform:
            'translateX(calc(-10rem * var(--scale))) translateY(calc(-12rem * var(--scale))) translateZ(calc(-3rem * var(--scale)))'
        },
        '.hover\\:transform-text-back-left-laptop:hover': {
          transform:
            'translateX(calc(-10rem * var(--scale))) translateY(calc(-12rem * var(--scale))) translateZ(calc(-3rem * var(--scale)))'
        },
        '.transform-text-back-right-laptop': {
          transform:
            'translateX(calc(10rem * var(--scale))) translateY(calc(-12rem * var(--scale))) translateZ(calc(-3rem * var(--scale)))'
        },
        '.hover\\:transform-text-back-right-laptop:hover': {
          transform:
            'translateX(calc(10rem * var(--scale))) translateY(calc(-12rem * var(--scale))) translateZ(calc(-3rem * var(--scale)))'
        }
      }
      addUtilities(newUtilities)
    })
  ]
}

export default config
