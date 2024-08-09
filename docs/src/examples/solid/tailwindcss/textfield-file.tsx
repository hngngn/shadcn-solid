import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/solid/textfield";

const TextFieldFile = () => {
	return (
		<TextFieldRoot disabled class="w-full max-w-xs">
			<TextFieldLabel>Picture</TextFieldLabel>
			<TextField type="file" />
		</TextFieldRoot>
	);
};

export default TextFieldFile;
