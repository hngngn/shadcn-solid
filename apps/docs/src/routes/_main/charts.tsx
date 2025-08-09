import type { LinkComponent } from "@tanstack/solid-router"
import { Link, Outlet, createFileRoute, redirect } from "@tanstack/solid-router"

import { Button } from "@repo/tailwindcss/ui/v4/button"

import Announcement from "@/components/announcement"
import ChartNav from "@/components/chart-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import PageNav from "@/components/page-nav"

export const Route = createFileRoute("/_main/charts")({
  beforeLoad: ({ params }) => {
    // @ts-expect-error
    if (!params.type) {
      throw redirect({ to: "/charts/$type", params: { type: "area" } })
    }
  },
  component: RouteComponent,
})

const title = "Beautiful Charts & Graphs"
const description =
  "A collection of ready-to-use chart components built with Recharts. From basic charts to rich data displays, copy and paste into your apps."

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
              <Link to="#charts" {...props}>
                Browse Charts
              </Link>
            )}
            size="sm"
          />
          <Button<LinkComponent<"a">>
            as={(props) => (
              <Link to="/docs/components/chart" {...props}>
                Documentation
              </Link>
            )}
            variant="ghost"
            size="sm"
          />
        </PageActions>
      </PageHeader>
      <PageNav id="charts">
        <ChartNav />
      </PageNav>
      <div class="container-wrapper section-soft flex-1">
        <div class="container pb-6">
          <section class="theme-container">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  )
}
