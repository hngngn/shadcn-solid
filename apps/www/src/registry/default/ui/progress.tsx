import { cn } from "@/lib/cn"
import { Progress as ProgressPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const ProgressLabel = ProgressPrimitive.Label
export const ProgressValueLabel = ProgressPrimitive.ValueLabel

export const Progress: ParentComponent<ProgressPrimitive.ProgressRootProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "children"])

    return (
        <ProgressPrimitive.Root
            class={cn("flex flex-col gap-2 w-full", local.class)}
            {...rest}
        >
            {local.children}
            <ProgressPrimitive.Track class="h-2 bg-primary/20 rounded-full overflow-hidden">
                <ProgressPrimitive.Fill class="bg-primary h-full w-[--kb-progress-fill-width] transition-all ease-linear duration-500 data-[progress=complete]:bg-primary" />
            </ProgressPrimitive.Track>
        </ProgressPrimitive.Root>
    )
}
