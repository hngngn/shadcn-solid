import { As } from "@kobalte/core"
import { A } from "solid-start"
import { siteConfig } from "~/config"
import { MainNav } from "./main-nav"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui"

export const SiteHeader = () => {
	return (
		<header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
			<div class="container flex h-14 items-center">
				<MainNav />
				<div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
					<nav class="flex items-center space-x-1">
						<Button asChild variant="ghost" size="sm">
							<As component={A} href={siteConfig.links.github}>
								<i class="i-lucide:github w-18px h-18px" />
							</As>
						</Button>
						<ModeToggle />
					</nav>
				</div>
			</div>
		</header>
	)
}
