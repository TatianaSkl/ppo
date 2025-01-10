/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      container: {
        center: true,
        width: { max: '1280px' },
        padding: '2rem',
      },
    },
  },
  plugins: [],
};
