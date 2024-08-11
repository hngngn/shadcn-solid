import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";

export const [config, setConfig] = makePersisted(
	createStore({
		style: {
			name: "default",
			label: "Default",
		},
		framework: {
			name: "tailwindcss",
			label: "TailwindCSS",
		},
	}),
	{
		name: "config",
	},
);
