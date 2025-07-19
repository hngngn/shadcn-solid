import type { JSX } from "solid-js"
import { createMemo } from "solid-js"
import { createFileRoute, notFound } from "@tanstack/solid-router"

import { Index } from "@/__registry__"

export const Route = createFileRoute("/view/$name")({
  beforeLoad: ({ params }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (params.name === undefined) throw notFound()

    if (Index.tailwindcss[params.name] === undefined) throw notFound()
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  const Component = createMemo(
    () => Index.tailwindcss[params().name]?.component() as JSX.Element,
  )

  return <Component />
}
