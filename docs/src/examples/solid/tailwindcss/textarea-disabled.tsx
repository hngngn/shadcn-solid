import { TextArea } from "@repo/tailwindcss/solid/textarea";
import { TextFieldRoot } from "@repo/tailwindcss/solid/textfield";

const TextareaDisabled = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs" disabled>
			<TextArea placeholder="Type your message here." />
		</TextFieldRoot>
	);
};

export default TextareaDisabled;
