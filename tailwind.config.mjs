/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "#1492E6",
        background: "#FFFFFF",
        secoundary_background: "#F2F9FE",
        card: "#FFFFFF",
        light_btn: "#D2F5FF"
      },
    },
  },
  plugins: [],
};
