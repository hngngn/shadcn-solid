import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { Button } from "@/registry/default/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/registry/default/ui/sheet"
import { As, createDisclosureState } from "@kobalte/core"
import { A, useIsRouting } from "@solidjs/router"
import { For, createComputed } from "solid-js"
import { Logo } from "./logo"
import { Sidebar } from "./sidebar"

export const MobileNavbar = () => {
	const { isOpen, setIsOpen, close } = createDisclosureState()

	const isRouting = useIsRouting()

	createComputed(() => isRouting() && close())

	return (
		<Sheet open={isOpen()} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<As
					component={Button}
					variant="ghost"
					size="icon"
					class="mr-1 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-4 h-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16"
						/>
					</svg>
					<span class="sr-only">Toggle Menu</span>
				</As>
			</SheetTrigger>
			<SheetContent side="left" class="pr-0">
				<A href="/" class="flex items-center">
					<Logo class="mr-2 h-4 w-4" />
					<span class="font-bold">{siteConfig.title}</span>
				</A>
				<div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-y-auto">
					<div class="flex flex-col space-y-3">
						<div class="text-sm flex flex-col">
							<For each={docsConfig.mainNav}>
								{(item) => (
									<A
										href={item.href!}
										class="transition-colors hover:text-foreground/80 px-2 py-1 text-foreground"
									>
										{item.title}
									</A>
								)}
							</For>
						</div>
						<Sidebar />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
