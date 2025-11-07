import type { ComponentProps, ValidComponent } from "solid-js"
import { createContext, splitProps, useContext } from "solid-js"
import { ToggleGroup as ToggleGroupPrimitive } from "@kobalte/core/toggle-group"
import type { VariantProps } from "cva"

import { cx } from "@/registry/lib/cva"

import { toggleButtonVariants } from "./toggle-button"

const ToggleGroupContext =
  createContext<VariantProps<typeof toggleButtonVariants>>()

export type ToggleGroupProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof ToggleGroupPrimitive<T>
> &
  VariantProps<typeof toggleButtonVariants>

export const ToggleGroup = <T extends ValidComponent = "div">(
  props: ToggleGroupProps<T>,
) => {
  const [, rest] = splitProps(props as ToggleGroupProps, [
    "class",
    "variant",
    "size",
    "children",
  ])

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={props.variant}
      data-size={props.size}
      class={cx(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        props.class,
      )}
      {...rest}
    >
      <ToggleGroupContext.Provider
        value={{
          get size() {
            return props.size
          },
          get variant() {
            return props.variant
          },
        }}
      >
        {props.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

export type ToggleGroupItemProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof ToggleGroupPrimitive.Item<T>> &
    VariantProps<typeof toggleButtonVariants>

export const ToggleGroupItem = <T extends ValidComponent = "button">(
  props: ToggleGroupItemProps<T>,
) => {
  const [, rest] = splitProps(props as ToggleGroupItemProps, [
    "class",
    "variant",
    "size",
  ])
  const context = useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context?.variant ?? props.variant}
      data-size={context?.size ?? props.size}
      class={toggleButtonVariants({
        variant: context?.variant ?? props.variant,
        size: context?.size ?? props.size,
        class: [
          "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
          props.class,
        ],
      })}
      {...rest}
    />
  )
}
