import { Outlet, createFileRoute } from "@tanstack/solid-router"

import Footer from "@/components/footer"
import Header from "@/components/header"

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div class="text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)]">
      <div class="bg-background relative flex min-h-svh flex-col">
        <Header />
        <main class="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
