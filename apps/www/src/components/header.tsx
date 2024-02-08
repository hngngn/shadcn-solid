import { siteConfig } from "@/config/site"
import ModeToggle from "@/registry/default/example/mode-toggle"
import { Button } from "@/registry/default/ui/button"
import { As } from "@kobalte/core"
import { A } from "@solidjs/router"
import { MobileNavbar } from "./mobile-navbar"
import { Navbar } from "./navbar"

export const Header = () => {
	return (
		<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div class="container flex h-14 max-w-screen-2xl items-center">
				<Navbar />
				<MobileNavbar />
				<div class="flex flex-1 items-center justify-end space-x-2">
					<div class="flex items-center">
						<Button asChild variant="ghost" size="icon">
							<As
								component={A}
								href={siteConfig.links.github}
								target="_blank"
								rel="noreferrer"
							>
								<span class="icon-[tabler--brand-github-filled] w-[18px] h-[18px]" />
								<span class="sr-only">Github</span>
							</As>
						</Button>
						<ModeToggle />
					</div>
				</div>
			</div>
		</header>
	)
}
