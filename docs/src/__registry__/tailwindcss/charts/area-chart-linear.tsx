import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/tailwindcss/ui/card";
import {
	ChartContainer,
	ChartCrosshair,
	ChartTooltipContent,
} from "@/registry/tailwindcss/ui/chart";
import { VisArea, VisAxis, VisLine, VisTooltip } from "@unovis/solid";
import { Area, CurveType, Position } from "@unovis/ts";

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

const AreaChartLinear = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Area Chart - Linear</CardTitle>
				<CardDescription>
					Showing total visitors for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer type="xy" data={data}>
					<VisArea<DataRecord>
						x={(_, i) => i}
						y={(d) => d.desktop}
						color="auto"
						opacity={0.7}
						curveType={CurveType.Linear}
						attributes={{
							[Area.selectors.area]: {
								fill: "url(#chart-linear-gradient-1)",
							},
						}}
					/>
					<VisLine<DataRecord>
						x={(_, i) => i}
						y={(d) => d.desktop}
						curveType={CurveType.Linear}
						color="hsl(var(--chart-1))"
						lineWidth={1.5}
					/>
					<VisAxis<DataRecord>
						type="x"
						tickFormat={(d) => {
							if (typeof d === "number") {
								return data[d]?.month;
							}
							return "";
						}}
						y={(d) => d.desktop + 20}
						gridLine={false}
						tickLine={false}
						domainLine={false}
						numTicks={data.length}
					/>
					<ChartCrosshair<DataRecord>
						color="hsl(var(--chart-1))"
						template={(props) => (
							<ChartTooltipContent
								labelKey="month"
								indicator="dot"
								hideLabel
								{...props}
							/>
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

export default AreaChartLinear;
