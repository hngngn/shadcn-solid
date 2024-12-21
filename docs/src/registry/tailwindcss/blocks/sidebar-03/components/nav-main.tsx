import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/tailwindcss/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/registry/tailwindcss/ui/sidebar";
import type {
	CollapsibleRootProps,
	CollapsibleTriggerProps,
} from "@kobalte/core/collapsible";
import { type Accessor, For, type JSX, Show } from "solid-js";

const NavMain = (props: {
	items: {
		title: string;
		url: string;
		icon: Accessor<JSX.Element>;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) => {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				<For each={props.items}>
					{(item) => (
						<Collapsible
							defaultOpen={item.isActive}
							as={(props: CollapsibleRootProps) => (
								<SidebarMenuItem {...props}>
									<SidebarMenuButton
										tooltip={item.title}
										as="a"
										href={item.url}
									>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
									<Show when={item.items?.length}>
										<CollapsibleTrigger
											as={(props: CollapsibleTriggerProps) => (
												// @ts-expect-error
												<SidebarMenuAction
													{...props}
													class="data-[expanded]:rotate-90"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="transition-transform duration-200"
														viewBox="0 0 24 24"
													>
														<path
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="m9 18l6-6l-6-6"
														/>
													</svg>
													<span class="sr-only">Toggle</span>
												</SidebarMenuAction>
											)}
										/>
										<CollapsibleContent>
											<SidebarMenuSub>
												{
													<For each={item.items}>
														{(subItem) => (
															<SidebarMenuSubItem>
																<SidebarMenuSubButton as="a" href={subItem.url}>
																	<span>{subItem.title}</span>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														)}
													</For>
												}
											</SidebarMenuSub>
										</CollapsibleContent>
									</Show>
								</SidebarMenuItem>
							)}
						/>
					)}
				</For>
			</SidebarMenu>
		</SidebarGroup>
	);
};

export default NavMain;
