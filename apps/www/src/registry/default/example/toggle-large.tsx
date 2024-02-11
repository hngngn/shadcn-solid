import { ToggleButton } from "../ui/toggle"

const ToggleLarge = () => {
	return (
		<ToggleButton size="lg" aria-label="Toggle italic">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 h-4"
				viewBox="0 0 24 24"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11 5h6M7 19h6m1-14l-4 14"
				/>
			</svg>
		</ToggleButton>
	)
}

export default ToggleLarge
