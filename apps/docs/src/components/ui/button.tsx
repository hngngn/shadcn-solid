import { Button as ButtonPrimitive } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:(ring outline-none ring-ring) disabled:(pointer-events-none opacity-50)",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:(bg-accent text-accent-foreground)",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:(bg-accent text-accent-foreground)",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export const Button: ParentComponent<
    ButtonPrimitive.ButtonRootProps & VariantProps<typeof buttonVariants>
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "variant", "size"])

    return (
        <ButtonPrimitive.Root
            class={buttonVariants({
                class: local.class,
                size: local.size,
                variant: local.variant,
            })}
            {...rest}
        />
    )
}
