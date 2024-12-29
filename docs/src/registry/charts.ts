import type { Registry } from "./schema";

export const charts: Registry = [
	// Area Charts
	{
		name: "area-chart",
		type: "registry:block",
		registryDependencies: ["chart"],
		files: [
			{
				path: "charts/area-chart.tsx",
				type: "registry:block",
			},
		],
	},
	{
		name: "area-chart-linear",
		type: "registry:block",
		registryDependencies: ["chart"],
		files: [
			{
				path: "charts/area-chart-linear.tsx",
				type: "registry:block",
			},
		],
	},
	{
		name: "area-chart-step",
		type: "registry:block",
		registryDependencies: ["chart"],
		files: [
			{
				path: "charts/area-chart-step.tsx",
				type: "registry:block",
			},
		],
	},
	{
		name: "area-chart-stacked",
		type: "registry:block",
		registryDependencies: ["chart"],
		files: [
			{
				path: "charts/area-chart-stacked.tsx",
				type: "registry:block",
			},
		],
	},
	{
		name: "area-chart-legend",
		type: "registry:block",
		registryDependencies: ["chart"],
		files: [
			{
				path: "charts/area-chart-legend.tsx",
				type: "registry:block",
			},
		],
	},
	{
		name: "area-chart-gradient",
		type: "registry:block",
		registryDependencies: ["chart"],
		files: [
			{
				path: "charts/area-chart-gradient.tsx",
				type: "registry:block",
			},
		],
	},
];
