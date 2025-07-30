import { splitProps, type ComponentProps } from "solid-js"

import { cx } from "@repo/tailwindcss/utils/cva"

export const PageHeader = (props: ComponentProps<"section">) => {
  const [, rest] = splitProps(props, ["class", "children"])

  return (
    <section class={cx("border-grid", props.class)} {...rest}>
      <div class="container-wrapper">
        <div class="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
          {props.children}
        </div>
      </div>
    </section>
  )
}

export const PageHeaderHeading = (props: ComponentProps<"h1">) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <h1
      class={cx(
        "text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter",
        props.class,
      )}
      {...rest}
    />
  )
}

export const PageHeaderDescription = (props: ComponentProps<"p">) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <p
      class={cx(
        "text-foreground max-w-3xl text-base text-balance sm:text-lg",
        props.class,
      )}
      {...rest}
    />
  )
}

export const PageActions = (props: ComponentProps<"div">) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cx(
        "flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none",
        props.class,
      )}
      {...rest}
    />
  )
}
