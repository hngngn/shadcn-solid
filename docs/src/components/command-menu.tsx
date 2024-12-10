import type { TNavItem } from "@/config/docs";
import { docsConfig } from "@/config/docs";
import { Button } from "@/registry/tailwindcss/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/tailwindcss/ui/command";
import { useColorMode } from "@kobalte/core";
import { useNavigate } from "@solidjs/router";
import type { JSXElement } from "solid-js";
import { For, createEffect, createSignal, onCleanup } from "solid-js";

type Option = TNavItem & { value: string; icon: JSXElement };

type List = {
	label: string;
	options: Option[];
};

const CommandMenu = () => {
	const navigate = useNavigate();
	const { setColorMode } = useColorMode();

	const data = () => {
		const temp: List[] = [];

		temp.push({
			label: "Links",
			options: docsConfig.mainNav.map((e) => ({
				...e,
				value: e.title,
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							fill-rule="evenodd"
							d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
							clip-rule="evenodd"
						/>
						<title>{}</title>
					</svg>
				),
			})),
		});

		// biome-ignore lint/complexity/noForEach: <explanation>
		docsConfig.sidebarNav.forEach((e) =>
			temp.push({
				label: e.title,
				options: e.items.map((e) => ({
					...e,
					value: e.title,
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-4 w-4"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								fill-rule="evenodd"
								d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
								clip-rule="evenodd"
							/>
							<title>Doc</title>
						</svg>
					),
				})),
			}),
		);

		temp.push({
			label: "Theme",
			options: [
				{
					title: "Light",
					value: "light",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-4 w-4"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
							/>
							<title>Light mode</title>
						</svg>
					),
				},
				{
					title: "Dark",
					value: "dark",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-4 w-4"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
							/>
							<title>Dark mode</title>
						</svg>
					),
				},
				{
					title: "System",
					value: "system",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-4 w-4"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 19h18M5 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
							/>
							<title>System mode</title>
						</svg>
					),
				},
			],
		});

		return temp;
	};

	const [open, setOpen] = createSignal(false);

	createEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
				if (
					(e.target instanceof HTMLElement && e.target.isContentEditable) ||
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement ||
					e.target instanceof HTMLSelectElement
				) {
					return;
				}

				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);

		onCleanup(() => {
			document.removeEventListener("keydown", down);
		});
	});

	return (
		<>
			<Button
				variant="outline"
				class="relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
				onClick={() => setOpen(true)}
			>
				<span class="hidden lg:inline-flex">Search documentation...</span>
				<span class="inline-flex lg:hidden">Search...</span>
				<kbd class="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-3.5"
						viewBox="0 0 32 32"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							d="M19 19v4a4 4 0 1 0 4-4zm0 0v-6m0 6h-6m6-6V9a4 4 0 1 1 4 4zm0 0h-6m-4 0h-.007m0 0A4 4 0 1 1 13 9v4m-4.007 0H13m0 0v6m0 0v4a4 4 0 1 1-4-4z"
						/>
						<title>Command</title>
					</svg>
					<span>K</span>
				</kbd>
			</Button>
			<CommandDialog
				class="rounded-lg border shadow-md"
				open={open()}
				onOpenChange={setOpen}
			>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<For each={data()}>
						{(item) => (
							<CommandGroup heading={item.label}>
								<For each={item.options}>
									{(item) => (
										<CommandItem
											disabled={item.disabled}
											onSelect={() => {
												switch (item.value) {
													case "light":
														setColorMode("light");
														break;
													case "dark":
														setColorMode("dark");
														break;
													case "system":
														setColorMode("system");
														break;
													default:
														// @ts-expect-error
														navigate(item.href);
														break;
												}
												setOpen(false);
											}}
										>
											{item.icon}
											<span>{item.title}</span>
										</CommandItem>
									)}
								</For>
							</CommandGroup>
						)}
					</For>
				</CommandList>
			</CommandDialog>
		</>
	);
};

export default CommandMenu;
