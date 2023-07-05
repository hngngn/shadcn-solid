import { Button, TextField, TextFieldInput } from "~/components"

export const TextFieldWithButton = () => {
	return (
		<div class="flex w-full max-w-sm items-center space-x-2">
			<TextField>
				<TextFieldInput type="email" placeholder="Email" />
			</TextField>
			<Button type="submit">Subscribe</Button>
		</div>
	)
}
