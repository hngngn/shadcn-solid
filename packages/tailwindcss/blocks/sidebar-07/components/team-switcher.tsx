import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSideBar,
} from "@/components/ui/sidebar";
import type { DropdownMenuTriggerProps } from "@kobalte/core/dropdown-menu";
import { type Accessor, For, type JSX, createSignal } from "solid-js";

const TeamSwitcher = (props: {
	teams: {
		name: string;
		logo: Accessor<JSX.Element>;
		plan: string;
	}[];
}) => {
	const [activeTeam, setActiveTeam] = createSignal(props.teams[0]);
	const { isMobile } = useSideBar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu
					placement={`${isMobile() ? "bottom-end" : "right-start"}`}
					sameWidth
				>
					<DropdownMenuTrigger
						as={(props: DropdownMenuTriggerProps) => (
							// @ts-expect-error
							<SidebarMenuButton
								{...props}
								size="lg"
								class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
							>
								<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									{activeTeam().logo()}
								</div>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-semibold">
										{activeTeam().name}
									</span>
									<span class="truncate text-xs">{activeTeam().plan}</span>
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
							<DropdownMenuGroupLabel class="text-xs text-muted-foreground">
								Teams
							</DropdownMenuGroupLabel>
							<For each={props.teams}>
								{(team, index) => (
									<DropdownMenuItem
										onClick={() => setActiveTeam(team)}
										class="gap-2 p-2"
									>
										<div class="flex size-6 items-center justify-center rounded-sm border">
											{team.logo()}
										</div>
										{team.name}
										<DropdownMenuShortcut>⌘{index() + 1}</DropdownMenuShortcut>
									</DropdownMenuItem>
								)}
							</For>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem class="gap-2 p-2">
							<div class="flex size-6 items-center justify-center rounded-md border bg-background">
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
										d="M5 12h14m-7-7v14"
									/>
								</svg>
							</div>
							<div class="font-medium text-muted-foreground">Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default TeamSwitcher;
