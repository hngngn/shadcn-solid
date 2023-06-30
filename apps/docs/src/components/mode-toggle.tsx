import { As, useColorMode } from "@kobalte/core"
import { Show } from "solid-js"
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components"

export const ModeToggle = () => {
	const { setColorMode, colorMode } = useColorMode()

	return (
		<DropdownMenu placement="bottom-end">
			<DropdownMenuTrigger asChild>
				<As component={Button} variant="ghost" size="icon">
					<Show
						when={colorMode() === "dark"}
						fallback={<i class="i-lucide-sun" />}
					>
						<i class="i-lucide-moon" />
					</Show>
					<span class="sr-only">Toggle theme</span>
				</As>
			</DropdownMenuTrigger>
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
		</DropdownMenu>
	)
}
