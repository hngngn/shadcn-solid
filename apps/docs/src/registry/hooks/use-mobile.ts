// https://github.com/solidjs-community/solid-primitives/blob/main/packages/media/src/index.ts

import { createSignal, onCleanup } from "solid-js"
import { isServer } from "solid-js/web"

export const useIsMobile = () => {
  if (isServer) {
    return () => false
  }

  const mql = window.matchMedia("(max-width: 767px)")
  const [state, setState] = createSignal(mql.matches)
  const update = () => setState(mql.matches)
  mql.addEventListener("change", update)
  onCleanup(() => {
    mql.removeEventListener("change", update)
  })
  return state
}
