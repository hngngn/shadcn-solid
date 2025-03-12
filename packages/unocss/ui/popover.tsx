import {
  mergeProps,
  splitProps,
  type ParentProps,
  type ValidComponent,
} from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Popover as PopoverPrimitive,
  type PopoverContentProps,
  type PopoverRootProps,
} from "@kobalte/core/popover"

import { cn } from "@/libs/cn"

export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverTitle = PopoverPrimitive.Title
export const PopoverDescription = PopoverPrimitive.Description

export const Popover = (props: PopoverRootProps) => {
  const merge = mergeProps<PopoverRootProps[]>(
    {
      gutter: 4,
      flip: false,
    },
    props
  )

  return <PopoverPrimitive {...merge} />
}

type popoverContentProps<T extends ValidComponent = "div"> = ParentProps<
  PopoverContentProps<T> & {
    class?: string
  }
>

export const PopoverContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, popoverContentProps<T>>
) => {
  const [local, rest] = splitProps(props as popoverContentProps, [
    "class",
    "children",
  ])

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "bg-popover text-popover-foreground data-[expanded]:(animate-in fade-in-0 zoom-in-95) data-[closed]:(animate-out fade-out-0 zoom-out-95) z-50 w-72 rounded-md border p-4 shadow-md outline-none",
          local.class
        )}
        {...rest}
      >
        {local.children}
        <PopoverPrimitive.CloseButton class="ring-offset-background focus:(outline-none ring-1.5 ring-ring ring-offset-2) transition-property-[opacity,box-shadow] absolute right-4 top-4 rounded-sm bg-inherit opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-4 w-4"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 6L6 18M6 6l12 12"
            />
            <title>Close</title>
          </svg>
        </PopoverPrimitive.CloseButton>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
