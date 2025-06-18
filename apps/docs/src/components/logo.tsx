import type { ComponentProps, VoidProps } from "solid-js"

const Logo = (props: VoidProps<ComponentProps<"svg">>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        class="stroke-blue-600 dark:stroke-blue-400"
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
      <line
        class="stroke-blue-600 dark:stroke-blue-400"
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
    </svg>
  )
}

export default Logo
