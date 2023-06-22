import { ComponentProps, ParentComponent, splitProps } from "solid-js"

interface ComponentSourceProps extends ComponentProps<"div"> {
	src?: string
}

export const ComponentSource: ParentComponent<ComponentSourceProps> = (
	props
) => {
	const [local] = splitProps(props, ["children"])

	return <>{local.children}</>
}
