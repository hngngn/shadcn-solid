import type { RouteSectionProps } from "@solidjs/router"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const AppLayout = (props: RouteSectionProps) => {
  return (
    <div class="border-grid flex flex-1 flex-col">
      <Header />
      <main class="flex flex-1 flex-col">{props.children}</main>
      <Footer />
    </div>
  )
}

export default AppLayout
