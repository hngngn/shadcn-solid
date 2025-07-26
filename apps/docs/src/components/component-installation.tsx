import type { ComponentProps } from "solid-js"
import { children } from "solid-js"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/tailwindcss/ui/v4/tabs"

import { useConfig } from "@/hooks/use-config"

const ComponentInstallation = (props: ComponentProps<typeof TabsContent>) => {
  const childrens = children(() => props.children).toArray()

  const { config, setConfig } = useConfig()

  return (
    <Tabs
      class="relative mt-6 w-full"
      value={config().installationType}
      onChange={(value) => {
        // @ts-expect-error
        setConfig({ installationType: value })
      }}
    >
      <TabsList class="justify-start gap-4 rounded-none bg-transparent px-2 ring-0 md:px-0">
        <TabsTrigger
          value="cli"
          class="text-muted-foreground data-[selected]:text-foreground px-0 data-[selected]:shadow-none dark:data-[selected]:border-transparent dark:data-[selected]:bg-transparent"
          // TODO: enable when release
          disabled
        >
          CLI
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          class="text-muted-foreground data-[selected]:text-foreground px-0 data-[selected]:shadow-none dark:data-[selected]:border-transparent dark:data-[selected]:bg-transparent"
        >
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="cli"
        class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6"
      >
        {childrens[0]}
      </TabsContent>
      <TabsContent
        value="manual"
        class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6"
      >
        {childrens[1]}
      </TabsContent>
    </Tabs>
  )
}

export default ComponentInstallation
