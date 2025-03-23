/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "select-arrow": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='-139.52 -43.52 599.04 599.04' fill='%23004d61' %3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E")`,
      },
      colors: {
        background: "var(--background)",
        foreground: "#004D61",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "roboto-mono": ["Roboto mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
