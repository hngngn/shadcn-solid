import { Button } from "~/components"

export const ButtonLoading = () => {
	return (
		<Button disabled>
			<i class="i-lucide:loader mr-2 animate-spin" />
			Please wait
		</Button>
	)
}
