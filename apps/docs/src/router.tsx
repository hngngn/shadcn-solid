import {
  Navigate,
  createRouter as createTanStackRouter,
} from "@tanstack/solid-router"

import { routeTree } from "./routeTree.gen"

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: () => <Navigate to="/" replace />,
    defaultViewTransition: true,
  })
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
