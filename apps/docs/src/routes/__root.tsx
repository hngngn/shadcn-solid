/// <reference types="vite/client" />

import type { JSX } from "solid-js"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/solid-router"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core"

import { Toaster } from "@repo/tailwindcss/ui/v4/sonner"

import SEO from "@/components/seo"

export const Route = createRootRoute({
  head: () => SEO(),
  shellComponent: RootComponent,
})

function RootComponent(props: { children: JSX.Element }) {
  return (
    <>
      <HeadContent />
      <ColorModeScript />
      <ColorModeProvider>
        {props.children}
        <Toaster position="top-center" />
      </ColorModeProvider>
      <Scripts />
    </>
  )
}
