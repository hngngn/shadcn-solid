import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: ["./default/ui/*.tsx", "./solid/ui/*.tsx", "./dev/*.tsx"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				foreground: "hsl(var(--foreground))",
				border: "hsl(var(--border))",
				alt_border: "hsl(var(--alt-border))",
				ring: "hsl(var(--ring))",
				active: "hsl(var(--active))",
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--kb-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--kb-accordion-content-height)" },
					to: { height: "0" },
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			},
			fontFamily: {
				sans: "Inter Variable",
			},
		},
	},
	plugins: [tailwindAnimate],
} satisfies Config;
