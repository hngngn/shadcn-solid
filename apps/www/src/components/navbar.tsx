import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/cn"
import { A, useLocation } from "@solidjs/router"
import { For, createEffect } from "solid-js"
import { Logo } from "./logo"

export const Navbar = () => {
	const location = useLocation()

	createEffect(() => {
		console.log(location)
	})

	return (
		<div class="mr-4 hidden md:flex">
			<A href="/" class="mr-6 flex items-center space-x-2">
				<Logo class="h-6 w-6" />
				<span class="hidden font-bold sm:inline-block">
					{siteConfig.title}
				</span>
			</A>
			<nav class="flex items-center space-x-6 text-sm font-medium">
				<For each={docsConfig.mainNav}>
					{(item) => (
						<A
							href={item.href!}
							class={cn(
								"transition-colors hover:text-foreground/80",
								location.pathname === item.href ||
									(item.href ===
										"/docs/components/accordion" &&
										location.pathname.startsWith(
											"/docs/components"
										)) ||
									(item.href === "/examples/cards" &&
										location.pathname.startsWith(
											"/examples"
										))
									? "text-foreground"
									: "opacity-60"
							)}
						>
							{item.title}
						</A>
					)}
				</For>
			</nav>
		</div>
	)
}
