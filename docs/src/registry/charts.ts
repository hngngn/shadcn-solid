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
  // Bar Charts
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
    name: "bar-chart-multiple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-multiple.tsx",
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
  {
    name: "bar-chart-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart", "use-mobile"],
    files: [
      {
        path: "charts/bar-chart-interactive.tsx",
        type: "registry:block",
      },
    ],
  },
  // Line Charts
  {
    name: "line-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "line-chart-linear",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart-linear.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "line-chart-multiple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart-multiple.tsx",
        type: "registry:block",
      },
    ],
  },
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
  // Circular Chart
  {
    name: "donut-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/donut-chart.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "donut-chart-pie",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/donut-chart-pie.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "donut-chart-legend",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/donut-chart-legend.tsx",
        type: "registry:block",
      },
    ],
  },
  // Tooltip
  {
    name: "chart-tooltip-default",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-default.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-line",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-line.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-no-indicator",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-no-indicator.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-custom-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-custom-label.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-label-formatter",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-label-formatter.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-no-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-no-label.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-formatter",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-formatter.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-icon",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-icon.tsx",
        type: "registry:block",
      },
    ],
  },
  {
    name: "chart-tooltip-advanced",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-advanced.tsx",
        type: "registry:block",
      },
    ],
  },
]
