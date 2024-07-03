import { docsConfig } from "@/config/docs";
import { cn } from "@/libs/cn";
import { For, Show } from "solid-js";

type Props = {
	pathname: string;
};

export const Sidebar = (props: Props) => {
	return (
		<div class="w-full">
			<For each={docsConfig.sidebarNav}>
				{(item) => (
					<div class="pb-4">
						<h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
							{item.title}
						</h4>
						<div class="grid grid-flow-row auto-rows-max text-sm">
							<For each={item.items}>
								{(item) => (
									<Show
										when={!item.disabled}
										fallback={
											<span
												class={cn(
													"flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
													item.disabled && "cursor-not-allowed opacity-60",
												)}
											>
												{item.title}
												<Show when={item.label}>
													<span
														class={cn(
															"ml-2 rounded-md bg-lime-600/10 px-2 py-1 text-xs leading-none text-lime-600 no-underline ring-1 ring-inset ring-lime-600/20 group-hover:no-underline dark:bg-lime-500/10 dark:text-lime-500 dark:ring-lime-500/20",
															item.label === "Soon" &&
																"bg-muted text-muted-foreground",
															item.label === "Updated" &&
																"bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
														)}
													>
														{item.label}
													</span>
												</Show>
											</span>
										}
									>
										<a
											href={item.href}
											class={cn(
												"flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
												item.disabled && "cursor-not-allowed opacity-60",
												props.pathname === item.href
													? "font-medium text-foreground"
													: "text-muted-foreground",
											)}
										>
											{item.title}
											<Show when={item.label}>
												<span
													class={cn(
														"ml-2 rounded-md bg-lime-600/10 px-2 py-1 text-xs leading-none text-lime-600 no-underline ring-1 ring-inset ring-lime-600/20 group-hover:no-underline dark:bg-lime-500/10 dark:text-lime-500 dark:ring-lime-500/20",
														item.label === "Soon" &&
															"bg-muted text-muted-foreground",
														item.label === "Updated" &&
															"bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
													)}
												>
													{item.label}
												</span>
											</Show>
										</a>
									</Show>
								)}
							</For>
						</div>
					</div>
				)}
			</For>
		</div>
	);
};
