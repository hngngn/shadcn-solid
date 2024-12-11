import type { Registry } from "./schema";

export const blocks: Registry = [
	{
		name: "sidebar-07",
		type: "registry:block",
		registryDependencies: [
			"sidebar",
			"separator",
			"collapsible",
			"dropdown-menu",
			"drawer",
		],
		files: [
			{
				path: "blocks/sidebar-07/index.tsx",
				type: "registry:page",
				target: "src/routes/dashboard.tsx",
			},
			{
				path: "blocks/sidebar-07/components/app-sidebar.tsx",
				type: "registry:component",
				target: "src/components/app-sidebar.tsx",
			},
			{
				path: "blocks/sidebar-07/components/nav-main.tsx",
				type: "registry:component",
				target: "src/components/nav-main.tsx",
			},
			{
				path: "blocks/sidebar-07/components/nav-projects.tsx",
				type: "registry:component",
				target: "src/components/nav-projects.tsx",
			},
			{
				path: "blocks/sidebar-07/components/nav-user.tsx",
				type: "registry:component",
				target: "src/components/nav-user.tsx",
			},
			{
				path: "blocks/sidebar-07/components/team-switcher.tsx",
				type: "registry:component",
				target: "src/components/team-switcher.tsx",
			},
		],
		category: "Application",
		subcategory: "Sidebars",
	},
];
