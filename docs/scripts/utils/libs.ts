import type { Registry } from "./schema";

export const libs: Registry = [
	{
		name: "cn",
		type: "registry:libs",
		dependencies: ["clsx", "tailwind-merge"],
		files: [
			{
				path: "libs/cn.ts",
				type: "registry:libs",
			},
		],
	},
	{
		name: "call-handler",
		type: "registry:libs",
		files: [
			{
				path: "libs/call-handler.ts",
				type: "registry:libs",
			},
		],
	},
	{
		name: "combine-props",
		type: "registry:libs",
		files: [
			{
				path: "libs/combine-props.ts",
				type: "registry:libs",
			},
		],
	},
];
