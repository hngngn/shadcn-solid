import { TextFieldInput, TextFieldRoot } from "~/components"

export const TextFieldDemo = () => {
	return (
		<TextFieldRoot>
			<TextFieldInput type="email" placeholder="Email" />
		</TextFieldRoot>
	)
}
