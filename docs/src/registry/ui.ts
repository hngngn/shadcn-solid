import type { Registry } from "./schema";

export const ui: Registry = [
	{
		name: "accordion",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/accordion.tsx",
				type: "registry:ui",
			},
		],
		tailwind: {
			config: {
				theme: {
					extend: {
						keyframes: {
							"accordion-down": {
								from: { height: 0 },
								to: { height: "var(--kb-accordion-content-height)" },
							},
							"accordion-up": {
								from: { height: "var(--kb-accordion-content-height)" },
								to: { height: 0 },
							},
						},
						animation: {
							"accordion-down": "accordion-down 0.2s ease-out",
							"accordion-up": "accordion-up 0.2s ease-out",
						},
					},
				},
			},
		},
		uno: {
			config: {
				theme: {
					animation: {
						keyframes: {
							"accordion-down":
								"{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }",
							"accordion-up":
								"{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }",
						},
						timingFns: {
							"accordion-down": "ease-out",
							"accordion-up": "ease-out",
						},
						durations: {
							"accordion-down": "0.2s",
							"accordion-up": "0.2s",
						},
					},
				},
			},
		},
	},
	{
		name: "alert-dialog",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		registryDependencies: ["button"],
		files: [
			{
				path: "ui/alert-dialog.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "alert",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/alert.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "badge",
		type: "registry:ui",
		files: [
			{
				path: "ui/badge.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "button",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/button.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "card",
		type: "registry:ui",
		files: [
			{
				path: "ui/card.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "carousel",
		type: "registry:ui",
		dependencies: ["embla-carousel-solid"],
		registryDependencies: ["button"],
		files: [
			{
				path: "ui/carousel.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "checkbox",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/checkbox.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "collapsible",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/collapsible.tsx",
				type: "registry:ui",
			},
		],
		tailwind: {
			config: {
				theme: {
					extend: {
						keyframes: {
							"collapsible-down": {
								from: { height: 0 },
								to: { height: "var(--kb-collapsible-content-height)" },
							},
							"collapsible-up": {
								from: { height: "var(--kb-collapsible-content-height)" },
								to: { height: 0 },
							},
						},
						animation: {
							"collapsible-down": "collapsible-down 0.2s ease-out",
							"collapsible-up": "collapsible-up 0.2s ease-out",
						},
					},
				},
			},
		},
		uno: {
			config: {
				theme: {
					animation: {
						keyframes: {
							"collapsible-down":
								"{ from { height: 0 } to { height: var(--kb-collapsible-content-height) } }",
							"collapsible-up":
								"{ from { height: var(--kb-collapsible-content-height) } to { height: 0 } }",
						},
						timingFns: {
							"collapsible-down": "ease-out",
							"collapsible-up": "ease-out",
						},
						durations: {
							"collapsible-down": "0.2s",
							"collapsible-up": "0.2s",
						},
					},
				},
			},
		},
	},
	{
		name: "combobox",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		registryDependencies: ["button"],
		files: [
			{
				path: "ui/combobox.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "command",
		type: "registry:ui",
		dependencies: ["cmdk-solid"],
		registryDependencies: ["dialog"],
		files: [
			{
				path: "ui/command.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "context-menu",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/context-menu.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "date-picker",
		type: "registry:ui",
		dependencies: ["@ark-ui/solid"],
		registryDependencies: ["button"],
		files: [
			{
				path: "ui/date-picker.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "dialog",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/dialog.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "drawer",
		type: "registry:ui",
		dependencies: ["@corvu/drawer"],
		files: [
			{
				path: "ui/drawer.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "dropdown-menu",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/dropdown-menu.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "hover-card",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/hover-card.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "menubar",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/menubar.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "navigation-menu",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/navigation-menu.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "number-field",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		registryDependencies: ["text-field"],
		files: [
			{
				path: "ui/number-field.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "otp-field",
		type: "registry:ui",
		dependencies: ["@corvu/otp-field"],
		files: [
			{
				path: "ui/otp-field.tsx",
				type: "registry:ui",
			},
		],
		tailwind: {
			config: {
				theme: {
					extend: {
						keyframes: {
							"caret-blink": {
								"0%,70%,100%": { opacity: "1" },
								"20%,50%": { opacity: "0" },
							},
						},
						animation: {
							"caret-blink": "caret-blink 1.25s ease-out infinite",
						},
					},
				},
			},
		},
		uno: {
			config: {
				theme: {
					animation: {
						keyframes: {
							"caret-blink":
								"{ 0%,70%,100% { opacity: 1 } 20%,50% { opacity: 0 } }",
						},
						timingFns: {
							"caret-blink": "ease-out",
						},
						durations: {
							"caret-blink": "1.25s",
						},
						counts: {
							"caret-blink": "infinite",
						},
					},
				},
			},
		},
	},
	{
		name: "popover",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/popover.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "pagination",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		registryDependencies: ["button"],
		files: [
			{
				path: "ui/pagination.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "progress",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/progress.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "radio-group",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/radio-group.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "resizable",
		type: "registry:ui",
		dependencies: ["@corvu/resizable"],
		files: [
			{
				path: "ui/resizable.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "select",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/select.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "separator",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/separator.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "skeleton",
		type: "registry:ui",
		files: [
			{
				path: "ui/skeleton.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "sonner",
		type: "registry:ui",
		dependencies: ["somoto"],
		files: [
			{
				path: "ui/sonner.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "switch",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/switch.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "table",
		type: "registry:ui",
		files: [
			{
				path: "ui/table.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "tabs",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/tabs.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "textfield",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/textfield.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "textarea",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		registryDependencies: ["textfield"],
		files: [
			{
				path: "ui/textarea.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "toast",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/toast.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "toggle-group",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/toggle-group.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "toggle",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/toggle.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "tooltip",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		files: [
			{
				path: "ui/tooltip.tsx",
				type: "registry:ui",
			},
		],
	},
	{
		name: "sidebar",
		type: "registry:ui",
		dependencies: ["@kobalte/core"],
		registryDependencies: [
			"call-handler",
			"combine-props",
			"button",
			"drawer",
			"separator",
			"skeleton",
			"textfield",
			"tooltip",
		],
		files: [
			{
				path: "ui/tooltip.tsx",
				type: "registry:ui",
			},
		],
		tailwind: {
			config: {
				theme: {
					extend: {
						colors: {
							sidebar: {
								DEFAULT: "hsl(var(--sidebar-background))",
								foreground: "hsl(var(--sidebar-foreground))",
								primary: "hsl(var(--sidebar-primary))",
								"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
								accent: "hsl(var(--sidebar-accent))",
								"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
								border: "hsl(var(--sidebar-border))",
								ring: "hsl(var(--sidebar-ring))",
							},
						},
					},
				},
			},
		},
		uno: {
			config: {
				theme: {
					colors: {
						sidebar: {
							DEFAULT: "hsl(var(--sidebar-background))",
							foreground: "hsl(var(--sidebar-foreground))",
							primary: {
								DEFAULT: "hsl(var(--sidebar-primary))",
								foreground: "hsl(var(--sidebar-primary-foreground))",
							},
							accent: {
								DEFAULT: "hsl(var(--sidebar-accent))",
								foreground: "hsl(var(--sidebar-accent-foreground))",
							},
							border: "hsl(var(--sidebar-border))",
							ring: "hsl(var(--sidebar-ring))",
						},
					},
				},
			},
		},
		cssVars: {
			light: {
				"sidebar-background": "0 0% 98%",
				"sidebar-foreground": "240 5.3% 26.1%",
				"sidebar-primary": "240 5.9% 10%",
				"sidebar-primary-foreground": "0 0% 98%",
				"sidebar-accent": "240 4.8% 95.9%",
				"sidebar-accent-foreground": "240 5.9% 10%",
				"sidebar-border": "220 13% 91%",
				"sidebar-ring": "217.2 91.2% 59.8%",
			},
			dark: {
				"sidebar-background": "240 5.9% 10%",
				"sidebar-foreground": "240 4.8% 95.9%",
				"sidebar-primary": "224.3 76.3% 48%",
				"sidebar-primary-foreground": "0 0% 100%",
				"sidebar-accent": "240 3.7% 15.9%",
				"sidebar-accent-foreground": "240 4.8% 95.9%",
				"sidebar-border": "240 3.7% 15.9%",
				"sidebar-ring": "217.2 91.2% 59.8%",
			},
		},
	},
];
