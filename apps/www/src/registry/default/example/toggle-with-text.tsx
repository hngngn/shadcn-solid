import { TbItalic } from "solid-icons/tb"
import { ToggleButton } from "../ui/toggle"

const ToggleWithText = () => {
	return (
		<ToggleButton aria-label="Toggle italic">
			<TbItalic class="w-4 h-4 mr-2" />
			Italic
		</ToggleButton>
	)
}

export default ToggleWithText
