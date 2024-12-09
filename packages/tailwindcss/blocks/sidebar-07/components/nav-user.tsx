import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSideBar,
} from "@/components/ui/sidebar";
import type { DropdownMenuTriggerProps } from "@kobalte/core/dropdown-menu";
import { Image } from "@kobalte/core/image";

const NavUser = (props: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) => {
	const { isMobile } = useSideBar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu placement={`${isMobile() ? "bottom-end" : "right-end"}`}>
					<DropdownMenuTrigger
						as={(triggerProps: DropdownMenuTriggerProps) => (
							// @ts-expect-error
							<SidebarMenuButton
								{...triggerProps}
								size="lg"
								class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
							>
								<Image class="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
									<Image.Img
										class="aspect-square h-full w-full"
										src={props.user.avatar}
										alt={props.user.name}
									/>
									<Image.Fallback class="flex h-full w-full items-center justify-center bg-muted rounded-lg">
										CN
									</Image.Fallback>
								</Image>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-semibold">{props.user.name}</span>
									<span class="truncate text-xs">{props.user.email}</span>
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="ml-auto size-4"
									viewBox="0 0 24 24"
								>
									<path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m7 15l5 5l5-5M7 9l5-5l5 5"
									/>
								</svg>
							</SidebarMenuButton>
						)}
					/>
					<DropdownMenuContent class="w-[--kb-popper-anchor-width] min-w-56 rounded-lg">
						<DropdownMenuGroup>
							<DropdownMenuGroupLabel class="p-0 font-normal">
								<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Image class="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
										<Image.Img
											class="aspect-square h-full w-full"
											src={props.user.avatar}
											alt={props.user.name}
										/>
										<Image.Fallback class="flex h-full w-full items-center justify-center bg-muted rounded-lg">
											CN
										</Image.Fallback>
									</Image>
									<div class="grid flex-1 text-left text-sm leading-tight">
										<span class="truncate font-semibold">
											{props.user.name}
										</span>
										<span class="truncate text-xs">{props.user.email}</span>
									</div>
								</div>
							</DropdownMenuGroupLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-4"
									viewBox="0 0 24 24"
								>
									<path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0zM20 3v4m2-2h-4M4 17v2m1-1H3"
									/>
								</svg>
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-4"
									viewBox="0 0 24 24"
								>
									<g
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
									>
										<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76" />
										<path d="m9 12l2 2l4-4" />
									</g>
								</svg>
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-4"
									viewBox="0 0 24 24"
								>
									<g
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
									>
										<rect width="20" height="14" x="2" y="5" rx="2" />
										<path d="M2 10h20" />
									</g>
								</svg>
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-4"
									viewBox="0 0 24 24"
								>
									<path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9m4.3 13a1.94 1.94 0 0 0 3.4 0"
									/>
								</svg>
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-4"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9"
								/>
							</svg>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default NavUser;
