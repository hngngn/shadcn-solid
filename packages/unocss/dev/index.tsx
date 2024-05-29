import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import "@unocss/reset/tailwind-compat.css";
import { render } from "solid-js/web";
import "virtual:uno.css";
import { Toaster } from "../ui/sonner";
import { ToastList, ToastRegion } from "../ui/toast";
import App from "./app";
import "./app.css";

render(
  () => (
    <>
      <ColorModeScript />
      <ColorModeProvider>
        <App />
        <ToastRegion>
          <ToastList />
        </ToastRegion>
        <Toaster />
      </ColorModeProvider>
    </>
  ),
  document.getElementById("root")!
);
