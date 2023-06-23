import { A } from "solid-start"
import { siteConfig } from "~/config"

export const SiteFooter = () => {
	return (
		<footer class="py-6 md:(py-0 px-8)">
			<div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
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
						. The source code is available on{" "}
						<A
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							class="font-medium underline underline-offset-4"
						>
							GitHub .
						</A>
					</p>
				</div>
			</div>
		</footer>
	)
}
