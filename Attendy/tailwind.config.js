/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      objectPosition: {
        'bottom-60': '0% 60%', 
      },
      fontFamily: {
        oleo: ["Oleo Script", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'bg-gray': '#d9d9d9'
      },
    },
  },
  plugins: [],
};
