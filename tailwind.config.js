const { mauve, green, grass, blackA } = require('@radix-ui/colors')

// tailwind.config.js
export default {
  vpurge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...green,
        ...grass,
        ...blackA,
      },
      fontFamily: {
        custom: ['fugui', 'sans-serif'],
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        puffInCenter: {
          '0%': {
            filter: 'blur(3px)',
            opacity: 0,
            transform: 'scale(1.2)',
          },
          '100% ': {
            filter: 'blur(0)',
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        puffInCenter: 'puffInCenter .1s cubic-bezier(.47,0,.745,.715) both',
      },
    },
  },
  variants: {
    extend: {
      padding: ['hover'],
    },
  },
  plugins: [],
}
