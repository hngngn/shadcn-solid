import { TbLoader } from "solid-icons/tb"
import { Button } from "../ui/button"

const ButtonLoading = () => {
	return (
		<Button disabled>
			<TbLoader class="mr-2 animate-spin" />
			Please wait
		</Button>
	)
}

export default ButtonLoading
