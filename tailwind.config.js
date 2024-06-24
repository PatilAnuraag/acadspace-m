/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'tw-bg-blue-800/75',
    {
      pattern: /(bg|text)-(blue)-(800)/,
      variants: ['hover'],
    },
  ],
  prefix: 'tw-',
  important: true,
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('daisyui'),],
}