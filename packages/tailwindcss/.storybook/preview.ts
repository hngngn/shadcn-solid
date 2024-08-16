import {
	withThemeByClassName,
	withThemeByDataAttribute,
} from "@storybook/addon-themes";
import type { SolidRenderer } from "storybook-solidjs";
import type { Preview } from "../types";

import "@fontsource-variable/inter";
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
		withThemeByDataAttribute<SolidRenderer>({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
			attributeName: "data-mode",
		}),
	],
} satisfies Preview;
