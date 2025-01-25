import { Show, splitProps, type ComponentProps } from "solid-js"

import CodeBlockCommand from "@/components/code-block-command"
import ComponentInstallation from "@/components/component-installation"
import ComponentPreview from "@/components/component-preview"
import { cn } from "@/registry/tailwindcss/libs/cn"
import { Alert, AlertDescription } from "@/registry/tailwindcss/ui/alert"

import { CopyButton } from "./copy-button"
import type { MDXComponents } from "./mdx"

export const mdxComponents: Partial<MDXComponents> | Record<string, unknown> = {
  a: (props) => (
    <a class="font-medium underline underline-offset-4" {...props} />
  ),
  code: (props) => (
    <code
      class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
  h1: (props) => (
    <h1 class="font-heading mt-2 scroll-m-20 text-4xl font-bold" {...props} />
  ),
  h2: (props) => (
    <h2
      class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h5: (props) => (
    <h5
      class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h6: (props) => (
    <h6
      class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  li: (props) => <li class="mt-2" {...props} />,
  ol: (props) => <ol class="my-6 ml-6 list-decimal" {...props} />,
  p: (props) => (
    <p class="break-words leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: (props) => <ul class="my-6 ml-6 list-disc" {...props} />,
  pre: (
    props: ComponentProps<"pre"> & {
      rawString: string
      npmCommand: string
      yarnCommand: string
      pnpmCommand: string
      bunCommand: string
      withMeta: boolean
    }
  ) => {
    const [local, command, rest] = splitProps(
      props,
      [
        "rawString",
        "npmCommand",
        "yarnCommand",
        "pnpmCommand",
        "bunCommand",
        "withMeta",
      ],
      ["npmCommand", "yarnCommand", "pnpmCommand", "bunCommand"]
    )
    const isNpmCommand = () =>
      local.npmCommand &&
      local.pnpmCommand &&
      local.yarnCommand &&
      local.bunCommand

    return (
      <Show
        when={!isNpmCommand()}
        fallback={<CodeBlockCommand {...command} {...props} />}
      >
        <pre
          class="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-[#101010] py-4 text-white"
          {...rest}
        />
        <Show when={local.rawString && !local.npmCommand}>
          <CopyButton rawString={local.rawString} withMeta={local.withMeta} />
        </Show>
      </Show>
    )
  },
  Step: (props: ComponentProps<"div">) => (
    <div
      class="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  StepItem: (props: ComponentProps<"h3">) => (
    <h3
      class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  table: (props) => (
    <div class="my-6 w-full overflow-y-auto">
      <table
        class={cn(
          "relative w-full overflow-hidden border-none text-sm",
          props.class
        )}
        {...props}
      />
    </div>
  ),
  tr: (props) => (
    <tr class={cn("last:border-b-none m-0 border-b", props.class)} {...props} />
  ),
  th: (props) => (
    <th
      class={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        props.class
      )}
      {...props}
    />
  ),
  td: (props) => (
    <td
      class={cn(
        "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        props.class
      )}
      {...props}
    />
  ),
  ComponentPreview,
  ComponentInstallation,
  Alert,
  AlertDescription,
}
