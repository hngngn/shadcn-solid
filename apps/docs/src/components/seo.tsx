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
}> => {
  const metaTitle = `${title ?? "The Foundation for your Design System"} - ${siteConfig.title}`
  const metaDescription = description ?? siteConfig.description
  const metaOG = `${import.meta.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? siteConfig.url : `https://${import.meta.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`}/og?title=${encodeURIComponent(
    metaTitle,
  )}&description=${encodeURIComponent(metaDescription)}`

  return {
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: metaTitle,
      },
      {
        name: "description",
        content: metaDescription,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: metaTitle,
      },
      {
        name: "twitter:description",
        content: metaDescription,
      },
      {
        name: "twitter:image",
        content: metaOG,
      },
      {
        name: "twitter:creator",
        content: "@hnggngnn",
      },
      {
        name: "og:title",
        content: metaTitle,
      },
      {
        name: "og:description",
        content: metaDescription,
      },
      {
        name: "og:image",
        content: metaOG,
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
  }
}

export default SEO
