import { TextFieldInput, TextFieldLabel, TextFieldRoot } from "~/components"

export const TextFieldFile = () => {
	return (
		<TextFieldRoot class="grid w-full max-w-sm gap-1.5">
			<TextFieldLabel>Picture</TextFieldLabel>
			<TextFieldInput disabled type="file" />
		</TextFieldRoot>
	)
}
