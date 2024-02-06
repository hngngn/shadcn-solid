import { siteConfig } from "@/config/site"
import { A } from "@solidjs/router"

export const Footer = () => {
	return (
		<footer class="py-6 md:py-0 md:px-8 border-t">
			<div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built & designed by{" "}
						<A
							href={siteConfig.links.shadcn.twitter}
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
							GitHub.
						</A>
					</p>
				</div>
			</div>
		</footer>
	)
}
