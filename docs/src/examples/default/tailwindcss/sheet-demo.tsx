import type { DialogTriggerProps } from "@kobalte/core/dialog";
import { Button } from "@repo/tailwindcss/default/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@repo/tailwindcss/default/sheet";
import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/default/textfield";

const SheetDemo = () => {
	return (
		<Sheet>
			<SheetTrigger
				as={(props: DialogTriggerProps) => (
					<Button variant="outline" {...props}>
						Open
					</Button>
				)}
			/>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
				<div class="grid gap-4 py-4">
					<TextFieldRoot class="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
						<TextFieldLabel class="text-right">Name</TextFieldLabel>
						<TextField class="col-span-2 md:col-span-3" />
					</TextFieldRoot>
					<TextFieldRoot class="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
						<TextFieldLabel class="text-right">Username</TextFieldLabel>
						<TextField class="col-span-2 md:col-span-3" />
					</TextFieldRoot>
				</div>
				<SheetFooter>
					<Button type="submit">Save changes</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SheetDemo;
