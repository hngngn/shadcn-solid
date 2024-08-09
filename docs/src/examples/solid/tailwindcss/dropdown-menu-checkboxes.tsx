import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import { Button } from "@repo/tailwindcss/solid/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@repo/tailwindcss/solid/dropdown-menu";
import { createSignal } from "solid-js";

const DropdownMenuCheckboxes = () => {
	const [showStatusBar, setShowStatusBar] = createSignal<boolean>(true);
	const [showActivityBar, setShowActivityBar] = createSignal<boolean>(false);
	const [showPanel, setShowPanel] = createSignal<boolean>(false);

	return (
		<DropdownMenu placement="bottom">
			<DropdownMenuTrigger
				as={(props: DropdownMenuSubTriggerProps) => (
					<Button variant="outline" {...props}>
						Open
					</Button>
				)}
			/>
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
				<DropdownMenuCheckboxItem checked={showPanel()} onChange={setShowPanel}>
					Panel
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownMenuCheckboxes;
