import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/ui/textfield";

const TextFieldFile = () => {
	return (
		<TextFieldRoot disabled class="w-full max-w-xs">
			<TextFieldLabel>Picture</TextFieldLabel>
			<TextField type="file" />
		</TextFieldRoot>
	);
};

export default TextFieldFile;
