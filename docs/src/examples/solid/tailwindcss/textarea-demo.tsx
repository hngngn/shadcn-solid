import { TextArea } from "@repo/tailwindcss/solid/textarea";
import { TextFieldRoot } from "@repo/tailwindcss/solid/textfield";

const TextareaDemo = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextArea placeholder="Type your message here." />
		</TextFieldRoot>
	);
};

export default TextareaDemo;
