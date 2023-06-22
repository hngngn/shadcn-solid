import { TextFieldInput, TextFieldLabel, TextFieldRoot } from "~/components"

export const TextFieldWithLabel = () => {
	return (
		<TextFieldRoot class="grid w-full max-w-sm items-center gap-1.5">
			<TextFieldLabel>Email</TextFieldLabel>
			<TextFieldInput type="email" placeholder="Email" />
		</TextFieldRoot>
	)
}
