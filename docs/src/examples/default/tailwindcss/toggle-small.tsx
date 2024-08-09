import { ToggleButton } from "@repo/tailwindcss/default/toggle";

const ToggleSmall = () => {
	return (
		<ToggleButton size="sm" aria-label="Toggle italic">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
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
				<title>Italic</title>
			</svg>
		</ToggleButton>
	);
};

export default ToggleSmall;
