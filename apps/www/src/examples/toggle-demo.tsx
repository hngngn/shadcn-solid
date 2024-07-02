import { ToggleButton } from "@repo/tailwindcss/ui/toggle";

const ToggleDemo = () => {
	return (
		<ToggleButton aria-label="Toggle italic">
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
					d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm6 7h1a3.5 3.5 0 0 1 0 7H7v-7"
				/>
			</svg>
		</ToggleButton>
	);
};

export default ToggleDemo;
