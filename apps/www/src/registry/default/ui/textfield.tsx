import { cn } from "@/lib/cn"
import { TextField as TextFieldPrimitive } from "@kobalte/core"
import { cva } from "class-variance-authority"
import { splitProps, type ParentComponent } from "solid-js"

export const TextFieldErrorMessage = TextFieldPrimitive.ErrorMessage
export const TextFieldDescription = TextFieldPrimitive.Description
export const TextField = TextFieldPrimitive.Root

export const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:(cursor-not-allowed opacity-70)"
)

export const TextFieldLabel: ParentComponent<
    TextFieldPrimitive.TextFieldLabelProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])
    return (
        <TextFieldPrimitive.Label
            class={cn(labelVariants(), local.class)}
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
            class={cn(
                "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring focus-visible:ring-ring",
                local.class
            )}
            {...rest}
        />
    )
}
