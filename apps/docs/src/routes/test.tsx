import { Suspense } from "solid-js"
import { createFileRoute } from "@tanstack/solid-router"
// @ts-expect-error
import { MDXProvider } from "solid-mdx"

import { mdxCustomComponents } from "@/components/mdx"
import Intro from "@/content/docs/components/button.mdx"

export const Route = createFileRoute("/test")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/test"!
      <Suspense>
        <MDXProvider components={mdxCustomComponents}>
          <Intro />
        </MDXProvider>
      </Suspense>
    </div>
  )
}
