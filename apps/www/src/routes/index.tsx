import { Example } from "@/components/example"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/registry/default/ui/button"
import { A } from "@solidjs/router"
import { Balancer } from "solid-wrap-balancer"
import Cards from "./examples/cards"

const Home = () => {
	return (
		<div class="container relative">
			<section class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
				<h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
					Build your component library
				</h1>
				<Balancer class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
					Beautifully designed components that you can copy and paste
					into your apps. Accessible. Customizable. Open Source.
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
			<Example />
			<section class="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
				<img
					src="/examples/cards-dark.png"
					width={1280}
					height={727}
					alt="Mail"
					class="hidden dark:block"
				/>
				<img
					src="/examples/cards-light.png"
					width={1280}
					height={727}
					alt="Mail"
					class="block dark:hidden"
				/>
			</section>
			<section class="hidden md:block">
				<div class="overflow-hidden rounded-lg border bg-background shadow-lg">
					<Cards />
				</div>
			</section>
		</div>
	)
}

export default Home
