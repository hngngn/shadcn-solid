import { createRouter as createTanStackRouter } from "@tanstack/solid-router"

import MainNotFound from "./components/not-found/main"
import { routeTree } from "./routeTree.gen"

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: MainNotFound,
    defaultViewTransition: true,
  })
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
