import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss/types/config";
import tailwindPreset from "../packages/tailwindcss/tailwind.config.js";

export default {
	darkMode: ["class", '[data-kb-theme="dark"]'],
	content: ["./src/**/*.{mdx,ts,tsx}", "../packages/tailwindcss/ui/**.tsx"],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "2rem",
				screens: {
					"2xl": "1536px",
				},
			},
			fontFamily: {
				sans: ["Geist Sans Variable", ...fontFamily.sans],
			},
		},
	},
	presets: [tailwindPreset],
} satisfies Config;