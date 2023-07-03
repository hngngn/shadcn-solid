import { Accessor, Component, createComputed, createSignal } from "solid-js"

export function createHello(): [Accessor<string>, (to: string) => void] {
	const [hello, setHello] = createSignal("Hello World!")

	return [hello, (to: string) => setHello(`Hello ${to}!`)]
}

export const Hello: Component<{ to?: string }> = (props) => {
	const [hello, setHello] = createHello()

	// This will only log during development, console is removed in production
	console.log("Hello World!")

	createComputed(() => {
		if (typeof props.to === "string") setHello(props.to)
	})

	return (
		<>
			<div>{hello()}</div>
		</>
	)
}
