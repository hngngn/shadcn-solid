import {
	TextField,
	TextFieldErrorMessage,
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/ui/textfield";

const TextFieldWithError = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs" validationState="invalid">
			<TextFieldLabel>Email</TextFieldLabel>
			<TextField type="email" placeholder="Email" />
			<TextFieldErrorMessage>Email is required.</TextFieldErrorMessage>
		</TextFieldRoot>
	);
};

export default TextFieldWithError;
