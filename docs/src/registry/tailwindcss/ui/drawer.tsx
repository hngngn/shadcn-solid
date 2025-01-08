import {
  Show,
  mergeProps,
  splitProps,
  type ComponentProps,
  type ParentProps,
  type ValidComponent,
} from "solid-js"
import DrawerPrimitive, {
  type ContentProps,
  type DescriptionProps,
  type DynamicProps,
  type LabelProps,
} from "@corvu/drawer"

import { cn } from "@/registry/tailwindcss/libs/cn"

export const Drawer = DrawerPrimitive
export const DrawerTrigger = DrawerPrimitive.Trigger
export const DrawerClose = DrawerPrimitive.Close

type drawerContentProps<T extends ValidComponent = "div"> = ParentProps<
  ContentProps<T> & {
    class?: string
    withHandle?: boolean
  }
>

export const DrawerContent = <T extends ValidComponent = "div">(
  props: DynamicProps<T, drawerContentProps<T>>
) => {
  const ctx = DrawerPrimitive.useContext()
  const merge = mergeProps(
    { withHandle: ctx.side() === "bottom" } as drawerContentProps,
    props
  )
  const [local, rest] = splitProps(merge, ["class", "children", "withHandle"])

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay
        class="fixed inset-0 z-50 data-[transitioning]:transition-[background-color] data-[transitioning]:duration-500 data-[transitioning]:[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]"
        style={{
          "background-color": `rgb(0 0 0 / ${0.6 * ctx.openPercentage()})`,
        }}
      />
      <DrawerPrimitive.Content
        class={cn(
          "border-border bg-background fixed z-50 flex h-auto after:absolute after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-500 data-[transitioning]:[transition-timing-function:cubic-bezier(0.32,0.72,0,1)] md:select-none",
          ctx.side() === "right" && [
            "inset-y-0 right-0 rounded-l-lg border-l pl-4",
            "after:inset-y-0 after:left-[calc(100%-1px)] after:w-1/2",
          ],
          ctx.side() === "bottom" && [
            "inset-x-0 bottom-0 flex-col rounded-t-lg border-t pt-4",
            "after:inset-x-0 after:top-[calc(100%-1px)] after:h-1/2",
          ],
          ctx.side() === "left" && [
            "inset-y-0 left-0 flex-row-reverse rounded-r-lg border-r pr-4",
            "after:inset-y-0 after:right-[calc(100%-1px)] after:w-1/2",
          ],
          ctx.side() === "top" && [
            "inset-x-0 top-0 flex-col-reverse rounded-b-lg border-b pb-4",
            "after:inset-x-0 after:bottom-[calc(100%-1px)] after:h-1/2",
          ],
          local.class
        )}
        {...rest}
      >
        <Show when={local.withHandle}>
          <div
            class={cn(
              "bg-muted shrink-0 self-center rounded-full",
              ctx.side() === "right" && "h-10 w-1",
              ctx.side() === "bottom" && "h-1 w-10",
              ctx.side() === "left" && "h-10 w-1",
              ctx.side() === "top" && "h-1 w-10"
            )}
          />
        </Show>
        {local.children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

export const DrawerHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("grid gap-1.5 p-4 text-center sm:text-left", local.class)}
      {...rest}
    />
  )
}

export const DrawerFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div class={cn("mt-auto flex flex-col gap-2 p-4", local.class)} {...rest} />
  )
}

type DrawerLabelProps = LabelProps & {
  class?: string
}

export const DrawerLabel = <T extends ValidComponent = "h2">(
  props: DynamicProps<T, DrawerLabelProps>
) => {
  const [local, rest] = splitProps(props as DrawerLabelProps, ["class"])

  return (
    <DrawerPrimitive.Label
      class={cn(
        "text-lg font-semibold leading-none tracking-tight",
        local.class
      )}
      {...rest}
    />
  )
}

type DrawerDescriptionProps = DescriptionProps & {
  class?: string
}

export const DrawerDescription = <T extends ValidComponent = "p">(
  props: DynamicProps<T, DrawerDescriptionProps>
) => {
  const [local, rest] = splitProps(props as DrawerDescriptionProps, ["class"])

  return (
    <DrawerPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  )
}
