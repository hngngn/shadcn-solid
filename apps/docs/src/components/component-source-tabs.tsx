import type { ParentProps } from "solid-js"
import { Show, children, mergeProps } from "solid-js"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/registry/ui/tabs"

import ComponentSource from "./component-source"

type Props = {
  withComponent?: boolean
} & ParentProps

const ComponentSourceTabs = (props: Props) => {
  const merge = mergeProps<Props[]>({ withComponent: true }, props)
  const childrens = children(() => merge.children).toArray()

  return (
    <Tabs class="mt-6">
      <TabsList>
        <TabsTrigger value="tw">TailwindCSS</TabsTrigger>
        <TabsTrigger value="uno">UnoCSS</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="tw">
        <Show when={merge.withComponent} fallback={childrens[0]}>
          <ComponentSource>{childrens[0]}</ComponentSource>
        </Show>
      </TabsContent>
      <TabsContent value="uno">
        <Show when={merge.withComponent} fallback={childrens[1]}>
          <ComponentSource>{childrens[1]}</ComponentSource>
        </Show>
      </TabsContent>
    </Tabs>
  )
}

export default ComponentSourceTabs
