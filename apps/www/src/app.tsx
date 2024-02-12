// @refresh reload
import "@fontsource-variable/inter"
import {
  ColorModeProvider,
  ColorModeScript,
  localStorageManager,
} from "@kobalte/core"
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import "./app.css"
import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { Metadata } from "./components/metadata"
import "./mdx.css"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Metadata />
          <Suspense>
            <ColorModeScript />
            <ColorModeProvider storageManager={localStorageManager}>
              <Header />
              {props.children}
              <Footer />
            </ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
