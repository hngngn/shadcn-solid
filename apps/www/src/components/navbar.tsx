import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/libs/cn";
import { store } from "@/store";
import { For } from "solid-js";
import Logo from "./logo";

const Navbar = () => {
	return (
		<div class="mr-4 hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<Logo class="h-6 w-6" />
				<span class="hidden font-bold sm:inline-block">{siteConfig.title}</span>
			</a>
			<nav class="flex items-center space-x-6 text-sm font-medium">
				<For each={docsConfig.mainNav}>
					{(item) => (
						<a
							href={item.href}
							class={cn(
								"transition-colors hover:text-foreground/80",
								store.pathname === item.href ||
									(item.href === "/docs/components/accordion" &&
										store.pathname.startsWith("/docs/components")) ||
									(item.href === "/examples/cards" &&
										store.pathname.startsWith("/examples"))
									? "text-foreground"
									: "opacity-60",
							)}
						>
							{item.title}
						</a>
					)}
				</For>
			</nav>
		</div>
	);
};

export default Navbar;
