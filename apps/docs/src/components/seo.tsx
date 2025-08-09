import type { AnyRouteMatch } from "@tanstack/solid-router"

import { siteConfig } from "@/config/site"
import mainCSS from "@/styles/app.css?url"

interface SEOProps {
  title?: string
  description?: string
}

type Awaitable<T> = T | Promise<T>

const SEO = (
  { title, description }: SEOProps = Object.assign({}),
): Awaitable<{
  links?: AnyRouteMatch["links"]
  scripts?: AnyRouteMatch["headScripts"]
  meta?: AnyRouteMatch["meta"]
  styles?: AnyRouteMatch["styles"]
}> => ({
  meta: [
    {
      charset: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: `${title ?? "The Foundation for your Design System"} - ${siteConfig.title}`,
    },
    {
      name: "description",
      content: description ?? siteConfig.description,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: `${title ?? "The Foundation for your Design System"} - ${siteConfig.title}`,
    },
    {
      name: "twitter:description",
      content: description ?? siteConfig.description,
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
      content: `${title ?? "The Foundation for your Design System"} - ${siteConfig.title}`,
    },
    {
      name: "og:description",
      content: description ?? siteConfig.description,
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
})

export default SEO
