import {
	TextField,
	TextFieldDescription,
	TextFieldLabel,
	TextFieldRoot,
} from "@/registry/tailwindcss/ui/textfield";

const TextFieldWithText = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextFieldLabel>Email</TextFieldLabel>
			<TextField type="email" placeholder="Email" />
			<TextFieldDescription>Enter your email address.</TextFieldDescription>
		</TextFieldRoot>
	);
};

export default TextFieldWithText;
