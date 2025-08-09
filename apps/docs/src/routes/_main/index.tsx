import type { LinkComponent } from "@tanstack/solid-router"
import { Link, createFileRoute } from "@tanstack/solid-router"

import { Button } from "@repo/tailwindcss/ui/v4/button"

import Announcement from "@/components/announcement"
import CardsDemo from "@/components/cards"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import SEO from "@/components/seo"

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
          <section class="border-border/50 -mx-4 w-[160vw] overflow-hidden rounded-lg border md:hidden md:w-[150vw]">
            <img
              src="/r/styles/new-york-v4/dashboard-01-light.png"
              width={1400}
              height={875}
              alt="Dashboard"
              class="block dark:hidden"
            />
            <img
              src="/r/styles/new-york-v4/dashboard-01-dark.png"
              width={1400}
              height={875}
              alt="Dashboard"
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
