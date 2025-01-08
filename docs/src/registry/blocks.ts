import type { Registry } from "./schema"

export const blocks: Registry = [
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
        target: "src/routes/dashboard.tsx",
      },
      {
        path: "blocks/sidebar-01/components/app-sidebar.tsx",
        type: "registry:component",
        target: "src/components/app-sidebar.tsx",
      },
      {
        path: "blocks/sidebar-01/components/nav-main.tsx",
        type: "registry:component",
        target: "src/components/nav-main.tsx",
      },
      {
        path: "blocks/sidebar-01/components/nav-projects.tsx",
        type: "registry:component",
        target: "src/components/nav-projects.tsx",
      },
      {
        path: "blocks/sidebar-01/components/nav-user.tsx",
        type: "registry:component",
        target: "src/components/nav-user.tsx",
      },
      {
        path: "blocks/sidebar-01/components/team-switcher.tsx",
        type: "registry:component",
        target: "src/components/team-switcher.tsx",
      },
    ],
  },
  {
    name: "sidebar-02",
    type: "registry:block",
    description: "A floating sidebar with submenus.",
    registryDependencies: ["sidebar"],
    files: [
      {
        path: "blocks/sidebar-02/index.tsx",
        type: "registry:page",
        target: "src/routes/dashboard.tsx",
      },
      {
        path: "blocks/sidebar-02/components/app-sidebar.tsx",
        type: "registry:component",
        target: "src/components/app-sidebar.tsx",
      },
    ],
  },
  {
    name: "sidebar-03",
    type: "registry:block",
    description: "An inset sidebar with secondary navigation.",
    registryDependencies: ["sidebar", "collapsible", "dropdown-menu"],
    files: [
      {
        path: "blocks/sidebar-03/index.tsx",
        type: "registry:page",
        target: "src/routes/dashboard.tsx",
      },
      {
        path: "blocks/sidebar-03/components/app-sidebar.tsx",
        type: "registry:component",
        target: "src/components/app-sidebar.tsx",
      },
      {
        path: "blocks/sidebar-03/components/nav-main.tsx",
        type: "registry:component",
        target: "src/components/nav-main.tsx",
      },
      {
        path: "blocks/sidebar-03/components/nav-projects.tsx",
        type: "registry:component",
        target: "src/components/nav-projects.tsx",
      },
      {
        path: "blocks/sidebar-03/components/nav-user.tsx",
        type: "registry:component",
        target: "src/components/nav-user.tsx",
      },
      {
        path: "blocks/sidebar-03/components/nav-secondary.tsx",
        type: "registry:component",
        target: "src/components/nav-secondary.tsx",
      },
    ],
  },
]
