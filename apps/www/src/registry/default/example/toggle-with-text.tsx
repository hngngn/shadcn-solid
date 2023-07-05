import { ToggleButton } from "../ui/toggle"

const ToggleWithText = () => {
    return (
        <ToggleButton aria-label="Toggle italic">
            <i class="i-lucide:italic mr-2" />
            Italic
        </ToggleButton>
    )
}

export default ToggleWithText
