/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'config-border-color': '#ffffff50',
        'config-primary-color': '#111',
        'config-secondary-color': '#222',
        'config-text-color': '#fff',
        'config-hover-color': '#ffffff10',
      },
    },
  },
  plugins: [],
};
