import type { ComponentProps, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"
import { CodeBlockWrapper } from "./code-block-wrapper"

interface ComponentSourceProps extends ComponentProps<"div"> {
	src?: string
}

export const ComponentSource: ParentComponent<ComponentSourceProps> = (
	props
) => {
	const [local] = splitProps(props, ["children", "class"])

	return (
		<CodeBlockWrapper
			expandButtonTitle="Expand"
			class="my-6 overflow-hidden rounded-md"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
		>
			{local.children}
		</CodeBlockWrapper>
	)
}
