import { Show } from "solid-js"
import type { RouteSectionProps } from "@solidjs/router"
import { allDocs } from "#content"
// @ts-expect-error
import { Balancer } from "solid-wrap-balancer"

import { MDXProvider } from "@/components/mdx"
import { mdxComponents } from "@/components/mdx-components"
import { PageNavigation } from "@/components/page-navigation"
import { Sidebar } from "@/components/sidebar"
import { Toc } from "@/components/toc"
import { badgeVariants } from "@/registry/tailwindcss/ui/badge"

const DocsLayout = (props: RouteSectionProps) => {
  const data = () =>
    allDocs.find((item) => item.slug === props.location.pathname)!

  return (
    <div class="container-wrapper">
      <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside class="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
          <div class="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
            <Sidebar />
          </div>
        </aside>
        <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div class="mx-auto w-full min-w-0 max-w-2xl">
            <div class="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
              <div class="truncate">Docs</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-3.5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m9 6l6 6l-6 6"
                />
              </svg>
              <div class="text-foreground">{data().frontmatter.title}</div>
            </div>
            <div class="space-y-2">
              <h1 class="scroll-m-20 text-3xl font-bold tracking-tight">
                {data().frontmatter.title}
              </h1>
              <Show when={data().frontmatter.description}>
                <p class="text-muted-foreground text-base">
                  <Balancer>{data().frontmatter.description}</Balancer>
                </p>
              </Show>
            </div>
            <Show when={data().frontmatter.link}>
              <div class="flex items-center space-x-2 pt-4">
                <Show when={data().frontmatter.link?.doc}>
                  <a
                    href={data().frontmatter.link?.doc}
                    target="_blank"
                    rel="noreferrer"
                    class={badgeVariants({
                      variant: "outline",
                      class: "bg-muted/60",
                    })}
                  >
                    Docs
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ml-1 h-3 w-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"
                      />
                      <title>Open docs</title>
                    </svg>
                  </a>
                </Show>

                <Show when={data().frontmatter.link?.api}>
                  <a
                    href={data().frontmatter.link?.api}
                    target="_blank"
                    rel="noreferrer"
                    class={badgeVariants({
                      variant: "outline",
                      class: "bg-muted/60",
                    })}
                  >
                    API Reference
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ml-1 h-3 w-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"
                      />
                      <title>Open Reference</title>
                    </svg>
                  </a>
                </Show>
              </div>
            </Show>
            <div class="max-w-full pb-12 pt-8">
              <MDXProvider components={mdxComponents}>
                {props.children}
              </MDXProvider>
            </div>
            <PageNavigation />
          </div>
          <Show when={data().frontmatter.toc === undefined}>
            <div class="hidden text-sm xl:block">
              <div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
                <Toc data={data().headings} />
              </div>
            </div>
          </Show>
        </main>
      </div>
    </div>
  )
}

export default DocsLayout
