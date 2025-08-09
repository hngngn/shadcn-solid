import { Show } from "solid-js"
import {
  Link,
  createFileRoute,
  notFound,
  useLocation,
} from "@tanstack/solid-router"

import { Badge } from "@repo/tailwindcss/ui/v4/badge"
import { Button } from "@repo/tailwindcss/ui/v4/button"

import DocsLoading from "@/components/loading/docs"
import DocNotFound from "@/components/not-found/doc"
import SEO from "@/components/seo"
import Toc from "@/components/toc"
import type { TNavItem, TNavItemWithChildren } from "@/config/docs"
import { docsConfig } from "@/config/docs"
import { Contents } from "@/content"

export const Route = createFileRoute("/_main/docs/$")({
  beforeLoad: ({ params }) => {
    if (params._splat === undefined) throw notFound()

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Contents[params._splat] === undefined) throw notFound()
  },
  component: RouteComponent,
  notFoundComponent: DocNotFound,
  pendingComponent: DocsLoading,
  head: ({ params }) => {
    const data = Contents[params._splat!].data

    return SEO({
      title: data.title,
      description: data.description,
    })
  },
})

function RouteComponent() {
  const params = Route.useParams()
  const location = useLocation()

  const data = () => Contents[params()._splat!].data
  const headings = () => Contents[params()._splat!].headings
  const component = () => Contents[params()._splat!].component

  const getPagerForDoc = (slug: string) => {
    const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null]
    let activeIndex: number
    if (!slug) {
      activeIndex = 1
    } else {
      activeIndex = flattenedLinks.findIndex((link) => slug === link?.href)
    }

    const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
    const next =
      activeIndex !== flattenedLinks.length - 1
        ? flattenedLinks[activeIndex + 1]
        : null
    return {
      prev,
      next,
    }
  }

  const flatten = (links: TNavItemWithChildren[]): TNavItem[] => {
    return links
      .reduce<TNavItem[]>((flat, link) => {
        return flat.concat(link.items.length ? flatten(link.items) : link)
      }, [])
      .filter((link) => !link.disabled)
  }

  const pager = () => getPagerForDoc(location().pathname)

  return (
    <div
      data-slot="docs"
      class="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div class="flex min-w-0 flex-1 flex-col">
        <div class="h-(--top-spacing) shrink-0" />
        <div class="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <div class="flex items-start justify-between">
                <h1 class="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                  {data().title}
                </h1>
                <div class="flex items-center gap-2 pt-1.5">
                  <Show when={pager().prev?.href}>
                    <Button<typeof Link>
                      variant="secondary"
                      size="icon"
                      class="extend-touch-target size-8 shadow-none md:size-7"
                      as={(props) => (
                        <Link to={pager().prev?.href} {...props}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-4"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m12 19l-7-7l7-7m7 7H5"
                            />
                          </svg>
                        </Link>
                      )}
                    />
                  </Show>
                  <Show when={pager().prev?.href}>
                    <Button<typeof Link>
                      variant="secondary"
                      size="icon"
                      class="extend-touch-target size-8 shadow-none md:size-7"
                      as={(props) => (
                        <Link to={pager().next?.href} {...props}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-4"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 12h14m-7-7l7 7l-7 7"
                            />
                          </svg>
                        </Link>
                      )}
                    />
                  </Show>
                </div>
              </div>
              <Show when={data().description}>
                <p class="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                  {data().description}
                </p>
              </Show>
            </div>
            <Show when={data().link}>
              <div class="flex items-center space-x-2 pt-4">
                <Show when={data().link?.doc}>
                  <Badge<typeof Badge>
                    as={(props) => (
                      <Link
                        to={data().link?.doc}
                        target="_blank"
                        rel="noreferrer"
                        {...props}
                      >
                        Docs{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="size-4"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 7h10v10M7 17L17 7"
                          />
                        </svg>
                      </Link>
                    )}
                    variant="secondary"
                  />
                </Show>
                <Show when={data().link?.api}>
                  <Badge<typeof Badge>
                    as={(props) => (
                      <Link
                        to={data().link?.api}
                        target="_blank"
                        rel="noreferrer"
                        {...props}
                      >
                        API Reference{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="size-4"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 7h10v10M7 17L17 7"
                          />
                        </svg>
                      </Link>
                    )}
                    variant="secondary"
                  />
                </Show>
              </div>
            </Show>
          </div>
          <div class="w-full flex-1 *:data-[slot=alert]:first:mt-0">
            {component()}
          </div>
        </div>
        <div class="mx-auto flex h-16 w-full max-w-2xl items-center gap-2 px-4 md:px-0">
          <Show when={pager().prev?.href}>
            <Button<typeof Link>
              variant="secondary"
              size="sm"
              as={(props) => (
                <Link to={pager().prev?.href} {...props}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m12 19l-7-7l7-7m7 7H5"
                    />
                  </svg>
                  {pager().prev?.title}
                </Link>
              )}
            />
          </Show>
          <Show when={pager().prev?.href}>
            <Button<typeof Link>
              variant="secondary"
              size="sm"
              class="ml-auto"
              as={(props) => (
                <Link to={pager().next?.href} {...props}>
                  {pager().next?.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14m-7-7l7 7l-7 7"
                    />
                  </svg>
                </Link>
              )}
            />
          </Show>
        </div>
      </div>
      <div class="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div class="h-(--top-spacing) shrink-0" />
        <div class="no-scrollbar overflow-y-auto px-8">
          <Toc data={headings()} />
          <div class="h-12" />
        </div>
      </div>
    </div>
  )
}
