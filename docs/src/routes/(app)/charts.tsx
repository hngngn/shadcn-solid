import { Announcement } from "@/components/announcement";
import ChartDisplay from "@/components/chart-display";
import AreaChartGradient from "@/registry/tailwindcss/charts/area-chart-gradient";
import AreaChartLegend from "@/registry/tailwindcss/charts/area-chart-legend";
import AreaChartLinear from "@/registry/tailwindcss/charts/area-chart-linear";
import AreaChartStacked from "@/registry/tailwindcss/charts/area-chart-stacked";
import AreaChartStep from "@/registry/tailwindcss/charts/area-chart-step";
import { Button } from "@/registry/tailwindcss/ui/button";
import { clientOnly } from "@solidjs/start";

const AreaChart = clientOnly(
	() => import("@/registry/tailwindcss/charts/area-chart"),
);

const ChartsPage = () => {
	return (
		<>
			<section class="border-grid border-b">
				<div class="container-wrapper">
					<div class="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
						<Announcement />
						<h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
							Beautiful Charts
						</h1>
						<p class="max-w-2xl text-balance text-lg font-light text-foreground">
							Built using Unovis. Copy and paste into your apps. Open Source.
						</p>
						<div class="flex w-full items-center justify-start gap-2 py-2">
							<Button as="a" href="#charts" size="sm">
								Browse Charts
							</Button>
							<Button
								as="a"
								href="/docs/components/chart"
								size="sm"
								variant="ghost"
							>
								Documentation
							</Button>
						</div>
					</div>
				</div>
			</section>
			<div class="container-wrapper">
				<div class="container py-6">
					<section id="charts" class="scroll-mt-20">
						<div class="grid gap-4">
							<div class="gap-6 md:flex md:flex-row-reverse md:items-start">
								<div class="grid flex-1 gap-12">
									<div
										class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
										id="area-chart"
									>
										<ChartDisplay name="chart-area">
											<AreaChart />
										</ChartDisplay>
										<ChartDisplay name="chart-area-linear">
											<AreaChartLinear />
										</ChartDisplay>
										<ChartDisplay name="chart-area-step">
											<AreaChartStep />
										</ChartDisplay>
										<ChartDisplay name="chart-area-stacked">
											<AreaChartStacked />
										</ChartDisplay>
										<ChartDisplay name="chart-area-legend">
											<AreaChartLegend />
										</ChartDisplay>
										<ChartDisplay name="chart-area-gradient">
											<AreaChartGradient />
										</ChartDisplay>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default ChartsPage;
