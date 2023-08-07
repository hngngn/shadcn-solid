import { Button } from "@/registry/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { As, useColorMode } from "@kobalte/core"
import { TbDeviceLaptop, TbMoonFilled, TbSunFilled } from "solid-icons/tb"

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
					<TbSunFilled class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<TbMoonFilled class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span class="sr-only">Toggle theme</span>
				</As>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => setColorMode("light")}>
					<TbSunFilled class="mr-2 w-4 h-4" />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("dark")}>
					<TbMoonFilled class="mr-2 w-4 h-4" />
					<span>Dark</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("system")}>
					<TbDeviceLaptop class="mr-2 w-4 h-4" />
					<span>System</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ModeToggle
