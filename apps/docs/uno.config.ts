import {
	defineConfig,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss"
import presetAutoPrefixer from "unocss-preset-autoprefixer"
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
				width: "1rem",
				height: "1rem",
			},
		}),
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
				"collapsible-down":
					"{ from { height: 0 } to { height: var(--kb-collapsible-content-height) }}",
				"collapsible-up":
					"{ from { height: var(--kb-collapsible-content-height) } to { height: 0 }}",
				"dropdown-show":
					"{ from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: scale(1) }}",
				"dropdown-hide":
					"{ from { opacity: 1; transform: scale(1) } to { opacity: 0; transform: scale(0.96) }}",
			},
			durations: {
				"accordion-down": "200ms",
				"accordion-up": "200ms",
				"collapsible-down": "200ms",
				"collapsible-up": "200ms",
				"dropdown-show": "200ms",
				"dropdown-hide": "200ms",
				"slide-out-left": "200ms",
				"slide-in-left": "300ms",
				"slide-out-right": "200ms",
				"slide-in-right": "300ms",
				"slide-out-down": "200ms",
				"slide-in-down": "300ms",
				"slide-out-up": "200ms",
				"slide-in-up": "300ms",
				"fade-in": "100ms",
				"fade-out": "100ms",
			},
			timingFns: {
				"accordion-down": "ease-out",
				"accordion-up": "ease-out",
				"collapsible-down": "ease-out",
				"collapsible-up": "ease-out",
				"dropdown-show": "ease-out",
				"dropdown-hide": "ease-in",
				"slide-out-left": "ease-out",
				"slide-in-left": "ease-in",
				"slide-out-right": "ease-out",
				"slide-in-right": "ease-in",
				"slide-out-down": "ease-out",
				"slide-in-down": "ease-in",
				"slide-out-up": "ease-out",
				"slide-in-up": "ease-in",
				"fade-in": "ease-in",
				"fade-out": "ease-out",
			},
			counts: {
				"dropdown-hide": "forwards",
			},
		},
	},
})
