import { TextArea } from "@/registry/tailwindcss/ui/textarea";
import { TextFieldRoot } from "@/registry/tailwindcss/ui/textfield";

const TextareaDisabled = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs" disabled>
			<TextArea placeholder="Type your message here." />
		</TextFieldRoot>
	);
};

export default TextareaDisabled;
