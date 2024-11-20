/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(152,149,149,1) 44%, rgba(170,195,200,0.09173669467787116) 100%)'
      },
    },
  },
  plugins: [],
}