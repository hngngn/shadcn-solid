import { Button } from "../ui/button"

const ButtonLoading = () => {
	return (
		<Button disabled>
			<span class="icon-[tabler--loader] mr-2 animate-spin" />
			Please wait
		</Button>
	)
}

export default ButtonLoading
