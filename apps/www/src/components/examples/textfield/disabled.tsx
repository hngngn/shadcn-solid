import { TextField, TextFieldInput } from "~/components"

export const TextFieldDisabled = () => {
	return (
		<TextField>
			<TextFieldInput disabled type="email" placeholder="Email" />
		</TextField>
	)
}
