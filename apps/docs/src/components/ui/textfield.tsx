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
			class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
			class="flex min-h-80px w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}
