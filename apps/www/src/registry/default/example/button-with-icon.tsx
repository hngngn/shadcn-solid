import { TbMail } from "solid-icons/tb"
import { Button } from "../ui/button"

const ButtonWithIcon = () => {
	return (
		<Button>
			<TbMail class="mr-2" /> Login with Email
		</Button>
	)
}

export default ButtonWithIcon
