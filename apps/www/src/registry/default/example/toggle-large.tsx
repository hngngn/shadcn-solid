import { TbItalic } from "solid-icons/tb"
import { ToggleButton } from "../ui/toggle"

const ToggleLarge = () => {
	return (
		<ToggleButton size="lg" aria-label="Toggle italic">
			<TbItalic class="w-4 h-4" />
		</ToggleButton>
	)
}

export default ToggleLarge
