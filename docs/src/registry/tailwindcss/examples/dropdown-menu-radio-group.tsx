import { Button } from "@/registry/tailwindcss/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/tailwindcss/ui/dropdown-menu";
import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import { createSignal } from "solid-js";

const DropdownMenuRadioGroupDemo = () => {
	const [position, setPosition] = createSignal("bottom");

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
				<DropdownMenuGroup>
					<DropdownMenuGroupLabel>Panel Position</DropdownMenuGroupLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={position()} onChange={setPosition}>
						<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownMenuRadioGroupDemo;
