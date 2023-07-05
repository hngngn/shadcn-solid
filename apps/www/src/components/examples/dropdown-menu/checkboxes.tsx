import { As } from "@kobalte/core"
import type { DropdownMenuCheckboxItemProps } from "@kobalte/core/dist/types/dropdown-menu"
import { createSignal } from "solid-js"
import {
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/components"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const DropdownMenuCheckboxes = () => {
	const [showStatusBar, setShowStatusBar] = createSignal<Checked>(true)
	const [showActivityBar, setShowActivityBar] = createSignal<Checked>(false)
	const [showPanel, setShowPanel] = createSignal<Checked>(false)

	return (
		<DropdownMenu placement="bottom">
			<DropdownMenuTrigger asChild>
				<As component={Button} variant="outline">
					Open
				</As>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="w-56">
				<DropdownMenuCheckboxItem
					checked={showStatusBar()}
					onChange={setShowStatusBar}
				>
					Status Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={showActivityBar()}
					onChange={setShowActivityBar}
					disabled
				>
					Activity Bar
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={showPanel()}
					onChange={setShowPanel}
				>
					Panel
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
