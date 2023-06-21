import {
	defineConfig,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss"
import presetAutoPrefixer from "unocss-preset-autoprefixer"
import { presetKobalte } from "unocss-preset-primitives"
import type { Theme } from "unocss/preset-uno"
import { presetDarkMode } from "./src/lib"

export default defineConfig<Theme>({
	presets: [
		presetDarkMode(),
		presetUno(),
		presetAutoPrefixer(),
		presetWebFonts({
			fonts: {
				sans: {
					name: "Inter",
					italic: false,
					provider: "google",
					weights: [400, 500, 600, 700],
				},
			},
		}),
		presetIcons({
			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle",
			},
			customizations: {
				iconCustomizer(collection, icon, props) {
					if (collection === "lucide") {
						props.width = "1rem"
						props.height = "1rem"
					}
				},
			},
		}),
		presetKobalte(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			maxWidth: {
				"2xl": "1400px",
			},
		},
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
				DEFAULT: "hsl(var(--primary))",
				foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--secondary))",
				foreground: "hsl(var(--secondary-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--destructive))",
				foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--muted))",
				foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--accent))",
				foreground: "hsl(var(--accent-foreground))",
			},
			popover: {
				DEFAULT: "hsl(var(--popover))",
				foreground: "hsl(var(--popover-foreground))",
			},
			card: {
				DEFAULT: "hsl(var(--card))",
				foreground: "hsl(var(--card-foreground))",
			},
		},
		borderRadius: {
			lg: `var(--radius)`,
			md: `calc(var(--radius) - 2px)`,
			sm: "calc(var(--radius) - 4px)",
		},
		animation: {
			keyframes: {
				"accordion-down":
					"{ from { height: 0 } to { height: var(--kb-accordion-content-height) }}",
				"accordion-up":
					"{ from { height: var(--kb-accordion-content-height) } to { height: 0 }}",
			},
			durations: {
				"accordion-down": "200ms",
				"accordion-up": "200ms",
			},
			timingFns: {
				"accordion-down": "ease-out",
				"accordion-up": "ease-out",
			},
		},
	},
})
