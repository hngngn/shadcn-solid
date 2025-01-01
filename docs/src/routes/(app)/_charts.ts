import { clientOnly } from "@solidjs/start";

const AreaChart = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart"),
);
const AreaChartLinear = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart-linear"),
);
const AreaChartStep = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart-step"),
);
const AreaChartStacked = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart-stacked"),
);
const AreaChartLegend = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart-legend"),
);
const AreaChartGradient = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart-gradient"),
);
const AreaChartInteractive = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart-interactive"),
);

export const Chart = {
	AreaChart,
	AreaChartLinear,
	AreaChartStep,
	AreaChartStacked,
	AreaChartLegend,
	AreaChartGradient,
	AreaChartInteractive,
};
