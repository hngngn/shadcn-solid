import type { ComponentProps, ParentComponent } from "solid-js"
import { Show, children, mergeProps, splitProps } from "solid-js"
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "./ui"

interface ComponentExampleProps extends ComponentProps<"div"> {
    extractClass?: boolean
    extractedClasses?: string
    align?: "center" | "start" | "end"
    src?: string
}

export const ComponentExample: ParentComponent<ComponentExampleProps> = (
    props
) => {
    const merge = mergeProps({ align: "center" }, props)

    const [local, rest] = splitProps(merge, [
        "children",
        "class",
        "extractClass",
        "extractedClasses",
        "align",
        "src",
        "classList",
    ])

    const [Example, Code, ...Children] = children(
        () => local.children
    ).toArray()

    return (
        <div
            class="relative my-4 flex flex-col space-y-2"
            classList={{
                [props.class!]: props.class !== undefined,
                ...local.classList,
            }}
            {...rest}
        >
            <Tabs defaultValue="preview">
                <div class="pb-3">
                    <TabsList class="w-full rounded-none bg-transparent p-0!">
                        <TabsTrigger
                            value="preview"
                            class="rounded-none! bg-transparent! px-4! pb-3.5! pt-2! font-semibold! shadow-none!"
                        >
                            Preview
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            class="rounded-none! bg-transparent! px-4! pb-3.5! pt-2! font-semibold! shadow-none!"
                        >
                            Code
                        </TabsTrigger>
                        <TabsIndicator class="bg-primary" />
                    </TabsList>
                </div>
                <TabsContent value="preview" class="rounded-md border">
                    <div
                        class="flex min-h-[350px] justify-center p-10"
                        classList={{
                            "items-center": local.align === "center",
                            "items-start": local.align === "start",
                            "items-end": local.align === "end",
                        }}
                    >
                        {Example}
                    </div>
                </TabsContent>
                <TabsContent value="code">
                    <div class="flex flex-col space-y-4">
                        <div class="w-full rounded-md mdx-example">{Code}</div>
                        <Show when={Children.length}>
                            <div class="rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                                {Children}
                            </div>
                        </Show>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
