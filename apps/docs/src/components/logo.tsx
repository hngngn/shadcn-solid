import type { Component, ComponentProps } from "solid-js"

export const Logo: Component<ComponentProps<"svg">> = (props) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			{...props}
		>
			<circle cx="12" cy="12" r="10" />
		</svg>
	)
}
