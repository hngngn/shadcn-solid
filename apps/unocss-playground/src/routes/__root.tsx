/// <reference types="vite/client" />
import type { JSX } from "solid-js"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/solid-router"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core"

import { Toaster } from "@/registry/ui/sonner"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument(props: { children: JSX.Element }) {
  return (
    <>
      <HeadContent />
      <ColorModeScript />
      <ColorModeProvider>
        {props.children}
        <Toaster />
      </ColorModeProvider>
      <Scripts />
    </>
  )
}
