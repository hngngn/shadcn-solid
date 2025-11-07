/// <reference types="vite/client" />
import type { JSX } from "solid-js"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/solid-router"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core"

import SEO from "@/components/seo"

export const Route = createRootRoute({
  head: () => SEO(),
  shellComponent: RootDocument,
})

function RootDocument(props: { children: JSX.Element }) {
  return (
    <>
      <HeadContent />
      <ColorModeScript />
      <ColorModeProvider>{props.children}</ColorModeProvider>
      <Scripts />
    </>
  )
}
