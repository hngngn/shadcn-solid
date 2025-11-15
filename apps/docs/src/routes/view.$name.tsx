import type { JSX } from "solid-js"
import { createEffect, createMemo } from "solid-js"
import { createFileRoute } from "@tanstack/solid-router"

import { Index } from "@/registry/__index__"

export const Route = createFileRoute("/view/$name")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  createEffect(() => {
    window.addEventListener("storage", (event) => {
      if (event.key === "kb-color-mode") {
        const colorMode = event.newValue
        if (!colorMode) return

        document.documentElement.setAttribute("data-kb-theme", colorMode)
        document.documentElement.style.colorScheme = colorMode
      }
    })
  })

  const Component = createMemo(
    () => Index.tailwindcss[params().name]?.component() as JSX.Element,
  )

  return <Component />
}
