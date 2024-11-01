import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{astro,mdx,ts,tsx}",
		"../packages/tailwindcss/ui/**.tsx",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "2rem",
				screens: {
					"2xl": "1400px",
				},
			},
			fontFamily: {
				sans: ["Geist Sans Variable", ...fontFamily.sans],
			},
		},
	},
	presets: [require("../packages/tailwindcss/tailwind.config.js")],
};
