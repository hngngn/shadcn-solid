import { resolve } from "node:path";
import type { StorybookConfig } from "../types";

export default {
	stories: ["../dev/**/*.stories.@(ts|tsx)"],
	addons: ["@storybook/addon-essentials", "@storybook/addon-themes"],
	framework: {
		name: "storybook-solidjs-vite",
		options: {},
	},
	viteFinal: (config) => {
		config.resolve = {
			alias: {
				"@/libs": resolve(__dirname, "../libs"),
			},
		};

		return config;
	},
} satisfies StorybookConfig;
