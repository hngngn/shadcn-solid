import { Separator as SeparatorPrimitive } from "@kobalte/core"
import type { SeparatorRootProps } from "@kobalte/core/dist/types/separator/separator-root"
import type { ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Separator: ParentComponent<SeparatorRootProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<SeparatorPrimitive.Root
			class="shrink-0 bg-border data-[orientation='horizontal']:(h-1px w-full) data-[orientation='vertical']:(h-full w-1px)"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}
