import { As, useColorMode } from "@kobalte/core"
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from "./ui"

export const ModeToggle = () => {
	const { setColorMode } = useColorMode()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<As component={Button} variant="ghost" class="w-9 px-0">
					<i class="i-lucide-sun absolute rotate-0 scale-100 transition-all h-18px w-18px dark:(-rotate-90 scale-0)" />
					<i class="i-lucide-moon absolute rotate-90 scale-0 transition-all h-18px w-18px dark:(rotate-0 scale-100)" />
					<span class="sr-only">Toggle theme</span>
				</As>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent>
					<DropdownMenuItem onSelect={() => setColorMode("light")}>
						<i class="mr-2 i-lucide-sun" />
						<span>Light</span>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setColorMode("dark")}>
						<i class="mr-2 i-lucide-moon" />
						<span>Dark</span>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setColorMode("system")}>
						<i class="mr-2 i-lucide-laptop" />
						<span>System</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	)
}
