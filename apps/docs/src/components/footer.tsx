import { Link } from "@tanstack/solid-router"

import { siteConfig } from "@/config/site"

const Footer = () => {
  return (
    <footer class="group-has-[.section-soft]/body:bg-surface/40 dark:bg-transparent">
      <div class="container-wrapper px-4 xl:px-6">
        <div class="flex h-(--footer-height) items-center justify-between">
          <div class="text-muted-foreground w-full text-center text-xs leading-loose sm:text-sm">
            Built & designed by{" "}
            <Link
              to={siteConfig.links.shadcn.twitter}
              target="_blank"
              rel="noreferrer"
              class="font-medium underline underline-offset-4"
            >
              shadcn
            </Link>
            . Ported to Solid by{" "}
            <Link
              to={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
              class="font-medium underline underline-offset-4"
            >
              hngngn
            </Link>
            . The source code is available on{" "}
            <Link
              to={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              class="font-medium underline underline-offset-4"
            >
              GitHub.
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
