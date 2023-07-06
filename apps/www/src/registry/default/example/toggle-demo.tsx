import { TbBold } from "solid-icons/tb"
import { ToggleButton } from "../ui/toggle"

const ToggleDemo = () => {
    return (
        <ToggleButton aria-label="Toggle italic">
            <TbBold class="w-4 h-4" />
        </ToggleButton>
    )
}

export default ToggleDemo
