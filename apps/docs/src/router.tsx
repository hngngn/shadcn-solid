import { createRouter } from "@tanstack/solid-router"

import MainNotFound from "./components/not-found/main"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: MainNotFound,
    defaultViewTransition: true,
  })

  return router
}
