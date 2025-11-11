import { Outlet, createFileRoute } from "@tanstack/solid-router"
import { createServerFn } from "@tanstack/solid-start"

import Footer from "@/components/footer"
import Header from "@/components/header"

const getStarCount = createServerFn({ method: "GET" }).handler(async () => {
  const data = await fetch("https://api.github.com/repos/hngngn/shadcn-solid")
  const json = await data.json()

  const formattedCount: string =
    json.stargazers_count >= 1000
      ? json.stargazers_count % 1000 === 0
        ? `${Math.floor(json.stargazers_count / 1000)}k`
        : `${(json.stargazers_count / 1000).toFixed(1)}k`
      : json.stargazers_count.toLocaleString()

  return new Response(formattedCount.replace(".0k", "k"), {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  }).json()
})

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
  loader: () => getStarCount(),
})

function RouteComponent() {
  const loader = Route.useLoaderData()

  return (
    <div class="text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)]">
      <div class="bg-background relative flex min-h-svh flex-col">
        <Header starCount={loader()} />
        <main class="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
