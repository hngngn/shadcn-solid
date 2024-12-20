import { siteConfig } from "@/config/site";

export const Footer = () => {
	return (
		<footer class="border-grid border-t py-6 md:px-8 md:py-0">
			<div class="container-wrapper">
				<div class="container py-4">
					<div class="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built & designed by{" "}
						<a
							href={siteConfig.links.shadcn.twitter}
							target="_blank"
							rel="noreferrer"
							class="font-medium underline underline-offset-4"
						>
							shadcn
						</a>
						. Ported to Solid by{" "}
						<a
							href={siteConfig.links.facebook}
							target="_blank"
							rel="noreferrer"
							class="font-medium underline underline-offset-4"
						>
							hngngn
						</a>
						. The source code is available on{" "}
						<a
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							class="font-medium underline underline-offset-4"
						>
							GitHub.
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
