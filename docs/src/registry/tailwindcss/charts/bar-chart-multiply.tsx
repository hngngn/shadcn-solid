import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/tailwindcss/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltipContent,
} from "@/registry/tailwindcss/ui/chart";
import { VisAxis, VisGroupedBar, VisTooltip } from "@unovis/solid";
import { GroupedBar } from "@unovis/ts";
import { render } from "solid-js/web";

type DataRecord = {
	month: string;
	desktop: number;
	mobile: number;
};

const data: DataRecord[] = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const BarChartMultiply = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Bar Chart - Multiply</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent class="h-[300px]">
				<ChartContainer
					config={chartConfig}
					type="xy"
					data={data}
					yDomain={[0, 310]}
				>
					<VisGroupedBar<DataRecord>
						x={(_, i) => i}
						y={[(d) => d.desktop, (d) => d.mobile]}
						color={["var(--color-desktop)", "var(--color-mobile)"]}
						roundedCorners={4}
						barPadding={0.2}
					/>
					<VisAxis<DataRecord>
						type="x"
						tickFormat={(d) => data[d as number].month.slice(0, 3)}
						gridLine={false}
						tickLine={false}
						domainLine={false}
						numTicks={data.length}
					/>
					<VisTooltip
						triggers={{
							[GroupedBar.selectors.bar]: (d: DataRecord, x) => {
								const container = document.createElement("div");
								const Component = () => (
									<ChartTooltipContent
										data={d}
										x={x}
										config={chartConfig}
										labelKey="month"
										indicator="dashed"
									/>
								);
								render(() => <Component />, container);
								return container.innerHTML;
							},
						}}
					/>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div class="flex w-full items-start gap-2 text-sm">
					<div class="grid gap-2">
						<div class="flex items-center gap-2 font-medium leading-none">
							Trending up by 5.2% this month{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-4"
								viewBox="0 0 24 24"
							>
								<g
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
								>
									<path d="m22 7l-8.5 8.5l-5-5L2 17" />
									<path d="M16 7h6v6" />
								</g>
							</svg>
						</div>
						<div class="flex items-center gap-2 leading-none text-muted-foreground">
							Showing total visitors for the last 6 months
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default BarChartMultiply;
