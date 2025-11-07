import type { LinkComponent } from "@tanstack/solid-router"
import { Link, createFileRoute } from "@tanstack/solid-router"

import Announcement from "@/components/announcement"
import CardsDemo from "@/components/cards"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import SEO from "@/components/seo"
import { Button } from "@/registry/ui/button"

const title = "The Foundation for your Design System"
const description =
  "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code."

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
  head: () => SEO({ title, description }),
})

function RouteComponent() {
  return (
    <>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button<LinkComponent<"a">>
            as={(props) => (
              <Link to="/docs/introduction" {...props}>
                Get Started
              </Link>
            )}
            size="sm"
          />
          <Button<LinkComponent<"a">>
            as={(props) => (
              <Link to="/docs/components/accordion" {...props}>
                View Components
              </Link>
            )}
            variant="ghost"
            size="sm"
          />
        </PageActions>
      </PageHeader>
      <div class="container-wrapper section-soft flex-1 pb-6">
        <div class="container overflow-hidden">
          <section class="-mx-4 w-[160vw] overflow-hidden rounded-lg md:hidden md:w-[150vw]">
            <img
              src="/examples/cards-light.png"
              width={1400}
              height={875}
              alt="Cards"
              class="block dark:hidden"
            />
            <img
              src="/examples/cards-dark.png"
              width={1400}
              height={875}
              alt="Cards"
              class="hidden dark:block"
            />
          </section>
          <section class="theme-container hidden md:block">
            <CardsDemo />
          </section>
        </div>
      </div>
    </>
  )
}
