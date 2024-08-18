import { withThemeByClassName } from "@storybook/addon-themes";
import type { SolidRenderer } from "storybook-solidjs";
import type { Preview } from "../types";

import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./style.css";

export default {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		withThemeByClassName<SolidRenderer>({
			themes: {
				light: "",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
} satisfies Preview;
