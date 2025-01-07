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
import { VisAxis, VisStackedBar, VisTooltip } from "@unovis/solid";
import { StackedBar } from "@unovis/ts";
import { render } from "solid-js/web";

type DataRecord = {
	month: string;
	desktop: number;
};

const data: DataRecord[] = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const BarChart = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Bar Chart</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent class="h-[300px]">
				<ChartContainer
					config={chartConfig}
					type="xy"
					data={data}
					yDomain={[0, 310]}
				>
					<VisStackedBar<DataRecord>
						x={(_, i) => i}
						y={(d) => d.desktop}
						color="var(--color-desktop)"
						roundedCorners={8}
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
							[StackedBar.selectors.bar]: (d: DataRecord, x) => {
								const container = document.createElement("div");
								const Component = () => (
									<ChartTooltipContent
										data={d}
										x={x}
										config={chartConfig}
										labelKey="month"
										hideLabel
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

export default BarChart;
