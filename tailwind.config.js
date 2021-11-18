module.exports = {
  purge: {
    content: ['./public/index.html', './src/**/*.vue', './src/**/*.ts'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [],
}