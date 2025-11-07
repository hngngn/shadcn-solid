import type { Theme } from "unocss/preset-wind4"

export const theme: Theme = {
  animation: {
    keyframes: {
      in: "{ from { opacity: var(--un-in-opacity, 1); transform: translate3d(var(--un-in-translate-x, 0), var(--un-in-translate-y, 0), 0) scale3d(var(--un-in-scale, 1), var(--un-in-scale, 1), var(--un-in-scale, 1)) rotate(var(--un-in-rotate, 0)); filter: blur(var(--un-in-blur, 0)); } }",
      out: "{ to { opacity: var(--un-out-opacity, 1); transform: translate3d(var(--un-out-translate-x, 0), var(--un-out-translate-y, 0), 0) scale3d(var(--un-out-scale, 1), var(--un-out-scale, 1), var(--un-out-scale, 1)) rotate(var(--un-out-rotate, 0)); filter: blur(var(--un-out-blur, 0)); } }",
      "accordion-down":
        "{ from { height: 0; } to { height: var(--kb-accordion-content-height, auto); } }",
      "accordion-up":
        "{ from { height: var(--kb-accordion-content-height, auto); } to { height: 0; } }",
      "collapsible-down":
        "{ from { height: 0; } to { height: var(--kb-collapsible-content-height, auto); } }",
      "collapsible-up":
        "{ from { height: var(--kb-collapsible-content-height, auto); } to { height: 0; } }",
      "caret-blink":
        "{ 0%, 70%, 100% { opacity: 1; } 20%, 50% { opacity: 0; } }",
    },
    durations: {
      in: "var(--un-animation-duration, var(--un-duration, 150ms))",
      out: "var(--un-animation-duration, var(--un-duration, 150ms))",
      "accordion-down":
        "var(--un-animation-duration, var(--un-duration, 200ms))",
      "accordion-up": "var(--un-animation-duration, var(--un-duration, 200ms))",
      "collapsible-down":
        "var(--un-animation-duration, var(--un-duration, 200ms))",
      "collapsible-up":
        "var(--un-animation-duration, var(--un-duration, 200ms))",
      "caret-blink": "1.25s",
    },
    timingFns: {
      in: "var(--un-ease, ease)",
      out: "var(--un-ease, ease)",
      "accordion-down": "var(--un-ease, ease-out)",
      "accordion-up": "var(--un-ease, ease-out)",
      "collapsible-down": "var(--un-ease, ease-out)",
      "collapsible-up": "var(--un-ease, ease-out)",
      "caret-blink": "ease-out",
    },
    counts: {
      in: "var(--un-animation-iteration-count, 1)",
      out: "var(--un-animation-iteration-count, 1)",
      "accordion-down": "var(--un-animation-iteration-count, 1)",
      "accordion-up": "var(--un-animation-iteration-count, 1)",
      "collapsible-down": "var(--un-animation-iteration-count, 1)",
      "collapsible-up": "var(--un-animation-iteration-count, 1)",
      "caret-blink": "infinite",
    },
    properties: {
      in: {
        "animation-delay": "var(--un-animation-delay, 0s)",
        "animation-direction": "var(--un-animation-direction, normal)",
        "animation-fill-mode": "var(--un-animation-fill-mode, none)",
      },
      out: {
        "animation-delay": "var(--un-animation-delay, 0s)",
        "animation-direction": "var(--un-animation-direction, normal)",
        "animation-fill-mode": "var(--un-animation-fill-mode, none)",
      },
      "accordion-down": {
        "animation-delay": "var(--un-animation-delay, 0s)",
        "animation-direction": "var(--un-animation-direction, normal)",
        "animation-fill-mode": "var(--un-animation-fill-mode, none)",
      },
      "accordion-up": {
        "animation-delay": "var(--un-animation-delay, 0s)",
        "animation-direction": "var(--un-animation-direction, normal)",
        "animation-fill-mode": "var(--un-animation-fill-mode, none)",
      },
      "collapsible-down": {
        "animation-delay": "var(--un-animation-delay, 0s)",
        "animation-direction": "var(--un-animation-direction, normal)",
        "animation-fill-mode": "var(--un-animation-fill-mode, none)",
      },
      "collapsible-up": {
        "animation-delay": "var(--un-animation-delay, 0s)",
        "animation-direction": "var(--un-animation-direction, normal)",
        "animation-fill-mode": "var(--un-animation-fill-mode, none)",
      },
    },
  },
}
