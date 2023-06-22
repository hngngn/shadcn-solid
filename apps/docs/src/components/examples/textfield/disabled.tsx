import { TextFieldInput, TextFieldRoot } from "~/components"

export const TextFieldDisabled = () => {
	return (
		<TextFieldRoot>
			<TextFieldInput disabled type="email" placeholder="Email" />
		</TextFieldRoot>
	)
}
