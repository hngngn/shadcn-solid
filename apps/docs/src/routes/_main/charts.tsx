import type { LinkComponent } from "@tanstack/solid-router"
import { Link, Outlet, createFileRoute, redirect } from "@tanstack/solid-router"

import Announcement from "@/components/announcement"
import ChartNav from "@/components/chart-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import PageNav from "@/components/page-nav"
import SEO from "@/components/seo"
import { Button } from "@/registry/ui/button"

const title = "Beautiful Charts & Graphs"
const description =
  "A collection of ready-to-use chart components built with Recharts. From basic charts to rich data displays, copy and paste into your apps."

export const Route = createFileRoute("/_main/charts")({
  beforeLoad: ({ params }) => {
    // @ts-expect-error
    if (!params.type) {
      throw redirect({ to: "/charts/$type", params: { type: "area" } })
    }
  },
  component: RouteComponent,
  head: () =>
    SEO({
      title,
      description,
    }),
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
