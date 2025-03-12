import { createEffect } from "solid-js"
import { useColorMode } from "@kobalte/core"

import { Button } from "@/registry/tailwindcss/ui/button"

const ModeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  createEffect(() => {
    const windows = new Set([...Array.from(window.frames), window])

    for (const window of windows) {
      window.document.documentElement.style.colorScheme = colorMode()
      window.document.documentElement.dataset.kbTheme = colorMode()
    }
  })

  return (
    <Button onClick={toggleColorMode} size="icon" variant="ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hidden size-4 [html[data-kb-theme=dark]_&]:block"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M17.891 12a5.94 5.94 0 0 1-3.68 5.499a5.97 5.97 0 0 1-6.496-1.295A5.948 5.948 0 0 1 11.943 6.05a5.96 5.96 0 0 1 4.21 1.743A5.94 5.94 0 0 1 17.89 12M3.203 13.048H2.05A1.05 1.05 0 0 1 1 12a1.047 1.047 0 0 1 1.05-1.048h1.153A1.05 1.05 0 0 1 4.253 12a1.047 1.047 0 0 1-1.05 1.048m18.747 0h-1.143A1.05 1.05 0 0 1 19.758 12a1.047 1.047 0 0 1 1.05-1.048h1.143A1.05 1.05 0 0 1 23 12a1.047 1.047 0 0 1-1.05 1.048m-9.965-8.8a1.05 1.05 0 0 1-1.05-1.048V2.048A1.047 1.047 0 0 1 11.986 1a1.05 1.05 0 0 1 1.049 1.048V3.2a1.047 1.047 0 0 1-1.05 1.048m0 18.752a1.05 1.05 0 0 1-1.05-1.047V20.8a1.047 1.047 0 0 1 1.05-1.048a1.05 1.05 0 0 1 1.049 1.048v1.152A1.047 1.047 0 0 1 11.984 23M5.753 6.825a1.05 1.05 0 0 1-.745-.314l-.819-.807a1.051 1.051 0 0 1 .745-1.796c.28 0 .548.111.745.308l.819.817a1.047 1.047 0 0 1 0 1.478a1.05 1.05 0 0 1-.745.314m13.271 13.221a1.05 1.05 0 0 1-.735-.304l-.818-.817a1.047 1.047 0 0 1 1.14-1.739q.196.096.34.262l.818.817a1.047 1.047 0 0 1 0 1.477a1.05 1.05 0 0 1-.745.304m-.808-13.221a1.05 1.05 0 0 1-1.034-1.254c.04-.204.142-.391.29-.538l.818-.817a1.05 1.05 0 0 1 1.48 1.488l-.82.807a1.05 1.05 0 0 1-.734.314M4.934 20.046a1.05 1.05 0 0 1-.745-.304a1.046 1.046 0 0 1 0-1.477l.819-.817a1.05 1.05 0 0 1 1.49 0a1.047 1.047 0 0 1 0 1.477l-.819.817a1.05 1.05 0 0 1-.745.304"
        />
        <title>Light mode</title>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hidden size-4 [html[data-kb-theme=light]_&]:block"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21.88 15.147a10.23 10.23 0 0 1-19.63-5.64a10.28 10.28 0 0 1 6.63-7.37a1.77 1.77 0 0 1 1-.07a1.8 1.8 0 0 1 .89.45a1.81 1.81 0 0 1 .48 1.84a7 7 0 0 0-.08 4.21a6.27 6.27 0 0 0 4.3 4.31a6.9 6.9 0 0 0 4.2-.08a1.83 1.83 0 0 1 1 0a1.8 1.8 0 0 1 1.3 1.39a1.8 1.8 0 0 1-.09.96"
        />
        <title>Dark mode</title>
      </svg>
    </Button>
  )
}

export default ModeToggle
