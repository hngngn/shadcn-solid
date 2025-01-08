import type { RouteSectionProps } from "@solidjs/router"

import { Announcement } from "@/components/announcement"
import ExampleNav from "@/components/example-nav"
import { Button } from "@/registry/tailwindcss/ui/button"

const ExamplesLayout = (props: RouteSectionProps) => {
  return (
    <>
      <section class="border-grid border-b">
        <div class="container-wrapper">
          <div class="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
            <Announcement />
            <h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
              Build your component library
            </h1>
            <p class="text-foreground max-w-2xl text-balance text-lg font-light">
              Beautifully designed components that you can copy and paste into
              your apps. Open source.
            </p>
            <div class="flex w-full items-center justify-start gap-2 py-2">
              <Button as="a" href="/docs/introduction" size="sm">
                Get Started
              </Button>
              <Button as="a" size="sm" variant="ghost" href="/blocks">
                Browse Blocks
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div class="border-grid border-b">
        <div class="container-wrapper">
          <div class="container py-4">
            <ExampleNav />
          </div>
        </div>
      </div>
      <div class="container-wrapper">
        <div class="container py-6">
          <section class="bg-background overflow-hidden rounded-[0.5rem] border shadow">
            {props.children}
          </section>
        </div>
      </div>
    </>
  )
}

export default ExamplesLayout
