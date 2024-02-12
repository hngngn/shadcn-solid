import { Index } from "@/__registry__"
import { cn } from "@/lib/cn"
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs"
import {
  createMemo,
  mergeProps,
  splitProps,
  type ComponentProps,
  type ParentComponent,
} from "solid-js"

type ComponentPreviewProps = ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
}

export const ComponentPreview: ParentComponent<ComponentPreviewProps> = (
  props
) => {
  const merge = mergeProps(
    {
      align: "center",
    },
    props
  )
  const [local, rest] = splitProps(merge, [
    "class",
    "align",
    "children",
    "name",
  ])

  const Preview = createMemo(() => {
    const Component = (Index as Record<string, any>)["default"][local.name]
      ?.component

    if (!Component) {
      return (
        <p class="text-muted-foreground text-sm">
          Component{" "}
          <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {local.name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  })

  return (
    <div
      class={cn("group relative my-4 flex flex-col space-y-2", local.class)}
      {...rest}
    >
      <Tabs defaultValue="preview">
        <div class="pb-3">
          <TabsList class="w-full rounded-none bg-transparent p-0">
            <TabsTrigger
              value="preview"
              class="rounded-none bg-transparent px-4 pb-3.5 pt-2 font-semibold data-[selected]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              class="rounded-none bg-transparent px-4 pb-3.5 pt-2 font-semibold data-[selected]:shadow-none"
            >
              Code
            </TabsTrigger>
            <TabsIndicator class="bg-primary" />
          </TabsList>
        </div>
        <TabsContent value="preview" class="relative rounded-md border">
          <div
            class={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              local.align === "center" && "items-center",
              local.align === "start" && "items-start",
              local.align === "end" && "items-end"
            )}
          >
            {Preview()}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div class="flex flex-col space-y-4">
            <div class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {local.children}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
