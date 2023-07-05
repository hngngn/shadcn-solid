import type { Component } from "solid-js"
import { For, Match, Switch } from "solid-js"
import { A } from "solid-start"
import type { TSidebarNavItem } from "~/types"

type Props = {
	items: TSidebarNavItem[]
}

export const SidebarItem: Component<Props> = (props) => {
	return (
		<div class="grid grid-flow-row auto-rows-max text-sm">
			<For each={props.items}>
				{(item) => (
					<Switch
						fallback={
							<span class="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline">
								{item.title}
							</span>
						}
					>
						<Match when={item.href}>
							<A
								href={item.href!}
								class="flex w-full items-center rounded-md border border-transparent px-2 py-1.2 hover:underline"
								classList={{
									"cursor-not-allowed opacity-60":
										item.disabled,
								}}
								activeClass="font-medium text-foreground"
								inactiveClass="text-muted-foreground"
								end
								target={item.external ? "_blank" : ""}
								rel={item.external ? "noreferrer" : ""}
							>
								{item.title}
								{item.label ? (
									<span
										class="ml-2 rounded-md bg-#adfa1d px-1.5 py-0.5 text-xs leading-none text-#000000 no-underline group-hover:no-underline"
										classList={{
											"bg-muted text-muted-foreground":
												item.label === "Soon",
										}}
									>
										{item.label}
									</span>
								) : null}
							</A>
						</Match>
					</Switch>
				)}
			</For>
		</div>
	)
}
