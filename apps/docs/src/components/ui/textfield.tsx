import { TextField as TextFieldPrimitive } from "@kobalte/core"
import { cva } from "class-variance-authority"
import { splitProps, type ParentComponent } from "solid-js"

export const TextFieldErrorMessage = TextFieldPrimitive.ErrorMessage
export const TextFieldDescription = TextFieldPrimitive.Description

export const TextFieldRoot: ParentComponent<
	TextFieldPrimitive.TextFieldRootProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TextFieldPrimitive.Root
			class="flex flex-col gap-4px"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export const TextFieldLabel: ParentComponent<
	TextFieldPrimitive.TextFieldLabelProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TextFieldPrimitive.Label
			class={labelVariants()}
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const TextFieldInput: ParentComponent<
	TextFieldPrimitive.TextFieldInputProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TextFieldPrimitive.Input
			class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:(border-0 bg-transparent text-sm font-medium) placeholder:text-muted-foreground disabled:(cursor-not-allowed opacity-50) outline-none focus-visible:(ring ring-ring)"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const TextFieldTextArea: ParentComponent<
	TextFieldPrimitive.TextFieldTextAreaProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TextFieldPrimitive.TextArea
			class="flex min-h-60px w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus-visible(ring ring-ring) disabled:(cursor-not-allowed opacity-50)"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}
