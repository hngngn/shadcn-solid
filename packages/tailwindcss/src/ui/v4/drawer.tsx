import type { ComponentProps, ValidComponent } from "solid-js"
import { Show, mergeProps, splitProps } from "solid-js"
import type { DynamicProps } from "@corvu/drawer"
import DrawerPrimitive from "@corvu/drawer"

import { cx } from "@repo/tailwindcss/utils/cva"

export const DrawerPortal = DrawerPrimitive.Portal

export type DrawerProps = ComponentProps<typeof DrawerPrimitive>

export const Drawer = (props: DrawerProps) => {
  return <DrawerPrimitive data-slot="drawer" {...props} />
}

export type DrawerTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof DrawerPrimitive.Trigger<T>>

export const DrawerTrigger = <T extends ValidComponent = "button">(
  props: DrawerTriggerProps<T>,
) => {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

export type DrawerCloseProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof DrawerPrimitive.Close<T>>

export const DrawerClose = <T extends ValidComponent = "button">(
  props: DrawerCloseProps<T>,
) => {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

export type DrawerContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DrawerPrimitive.Content<T>> & {
    withHandle?: boolean
  }

export const DrawerContent = <T extends ValidComponent = "div">(
  props: DrawerContentProps<T>,
) => {
  const context = DrawerPrimitive.useContext()

  const merge = mergeProps<DrawerContentProps[]>(
    {
      withHandle: context.side() === "bottom",
    },
    props as DrawerContentProps,
  )
  const [local, rest] = splitProps(merge, ["class", "children", "withHandle"])

  return (
    <>
      <DrawerPrimitive.Overlay
        data-slot="drawer-overlay"
        class="fixed inset-0 z-50 bg-black/50 data-[transitioning]:transition-colors data-[transitioning]:duration-500 data-[transitioning]:ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{
          "background-color": `rgb(0 0 0 / ${0.5 * context.openPercentage()}`,
        }}
      />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        class={cx(
          "bg-background fixed z-50 flex h-auto flex-col after:absolute after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-500 data-[transitioning]:ease-[cubic-bezier(0.32,0.72,0,1)]",
          context.side() === "bottom" && [
            "inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg border-t",
            "after:inset-x-0 after:top-[calc(100%-1px)] after:h-1/2",
          ],
          context.side() === "top" && [
            "inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b",
            "after:inset-x-0 after:bottom-[calc(100%-1px)] after:h-1/2",
          ],
          context.side() === "left" && [
            "inset-y-0 left-0 w-3/4 border-r sm:max-w-sm",
            "after:inset-y-0 after:right-[calc(100%-1px)] after:w-1/2",
          ],
          context.side() === "right" && [
            "inset-y-0 right-0 w-3/4 border-l sm:max-w-sm",
            "after:inset-y-0 after:left-[calc(100%-1px)] after:w-1/2",
          ],
          local.class,
        )}
        {...rest}
      >
        <Show when={local.withHandle}>
          <div
            class={cx(
              "bg-muted shrink-0 self-center rounded-full",
              context.side() === "bottom" && "mt-4 h-1 w-10",
            )}
          />
        </Show>
        {local.children}
      </DrawerPrimitive.Content>
    </>
  )
}

export type DrawerLabelProps<T extends ValidComponent = "h2"> = ComponentProps<
  typeof DrawerPrimitive.Label<T>
>

export const DrawerLabel = <T extends ValidComponent = "h2">(
  props: DynamicProps<T, DrawerLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerLabelProps, ["class"])

  return (
    <DrawerPrimitive.Label
      data-slot="drawer-label"
      class={cx("text-foreground font-semibold", local.class)}
      {...rest}
    />
  )
}

export type DrawerDescriptionProps<T extends ValidComponent = "p"> =
  ComponentProps<typeof DrawerPrimitive.Description<T>>

export const DrawerDescription = <T extends ValidComponent = "p">(
  props: DynamicProps<T, DrawerDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerDescriptionProps, ["class"])

  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      class={cx("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  )
}

export type DrawerHeaderProps = ComponentProps<"div">

export const DrawerHeader = (props: DrawerHeaderProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="drawer-header"
      class={cx("flex flex-col gap-1.5 p-4", local.class)}
      {...rest}
    />
  )
}

export type DrawerFooterProps = ComponentProps<"div">

export const DrawerFooter = (props: DrawerFooterProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="drawer-footer"
      class={cx("mt-auto flex flex-col gap-2 p-4", local.class)}
      {...rest}
    />
  )
}
