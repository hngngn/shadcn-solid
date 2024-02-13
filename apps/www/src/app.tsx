// @refresh reload
import "@fontsource-variable/inter";
import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from "@kobalte/core";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { getCookie } from "vinxi/http";
import "./app.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Metadata } from "./components/metadata";
import "./mdx.css";

const getServerCookies = () => {
  "use server";

  const colorMode = getCookie("kb-color-mode");
  return colorMode ? `kb-color-mode=${colorMode}` : "";
};

const App = () => {
  const storageManager = cookieStorageManagerSSR(isServer ? getServerCookies() : document.cookie);

  return (
    <Router
      root={props => (
        <MetaProvider>
          <Metadata />
          <Suspense>
            <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}>
              <Header />
              <div class="flex min-h-[calc(100dvh-57px-96px)]">
                <div class="flex-1">{props.children}</div>
              </div>
              <Footer />
            </ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
};

export default App;
