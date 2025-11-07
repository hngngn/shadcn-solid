import type { LinkProps } from "@tanstack/solid-router"
import { Link } from "@tanstack/solid-router"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { Button } from "@/registry/ui/button"

const MainNotFound = () => {
  return (
    <div class="text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)]">
      <div class="bg-background relative flex min-h-svh flex-col">
        <div class="border-grid flex flex-1 flex-col">
          <Header />
          <main class="flex flex-1 flex-col">
            <div class="border-grid">
              <div class="container-wrapper">
                <div class="flex h-[calc(100dvh-57px-61px)] items-center justify-center">
                  <div class="flex flex-col items-center justify-center gap-y-4">
                    <span class="text-4xl font-bold">Page Not Found</span>
                    <Button
                      variant="link"
                      as={(props: LinkProps) => (
                        <Link class="gap-x-2" to="/" {...props}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-4"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-width="1.5"
                            >
                              <path stroke-miterlimit="10" d="M4 12h16" />
                              <path
                                stroke-linejoin="round"
                                d="M11.033 4.34L4.46 10.911a1.53 1.53 0 0 0 0 2.176l6.573 6.573"
                              />
                            </g>
                          </svg>
                          Back to home
                        </Link>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainNotFound
