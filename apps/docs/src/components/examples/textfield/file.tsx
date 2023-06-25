import { TextField, TextFieldInput, TextFieldLabel } from "~/components"

export const TextFieldFile = () => {
	return (
		<TextField class="grid w-full max-w-sm gap-1.5">
			<TextFieldLabel>Picture</TextFieldLabel>
			<TextFieldInput disabled type="file" />
		</TextField>
	)
}
