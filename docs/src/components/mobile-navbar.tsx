import { Button } from "@repo/tailwindcss/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
} from "@repo/tailwindcss/ui/drawer";
import { useBeforeLeave } from "@solidjs/router";
import { For } from "solid-js";
import { docsConfig } from "~/config/docs";
import { Sidebar } from "./sidebar";

export const MobileNavbar = () => {
	return (
		<Drawer breakPoints={[0.75]}>
			{(props) => {
				useBeforeLeave(() => {
					props.setOpen(false);
				});

				return (
					<>
						<DrawerTrigger
							as={Button}
							variant="ghost"
							size="icon"
							class="md:hidden mr-2 hover:bg-transparent"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="size-4"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 8h16M4 16h16"
								/>
								<title>Open menu</title>
							</svg>
						</DrawerTrigger>
						<DrawerContent class="max-h-[60svh] [&>div:first-of-type]:h-1">
							<div class="p-6 overflow-y-auto">
								<div class="flex flex-col gap-y-2">
									<div class="flex flex-col text-sm">
										<a
											href="/"
											class="px-2 py-1 text-foreground transition-colors hover:text-foreground/80"
										>
											Home
										</a>
										<For each={docsConfig.mainNav}>
											{(item) => (
												<a
													href={item.href}
													class="px-2 py-1 text-foreground transition-colors hover:text-foreground/80"
												>
													{item.title}
												</a>
											)}
										</For>
									</div>
									<Sidebar />
								</div>
							</div>
						</DrawerContent>
					</>
				);
			}}
		</Drawer>
	);
};
