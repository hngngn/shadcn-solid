import { TbUnderline } from "solid-icons/tb"
import { ToggleButton } from "../ui/toggle"

const ToggleDisabled = () => {
    return (
        <ToggleButton disabled aria-label="Toggle underline">
            <TbUnderline class="w-4 h-4" />
        </ToggleButton>
    )
}

export default ToggleDisabled
