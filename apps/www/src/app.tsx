import { Suspense } from "solid-js"
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core/color-mode"

import "./globals.css"

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <ColorModeScript />
          <ColorModeProvider>
            <MetaProvider>
              <Suspense>{props.children}</Suspense>
            </MetaProvider>
          </ColorModeProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
