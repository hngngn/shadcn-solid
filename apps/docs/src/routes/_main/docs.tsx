import { Suspense } from "solid-js"
import { Outlet, createFileRoute } from "@tanstack/solid-router"
// @ts-expect-error
import { MDXProvider } from "solid-mdx"

import { SidebarProvider } from "@repo/tailwindcss/ui/v4/sidebar"

import DocsSidebar from "@/components/docs-sidebar"
import { mdxCustomComponents } from "@/components/mdx"

export const Route = createFileRoute("/_main/docs")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div class="container-wrapper flex flex-1 flex-col">
      <SidebarProvider class="min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
        <DocsSidebar />
        <div class="size-full">
          <Suspense>
            <MDXProvider components={mdxCustomComponents}>
              <Outlet />
            </MDXProvider>
          </Suspense>
        </div>
      </SidebarProvider>
    </div>
  )
}
