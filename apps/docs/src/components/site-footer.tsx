import { A } from "solid-start"
import { siteConfig } from "~/config"
import { Logo } from "./logo"

export const SiteFooter = () => {
	return (
		<footer class="border-t py-6 md:py-0">
			<div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<Logo class="hidden h-6 w-6 md:inline-block" />
					<p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built & designed by{" "}
						<A
							href={siteConfig.links.shad.twitter}
							target="_blank"
							rel="noreferrer"
							class="font-medium underline underline-offset-4"
						>
							shadcn
						</A>
						. Ported to Solid by{" "}
						<A
							href={siteConfig.links.facebook}
							target="_blank"
							rel="noreferrer"
							class="font-medium underline underline-offset-4"
						>
							hngngn
						</A>
						.
					</p>
				</div>
			</div>
		</footer>
	)
}
