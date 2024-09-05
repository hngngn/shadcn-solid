import {
	defineConfig,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";
import presetAnimations from "unocss-preset-animations";

export default defineConfig({
	presets: [
		presetUno(),
		presetAnimations(),
		presetWebFonts({
			fonts: {
				sans: {
					name: "Inter",
					italic: false,
					provider: "bunny",
					weights: [400, 500, 600, 700],
				},
			},
		}),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	theme: {
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
		animation: {
			keyframes: {
				"accordion-down":
					"{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }",
				"accordion-up":
					"{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }",
				"caret-blink": "{ 0%,70%,100% { opacity: 1 } 20%,50% { opacity: 0 } }",
			},
			timingFns: {
				"accordion-down": "ease-out",
				"accordion-up": "ease-out",
				"caret-blink": "ease-out",
			},
			durations: {
				"accordion-down": "300ms",
				"accordion-up": "300ms",
				"caret-blink": "1.25s",
			},
			counts: {
				"caret-blink": "infinite",
			},
		},
	},
});
