import { Example } from "@/components/example"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/registry/default/ui/button"
import { A, type RouteSectionProps } from "@solidjs/router"
import { Balancer } from "solid-wrap-balancer"

const Examples = (props: RouteSectionProps) => {
	return (
		<div class="container relative">
			<section class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
				<h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] hidden md:block">
					Check out some examples
				</h1>
				<h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] block md:hidden">
					Examples
				</h1>
				<Balancer class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
					Some examples built using the components. Use this as a
					guide to build your own.
				</Balancer>
				<div class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
					<A href="/docs" class={buttonVariants()}>
						Get Started
					</A>
					<A
						target="_blank"
						rel="noreferrer"
						href={siteConfig.links.github}
						class={buttonVariants({ variant: "outline" })}
					>
						<span class="icon-[tabler--brand-github] mr-2 h-4 w-4" />
						GitHub
					</A>
				</div>
			</section>
			<section>
				<Example />
				<div class="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
					{props.children}
				</div>
			</section>
		</div>
	)
}

export default Examples
