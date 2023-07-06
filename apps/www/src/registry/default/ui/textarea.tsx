import { cn } from "@/lib/cn"
import { TextField as TextFieldPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const TextFieldTextArea: ParentComponent<
    TextFieldPrimitive.TextFieldTextAreaProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])
    return (
        <TextFieldPrimitive.TextArea
            class={cn(
                "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                local.class
            )}
            {...rest}
        />
    )
}
