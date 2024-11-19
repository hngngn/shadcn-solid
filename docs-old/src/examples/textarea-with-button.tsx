import { Button } from "@repo/tailwindcss/ui/button";
import { TextArea } from "@repo/tailwindcss/ui/textarea";
import { TextFieldRoot } from "@repo/tailwindcss/ui/textfield";

const TextareaWithButton = () => {
	return (
		<div class="flex w-full max-w-sm flex-col items-center gap-2">
			<TextFieldRoot class="w-full">
				<TextArea placeholder="Type your message here." />
			</TextFieldRoot>
			<Button type="submit" class="w-full">
				Send message
			</Button>
		</div>
	);
};

export default TextareaWithButton;
