import { children, type ParentComponent } from "solid-js"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/registry/ui/tabs"

import ComponentSource from "./component-source"

const ComponentSourceTabs: ParentComponent = (props) => {
  const childrens = children(() => props.children).toArray()

  return (
    <Tabs class="mt-6">
      <TabsList>
        <TabsTrigger value="tw">TailwindCSS</TabsTrigger>
        <TabsTrigger value="uno">UnoCSS</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="tw">
        <ComponentSource>{childrens[0]}</ComponentSource>
      </TabsContent>
      <TabsContent value="uno">
        <ComponentSource>{childrens[1]}</ComponentSource>
      </TabsContent>
    </Tabs>
  )
}

export default ComponentSourceTabs
