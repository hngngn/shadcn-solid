import { Index } from "@/__registry__";
import { cn } from "@/libs/cn";
import { frameworks } from "@/registry/framework";
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger
} from "@/registry/tailwindcss/ui/tabs";
import { type ComponentProps, type ParentComponent, Show, mergeProps, splitProps } from "solid-js";

type ComponentPreviewProps = ComponentProps<"div"> & {
  name: string;
  align?: "center" | "start" | "end";
};

const Preview = (props: { name: string }) => {
  // @ts-expect-error
  // eslint-disable-next-line solid/reactivity
  const Component = Index[frameworks[0].name][props.name]?.component;

  return (
    <Show
      when={Component}
      fallback={
        <p class="text-sm text-muted-foreground">
          Component{" "}
          <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {props.name}
          </code>{" "}
          not found in registry.
        </p>
      }
    >
      <Component />
    </Show>
  );
};

export const ComponentPreview: ParentComponent<ComponentPreviewProps> = props => {
  const merge = mergeProps(
    {
      align: "center"
    },
    props
  );
  const [local, rest] = splitProps(merge, ["class", "align", "children", "name"]);

  return (
    <div class={cn("group relative my-4 flex flex-col space-y-2", local.class)} {...rest}>
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
        <TabsContent value="preview" class="relative rounded-md border has-[.is-table]:border-none">
          <div
            class={cn(
              "preview flex min-h-[350px] w-full justify-center p-10 has-[.is-table]:p-0",
              local.align === "center" && "items-center",
              local.align === "start" && "items-start",
              local.align === "end" && "items-end"
            )}
          >
            <Preview name={local.name} />
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
  );
};
