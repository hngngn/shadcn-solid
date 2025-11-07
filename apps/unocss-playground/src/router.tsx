import { createRouter } from "@tanstack/solid-router"

import { routeTree } from "./routeTree.gen"

import "virtual:uno.css"

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
  })

  return router
}
