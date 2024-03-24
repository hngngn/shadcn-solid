import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from "@kobalte/core";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { getCookie } from "vinxi/http";
import "./app.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Metadata } from "./components/metadata";
import "./mdx.css";
import { ToastList, ToastRegion } from "./registry/default/ui/toast";

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
              <div class="relative flex min-h-screen flex-col">
                <Header />
                <div class="flex-1">{props.children}</div>
                <Footer />
              </div>
            </ColorModeProvider>
          </Suspense>
          <ToastRegion>
            <ToastList />
          </ToastRegion>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
};

export default App;
