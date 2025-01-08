// https://github.com/kobaltedev/kobalte/blob/main/packages/utils/src/assertion.ts
// https://github.com/kobaltedev/kobalte/blob/main/packages/utils/src/events.ts

import type { JSX } from "solid-js"

// Function assertions
// biome-ignore lint/complexity/noBannedTypes:
export function isFunction<T extends Function = Function>(
  value: unknown
): value is T {
  return typeof value === "function"
}

/** Call a JSX.EventHandlerUnion with the event. */
export const callHandler = <T, E extends Event>(
  event: E & { currentTarget: T; target: Element },
  handler: JSX.EventHandlerUnion<T, E> | undefined
) => {
  if (handler) {
    if (isFunction(handler)) {
      handler(event)
    } else {
      handler[0](handler[1], event)
    }
  }

  return event?.defaultPrevented
}
