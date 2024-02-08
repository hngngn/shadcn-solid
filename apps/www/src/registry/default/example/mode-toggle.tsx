import { Button } from "@/registry/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { As, useColorMode } from "@kobalte/core"

const ModeToggle = () => {
	const { setColorMode } = useColorMode()

	return (
		<DropdownMenu placement="bottom-end">
			<DropdownMenuTrigger asChild>
				<As
					component={Button}
					variant="ghost"
					size="icon"
					class="w-9 px-0"
				>
					<span class="icon-[tabler--sun] h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<span class="icon-[tabler--moon] absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span class="sr-only">Toggle theme</span>
				</As>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="min-w-[8rem]">
				<DropdownMenuItem onSelect={() => setColorMode("light")}>
					<span class="icon-[tabler--sun] mr-2 w-4 h-4" />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("dark")}>
					<span class="icon-[tabler--moon] mr-2 w-4 h-4" />
					<span>Dark</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("system")}>
					<span class="icon-[tabler--device-laptop] mr-2 w-4 h-4" />
					<span>System</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ModeToggle
