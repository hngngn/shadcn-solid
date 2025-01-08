import type { Registry } from "./schema"

export const charts: Registry = [
  // Area Charts
  {
    name: "area-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
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
    registryDependencies: ["card", "chart"],
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
    registryDependencies: ["card", "chart"],
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
    registryDependencies: ["card", "chart"],
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
    registryDependencies: ["card", "chart"],
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
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/area-chart-gradient.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "area-chart-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart", "use-mobile"],
    files: [
      {
        path: "charts/area-chart-interactive.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "bar-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "bar-chart-horizontal",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-horizontal.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "bar-chart-multiply",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-multiply.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "bar-chart-stacked",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-stacked.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "bar-chart-mixed",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-mixed.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "bar-chart-active",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-active.tsx",
        type: "registry:block",
      },
    ],
  },
]
