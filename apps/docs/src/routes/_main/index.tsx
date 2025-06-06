import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div />
}
