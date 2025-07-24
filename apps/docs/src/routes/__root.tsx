/// <reference types="vite/client" />

import { Outlet, createRootRoute } from "@tanstack/solid-router"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core"

import { siteConfig } from "@/config/site"
import mainCSS from "@/styles/app.css?url"

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: siteConfig.title,
      },
      {
        name: "description",
        content: siteConfig.description,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: siteConfig.title,
      },
      {
        name: "twitter:description",
        content: siteConfig.description,
      },
      {
        name: "twitter:image",
        content: `${siteConfig.url}/og.png`,
      },
      {
        name: "twitter:creator",
        content: "@hnggngnn",
      },
      {
        name: "og:title",
        content: siteConfig.title,
      },
      {
        name: "og:description",
        content: siteConfig.description,
      },
      {
        name: "og:image",
        content: `${siteConfig.url}/og.png`,
      },
      {
        name: "og:image:width",
        content: "1200",
      },
      {
        name: "og:image:height",
        content: "630",
      },
      {
        property: "canonical",
        content: siteConfig.url,
      },
    ],
    links: [
      {
        rel: "shortcut icon",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
      {
        rel: "stylesheet",
        href: mainCSS,
      },
    ],
  }),
})

function RootComponent() {
  return (
    <>
      <ColorModeScript />
      <ColorModeProvider>
        <Outlet />
      </ColorModeProvider>
    </>
  )
}
