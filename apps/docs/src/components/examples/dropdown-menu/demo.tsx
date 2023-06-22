import { As } from "@kobalte/core"
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "~/components"

export const DropdownMenuDemo = () => {
	return (
		<DropdownMenu placement="bottom" gutter={4}>
			<DropdownMenuTrigger asChild>
				<As component={Button} variant="outline">
					Open
				</As>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent class="w-56">
					<DropdownMenuGroup>
						<DropdownMenuGroupLabel>
							My Account
						</DropdownMenuGroupLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<i class="mr-2 i-lucide:user" />
							<span>Profile</span>
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<i class="mr-2 i-lucide:credit-card" />
							<span>Billing</span>
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<i class="mr-2 i-lucide:settings" />
							<span>Settings</span>
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<i class="mr-2 i-lucide:keyboard" />
							<span>Keyboard shortcuts</span>
							<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<i class="mr-2 i-lucide:user" />
							<span>Team</span>
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<i class="mr-2 i-lucide:user-plus" />
								<span>Invite users</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>
										<i class="mr-2 i-lucide:mail" />
										<span>Email</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<i class="mr-2 i-lucide:message-square" />
										<span>Message</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<i class="mr-2 ilucide:plus-circle" />
										<span>More...</span>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuItem>
							<i class="mr-2 i-lucide:plus" />
							<span>New Team</span>
							<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<i class="mr-2 i-lucide:github" />
						<span>GitHub</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<i class="mr-2 i-lucide:life-buoy" />
						<span>Support</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<i class="mr-2 i-lucide:cloud" />
						<span>API</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<i class="mr-2 i-lucide:log-out" />
						<span>Log out</span>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	)
}
