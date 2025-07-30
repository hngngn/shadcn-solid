import type { Registry } from "./schema"

export const charts: Registry = [
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
]
