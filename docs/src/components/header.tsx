import CommandMenu from "@/components/command-menu";
import { siteConfig } from "@/config/site";
import { Button } from "@/registry/tailwindcss/ui/button";
import { MobileNavbar } from "./mobile-navbar";
import ModeToggle from "./mode-toggle";
import { Navbar } from "./navbar";

export const Header = () => {
	return (
		<header class="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div class="container-wrapper">
				<div class="container flex h-14 items-center">
					<Navbar />
					<MobileNavbar />
					<div class="flex flex-1 items-center justify-between gap-2 md:justify-end">
						<div class="w-full flex-1 md:w-auto md:flex-none">
							<CommandMenu />
						</div>
						<div class="flex items-center gap-0.5">
							<Button
								as="a"
								variant="ghost"
								size="icon"
								href={siteConfig.links.github}
								target="_blank"
								rel="noreferrer"
								class="size-8 px-0"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 15 15"
									class="size-4"
								>
									<path
										fill="currentColor"
										fill-rule="evenodd"
										d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A7 7 0 0 1 7.5 3.756A7 7 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
										clip-rule="evenodd"
									/>
									<title>Shadcn-solid Github link</title>
								</svg>
							</Button>
						</div>
					</div>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};
