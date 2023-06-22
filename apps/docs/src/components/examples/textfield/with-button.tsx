import { Button, TextFieldInput, TextFieldRoot } from "~/components"

export const TextFieldWithButton = () => {
	return (
		<div class="flex w-full max-w-sm items-center space-x-2">
			<TextFieldRoot>
				<TextFieldInput type="email" placeholder="Email" />
			</TextFieldRoot>
			<Button type="submit">Subscribe</Button>
		</div>
	)
}
