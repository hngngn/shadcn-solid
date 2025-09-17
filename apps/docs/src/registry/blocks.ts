import type { Registry } from "./schema"

export const blocks: Registry["items"] = [
  {
    name: "sidebar-01",
    type: "registry:block",
    description: "A sidebar that collapses to icons.",
    registryDependencies: [
      "sidebar",
      "separator",
      "collapsible",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-01/index.tsx",
        type: "registry:page",
        target: "routes/dashboard.tsx",
      },
      {
        path: "blocks/sidebar-01/components/app-sidebar.tsx",
        type: "registry:component",
        target: "components/app-sidebar.tsx",
      },
      {
        path: "blocks/sidebar-01/components/nav-main.tsx",
        type: "registry:component",
        target: "components/nav-main.tsx",
      },
      {
        path: "blocks/sidebar-01/components/nav-projects.tsx",
        type: "registry:component",
        target: "components/nav-projects.tsx",
      },
      {
        path: "blocks/sidebar-01/components/nav-user.tsx",
        type: "registry:component",
        target: "components/nav-user.tsx",
      },
      {
        path: "blocks/sidebar-01/components/team-switcher.tsx",
        type: "registry:component",
        target: "components/team-switcher.tsx",
      },
    ],
  },
]
