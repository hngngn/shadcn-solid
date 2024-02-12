import { Button } from "@/registry/default/ui/button"
import { As } from "@kobalte/core"
import { Title } from "@solidjs/meta"
import { A } from "@solidjs/router"

const NotFound = () => {
  return (
    <>
      <Title>404 Not Found</Title>
      <div class="flex min-h-[calc(100vh-57px-97px)] items-center justify-center">
        <div class="grid gap-4">
          <div class="flex flex-col items-center justify-center">
            <p class="text-6xl font-bold">404</p>
            <p class="text-xl font-medium">Page not found</p>
          </div>
          <p class="opacity-60">This page doesn't exist or was removed!</p>
          <Button asChild>
            <As component={A} href="/">
              Back to homepage
            </As>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotFound
