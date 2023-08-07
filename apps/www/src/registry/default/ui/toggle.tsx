import { cn } from "@/lib/cn"
import { ToggleButton as ToggleButtonPrimitive } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { splitProps, type ParentComponent } from "solid-js"

export const toggleVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 px-3",
				sm: "h-8 px-2",
				lg: "h-10 px-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export const ToggleButton: ParentComponent<
	ToggleButtonPrimitive.ToggleButtonRootProps &
		VariantProps<typeof toggleVariants>
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "variant", "size"])

	return (
		<ToggleButtonPrimitive.Root
			class={cn(
				toggleVariants({ variant: local.variant, size: local.size }),
				local.class
			)}
			{...rest}
		/>
	)
}
