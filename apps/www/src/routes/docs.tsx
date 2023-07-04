import { MDXComponent } from "@/components/mdx-components"
import { DocsPager } from "@/components/pager"
import { Sidebar } from "@/components/sidebar"
import { TableOfContents } from "@/components/toc"
import { Button } from "@/registry/default/ui/button"
import { Separator } from "@/registry/default/ui/separator"
import { As } from "@kobalte/core"
import { IconChevronRight } from "@tabler/icons-solidjs"
import { Show, createMemo } from "solid-js"
import { MDXProvider } from "solid-mdx"
import { A, Outlet, useLocation } from "solid-start"
import { Balancer } from "solid-wrap-balancer"

const contents = /*#__PURE__*/ import.meta.glob<
    true,
    any,
    {
        headings: {
            depth: number
            text: string
            slug: string
        }[]
        frontmatter: {
            title: string
            description: string
            component?: boolean
            kobalte?: {
                link: string
                api: string
            }
        }
    }
>("./docs/**/*.mdx", {
    eager: true,
})

export default () => {
    const location = useLocation()
    const data = createMemo(() => {
        return {
            frontmatter: contents[`.${location.pathname}.mdx`].frontmatter,
            headings: contents[`.${location.pathname}.mdx`].headings,
        }
    })

    return (
        <div class="container flex-1 items-start md:grid grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 hover:overflow-y-auto overflow-hidden [scrollbar-gutter:stable] scrollbar-w-2 md:sticky md:block">
                <div class="h-full py-6 pl-8 pr-6 lg:py-8">
                    <Sidebar />
                </div>
            </aside>
            <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div class="mx-auto w-full min-w-0">
                    <div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
                        <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                            Docs
                        </div>
                        <IconChevronRight class="h-4 w-4" />
                        <div class="font-medium text-foreground">
                            {data().frontmatter.title}
                        </div>
                    </div>
                    <div class="space-y-2">
                        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
                            {data().frontmatter.title}
                        </h1>
                        <Show when={data().frontmatter.description}>
                            <p class="text-lg text-muted-foreground">
                                <Balancer>
                                    {data().frontmatter.description}
                                </Balancer>
                            </p>
                        </Show>
                    </div>
                    <Show when={data().frontmatter.kobalte}>
                        <div class="flex items-center space-x-2 pt-4">
                            <Show when={data()?.frontmatter?.kobalte?.link}>
                                <Button asChild variant="secondary">
                                    <As
                                        component={A}
                                        href={data().frontmatter.kobalte?.link!}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Kobalte
                                    </As>
                                </Button>
                            </Show>
                            <Show when={data()?.frontmatter?.kobalte?.api}>
                                <Button asChild variant="secondary">
                                    <As
                                        component={A}
                                        href={data().frontmatter.kobalte?.api!}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        API Reference
                                    </As>
                                </Button>
                            </Show>
                        </div>
                    </Show>
                    <div class="max-w-full pb-12 pt-8">
                        <MDXProvider components={MDXComponent}>
                            <Outlet />
                        </MDXProvider>
                    </div>
                    <Separator class="my-4 md:my-6" />
                    <DocsPager slug={location.pathname} />
                </div>
                <div class="hidden text-sm xl:block">
                    <div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
                        <TableOfContents toc={data().headings} />
                    </div>
                </div>
            </main>
        </div>
    )
}
