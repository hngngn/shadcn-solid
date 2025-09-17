import type { Registry } from "./schema"

export const charts: Registry["items"] = [
  // Area Charts
  {
    name: "area-chart-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/area-chart-interactive.tsx",
        type: "registry:block",
      },
    ],
  },
  // Bar Charts
  {
    name: "bar-chart-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-interactive.tsx",
        type: "registry:block",
      },
    ],
  },
  // Line Charts
  {
    name: "line-chart-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart-interactive.tsx",
        type: "registry:block",
      },
    ],
  },
]
