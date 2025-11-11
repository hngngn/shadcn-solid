import type { LinkComponent } from "@tanstack/solid-router"
import { Link } from "@tanstack/solid-router"

import { Badge } from "@/registry/ui/badge"

const Announcement = () => {
  return (
    <Badge<LinkComponent<"a">>
      as={(props) => (
        <Link to="/docs/$" params={{ _splat: "installation" }} {...props}>
          <span class="flex size-2 rounded-full bg-blue-500" title="New" />
          New Components: Kbd and Button Group{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14m-7-7l7 7l-7 7"
            />
          </svg>
        </Link>
      )}
      variant="secondary"
      class="bg-transparent"
    />
  )
}

export default Announcement
