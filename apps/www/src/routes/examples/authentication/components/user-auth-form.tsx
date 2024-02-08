import { Button } from "@/registry/default/ui/button"
import {
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "@/registry/default/ui/textfield"
import { createSignal } from "solid-js"

export const UserAuthForm = () => {
	const [isLoading, setIsLoading] = createSignal<boolean>(false)

	async function onSubmit(event: Event) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}

	return (
		<div class="grid gap-6">
			<form onSubmit={onSubmit}>
				<div class="grid gap-2">
					<div class="grid gap-1">
						<TextField>
							<TextFieldLabel class="sr-only">
								Email
							</TextFieldLabel>
							<TextFieldInput
								id="email"
								placeholder="name@example.com"
								type="email"
								autoCapitalize="none"
								autocomplete="email"
								autocorrect="off"
								disabled={isLoading()}
							/>
						</TextField>
					</div>
					<Button disabled={isLoading()}>
						{isLoading() && (
							<span class="icon-[tabler--loader] mr-2 h-4 w-4 animate-spin" />
						)}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading()}>
				{isLoading() ? (
					<span class="icon-[tabler--loader] mr-2 h-4 w-4 animate-spin" />
				) : (
					<span class="icon-[tabler--brand-github] mr-2 h-4 w-4" />
				)}{" "}
				GitHub
			</Button>
		</div>
	)
}
