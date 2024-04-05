import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import "@unocss/reset/tailwind.css";
import { render } from "solid-js/web";
import "virtual:uno.css";
import { ToastList, ToastRegion } from "../ui/toast";
import App from "./app";
import "./app.css";

render(
  () => (
    <>
      <ColorModeScript />
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
      <ToastRegion>
        <ToastList />
      </ToastRegion>
    </>
  ),
  document.getElementById("root")!
);
