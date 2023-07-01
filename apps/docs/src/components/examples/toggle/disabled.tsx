import { ToggleButton } from "~/components"

export const ToggleDisabled = () => {
    return (
        <ToggleButton disabled aria-label="Toggle underline">
            <i class="i-lucide:underline" />
        </ToggleButton>
    )
}
