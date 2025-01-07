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
	ChartCrosshair,
	ChartTooltipContent,
} from "@/registry/tailwindcss/ui/chart";
import { VisArea, VisAxis, VisLine, VisTooltip } from "@unovis/solid";
import { CurveType, Position } from "@unovis/ts";

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
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
				/>
			</svg>
		),
	},
} satisfies ChartConfig;

const AreaChartStep = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Area Chart - Step</CardTitle>
				<CardDescription>
					Showing total visitors for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent class="h-[300px]">
				<ChartContainer
					config={chartConfig}
					type="xy"
					data={data}
					yDomain={[0, 310]}
				>
					<VisArea<DataRecord>
						x={(_, i) => i}
						y={(d) => d.desktop}
						color="var(--color-desktop)"
						opacity={0.4}
						curveType={CurveType.Step}
					/>
					<VisLine<DataRecord>
						x={(_, i) => i}
						y={(d) => d.desktop}
						color="var(--color-desktop)"
						curveType={CurveType.Step}
						lineWidth={1}
					/>
					<VisAxis<DataRecord>
						type="x"
						tickFormat={(d) => data[d as number].month.slice(0, 3)}
						gridLine={false}
						tickLine={false}
						domainLine={false}
						numTicks={data.length}
					/>
					<ChartCrosshair<DataRecord>
						color="var(--color-desktop)"
						template={(props) => (
							<ChartTooltipContent labelKey="month" hideLabel {...props} />
						)}
					/>
					<VisTooltip horizontalPlacement={Position.Center} />
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
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default AreaChartStep;
