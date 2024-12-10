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
			},
			{
				path: "blocks/sidebar-07/components/nav-main.tsx",
				type: "registry:component",
			},
			{
				path: "blocks/sidebar-07/components/nav-projects.tsx",
				type: "registry:component",
			},
			{
				path: "blocks/sidebar-07/components/nav-user.tsx",
				type: "registry:component",
			},
			{
				path: "blocks/sidebar-07/components/team-switcher.tsx",
				type: "registry:component",
			},
		],
		category: "Application",
		subcategory: "Sidebars",
	},
];
