import { As } from "@kobalte/core"
import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog"
import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield"

const DialogDemo = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<As component={Button} variant="outline">
					Edit Profile
				</As>
			</DialogTrigger>
			<DialogContent class="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when
						you're done.
					</DialogDescription>
				</DialogHeader>
				<div class="grid gap-4 py-4">
					<TextField class="grid grid-cols-3 md:grid-cols-4 items-center gap-4">
						<TextFieldLabel class="text-right">Name</TextFieldLabel>
						<TextFieldInput class="col-span-2 md:col-span-3" />
					</TextField>
					<TextField class="grid grid-cols-3 md:grid-cols-4 items-center gap-4">
						<TextFieldLabel class="text-right">
							Username
						</TextFieldLabel>
						<TextFieldInput class="col-span-2 md:col-span-3" />
					</TextField>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DialogDemo
