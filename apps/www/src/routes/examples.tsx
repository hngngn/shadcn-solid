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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-4 w-4"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
							/>
						</svg>
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
