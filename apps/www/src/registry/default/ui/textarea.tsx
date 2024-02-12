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
        "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...rest}
    />
  )
}
