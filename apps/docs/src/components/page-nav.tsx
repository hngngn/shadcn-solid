import { splitProps, type ComponentProps } from "solid-js"

import { cx } from "@repo/tailwindcss/utils/cva"

const PageNav = (props: ComponentProps<"div">) => {
  const [, rest] = splitProps(props, ["class", "children"])

  return (
    <div class={cx("container-wrapper scroll-mt-24", props.class)} {...rest}>
      <div class="container flex items-center justify-between gap-4 py-4">
        {props.children}
      </div>
    </div>
  )
}

export default PageNav
