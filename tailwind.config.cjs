/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
		fontFamily: {
			supermercado: ["Supermercado One", "cursive"],
			lobster: ["Lobster Two", "cursive"],
			germania: ["Germania One", "cursive"],
        },
	},
  },
  plugins: [require("@tailwindcss/typography")],
};
