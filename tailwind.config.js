// tailwind.config.js
export default {
  vpurge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'custom': ['fugui', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {
      padding: ['hover']
    },
  },
  plugins: [],
}
