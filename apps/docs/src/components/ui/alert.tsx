import { Alert as AlertPrimitive } from "@kobalte/core"
import { cva } from "class-variance-authority"
import type { ComponentProps, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const alertVariants = cva(
	"relative w-full rounded-lg border px-4 py-3 text-sm [&>i]:(absolute text-foreground left-4 top-3) [&>i+div]:-translate-y-3px [&:has(i)]:pl-11",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive:
					"text-destructive border-destructive/50 dark:border-destructive [&>i]:text-destructive!",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

export const Alert: ParentComponent<
	AlertPrimitive.AlertRootProps & {
		variant?: "default" | "destructive" | null
	}
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "variant"])

	return (
		<AlertPrimitive.Root
			class={alertVariants({ variant: props.variant })}
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertTitle: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<div
			class="font-medium leading-5 tracking-tight"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertDescription: ParentComponent<ComponentProps<"div">> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<div
			class="text-sm [&_p]:leading-relaxed"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}
