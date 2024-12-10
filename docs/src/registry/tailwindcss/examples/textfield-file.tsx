import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "@/registry/tailwindcss/ui/textfield";

const TextFieldFile = () => {
	return (
		<TextFieldRoot disabled class="w-full max-w-xs">
			<TextFieldLabel>Picture</TextFieldLabel>
			<TextField type="file" />
		</TextFieldRoot>
	);
};

export default TextFieldFile;
