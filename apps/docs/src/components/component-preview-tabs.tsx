import {
  Show,
  mergeProps,
  splitProps,
  type ComponentProps,
  type JSX,
} from "solid-js"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/tailwindcss/ui/v4/tabs"
import { cx } from "@repo/tailwindcss/utils/cva"

type Props = ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: () => JSX.Element
}

const ComponentPreviewTabs = (props: Props) => {
  const merge = mergeProps(
    {
      align: "center",
      hideCode: false,
    } as Props,
    props,
  )
  const [local, rest] = splitProps(merge, [
    "class",
    "align",
    "hideCode",
    "component",
    "children",
  ])

  return (
    <div
      class={cx("group relative my-4 flex flex-col gap-2", local.class)}
      {...rest}
    >
      <Tabs class="relative mr-auto w-full">
        <div class="flex items-center justify-between">
          <Show when={!local.hideCode}>
            <TabsList class="justify-start gap-4 rounded-none bg-transparent px-2 ring-0 md:px-0">
              <TabsTrigger
                value="preview"
                class="text-muted-foreground data-[selected]:text-foreground px-0 data-[selected]:shadow-none dark:data-[selected]:border-transparent dark:data-[selected]:bg-transparent"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                class="text-muted-foreground data-[selected]:text-foreground px-0 data-[selected]:shadow-none dark:data-[selected]:border-transparent dark:data-[selected]:bg-transparent"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </Show>
        </div>
        <div class="relative md:-mx-4">
          <TabsContent value="preview">
            <div
              data-align={local.align}
              class="preview flex min-h-[450px] w-full justify-center rounded-lg border p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
            >
              {local.component()}
            </div>
          </TabsContent>
          <TabsContent
            value="code"
            class="overflow-hidden **:[figure]:!m-0 **:[pre]:h-[450px]"
          >
            {local.children}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default ComponentPreviewTabs
