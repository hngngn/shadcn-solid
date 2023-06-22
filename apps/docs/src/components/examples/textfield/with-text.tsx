import { TextFieldInput, TextFieldLabel, TextFieldRoot } from "~/components"

export function TextFieldWithText() {
	return (
		<TextFieldRoot class="grid w-full max-w-sm items-center gap-1.5">
			<TextFieldLabel>Email</TextFieldLabel>
			<TextFieldInput type="email" placeholder="Email" />
			<p class="text-sm text-muted-foreground">
				Enter your email address.
			</p>
		</TextFieldRoot>
	)
}
