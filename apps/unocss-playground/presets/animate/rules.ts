/* eslint-disable */

import { defineProperty, h } from "@unocss/preset-wind4/utils"
import type { ControlSymbols, Rule } from "unocss"
import type { Theme } from "unocss/preset-wind4"

const defineOnce = (prop: string, opts: any) => {
  let defined = false
  return () => {
    if (defined) return
    defined = true
    return defineProperty(prop, opts)
  }
}

const createSimpleRule = (
  prop: string,
  def: any,
  transform: (val: string) => string | undefined,
  opts: {
    initialValue?: number | string
    syntax?: string
    inherits?: boolean
  } = {
    initialValue: 1,
    syntax: "*" as const,
    inherits: false,
  },
) =>
  function* ([, val]: RegExpMatchArray) {
    yield defineProperty(prop, opts)
    if (!val) {
      yield { [prop]: def }
      return
    }
    const vBracket = h.bracket(val)
    if (vBracket) {
      yield { [prop]: vBracket }
      return
    }
    const result = transform(val)
    if (result) yield { [prop]: result }
  }

const createBlurRule = (prop: string, def: string) =>
  function* ([, val]: RegExpMatchArray) {
    const define = defineOnce(prop, {
      syntax: "*",
      inherits: false,
      initialValue: 0,
    })

    if (!val) {
      yield define()
      yield { [prop]: def }
      return
    }

    const vBracket = h.bracket(val)
    if (vBracket) {
      yield define()
      yield { [prop]: vBracket }
      return
    }

    const value = h.cssvar.rem.px(val)
    if (value) {
      yield define()
      yield { [prop]: value }
    }
  }

const createOpacityRule = (prop: string, def: number) =>
  createSimpleRule(prop, def, (val) => h.cssvar.fraction.percent.px.rem(val), {
    initialValue: 1,
  })

const createScaleRule = (prop: string, def: number) =>
  createSimpleRule(prop, def, (val) => h.cssvar.fraction.percent.px.rem(val), {
    initialValue: 1,
  })

const createRotateRule = (prop: string, def: string) =>
  function* ([, val]: RegExpMatchArray) {
    yield defineProperty(prop, {
      syntax: "*",
      inherits: false,
      initialValue: 0,
    })
    if (!val) {
      yield { [prop]: def }
      return
    }
    const vBracket = h.bracket(val)
    if (vBracket) {
      yield { [prop]: vBracket }
      return
    }
    const vFraction = h.fraction(val)
    if (vFraction) {
      yield { [prop]: `calc(${val} * 360deg)` }
      return
    }
    yield { [prop]: h.cssvar.degree(val) }
  }

const createAnimationRule = (
  prop: string,
  cssProp: string,
  resolver: (val: string, theme: Theme) => string | undefined,
  opts: any,
) =>
  function* ([, val]: RegExpMatchArray, { theme }: { theme: Theme }) {
    const value = resolver(val, theme)
    if (!value) return
    yield defineProperty(prop, opts)
    yield { [prop]: value, [cssProp]: value }
  }

export const animationDurationRules: Rule<Theme>[] = [
  [
    /^animation-duration-(.+)$/,
    createAnimationRule(
      "--un-animation-duration",
      "animation-duration",
      (val, theme) =>
        val === "initial"
          ? val
          : (theme.duration?.[val] ??
            theme.duration?.DEFAULT ??
            h.bracket.cssvar.time(val)),
      { syntax: "*", inherits: false },
    ),
    {
      autocomplete: ["animation-duration-<num>", "animation-duration-initial"],
    },
  ],
]

export const animationDelayRules: Rule<Theme>[] = [
  [
    /^delay-(.+)$/,
    createAnimationRule(
      "--un-animation-delay",
      "animation-delay",
      (val, theme) =>
        val === "initial"
          ? val
          : (theme.duration?.[val] ??
            theme.duration?.DEFAULT ??
            h.bracket.cssvar.time(val)),
      { syntax: "*", inherits: false, initialValue: "0s" },
    ),
    { autocomplete: ["delay-<num>", "delay-initial"] },
  ],
]

export const animationRepeatRules: Rule<Theme>[] = [
  [
    /^repeat-(.+)$/,
    createAnimationRule(
      "--un-animation-iteration-count",
      "animation-iteration-count",
      (val) =>
        ["initial", "infinite"].includes(val)
          ? val
          : (h.bracket.cssvar.number(val) ?? val.replace(/-/g, ",")),
      { syntax: "*", inherits: false, initialValue: 1 },
    ),
    { autocomplete: ["repeat-<num>", "repeat-(initial|infinite)"] },
  ],
]

export const animationDirectionRules: Rule<Theme>[] = [
  [
    /^direction-(.+)$/,
    createAnimationRule(
      "--un-animation-direction",
      "animation-direction",
      (val) =>
        [
          "normal",
          "reverse",
          "alternate",
          "alternate-reverse",
          "initial",
        ].includes(val)
          ? val
          : undefined,
      { syntax: "*", inherits: false, initialValue: "normal" },
    ),
    {
      autocomplete:
        "direction-(normal|reverse|alternate|alternate-reverse|initial)",
    },
  ],
]

export const animationFillModeRules: Rule<Theme>[] = [
  [
    /^fill-mode-(.+)$/,
    createAnimationRule(
      "--un-animation-fill-mode",
      "animation-fill-mode",
      (val) =>
        ["none", "forwards", "backwards", "both", "initial"].includes(val)
          ? val
          : undefined,
      { syntax: "*", inherits: false, initialValue: "none" },
    ),
    { autocomplete: "fill-mode-(none|forwards|backwards|both|initial)" },
  ],
]

export const blurRules: Rule<Theme>[] = [
  [
    /^blur-in(?:-(.+))?$/,
    createBlurRule("--un-in-blur", "20px"),
    { autocomplete: "blur-(in|out)-<percent>" },
  ],
  [/^blur-out(?:-(.+))?$/, createBlurRule("--un-out-blur", "20px")],
]

export const fadeRules: Rule<Theme>[] = [
  [
    /^fade-in(?:-(.+))?$/,
    createOpacityRule("--un-in-opacity", 0),
    { autocomplete: "fade-(in|out)-<percent>" },
  ],
  [/^fade-out(?:-(.+))?$/, createOpacityRule("--un-out-opacity", 0)],
]

export const zoomRules: Rule<Theme>[] = [
  [
    /^zoom-in(?:-(.+))?$/,
    createScaleRule("--un-in-scale", 0),
    { autocomplete: "zoom-(in|out)-<percent>" },
  ],
  [/^zoom-out(?:-(.+))?$/, createScaleRule("--un-out-scale", 0)],
]

export const spinRules: Rule<Theme>[] = [
  [
    /^spin-in(?:-(.+))?$/,
    createRotateRule("--un-in-rotate", "30deg"),
    { autocomplete: "spin-(in|out)-<percent>" },
  ],
  [/^spin-out(?:-(.+))?$/, createRotateRule("--un-out-rotate", "30deg")],
]

const createSlideRule = (prefix: "enter" | "exit") => {
  const propBase =
    prefix === "enter" ? "--un-in-translate" : "--un-out-translate"
  return function* (
    [, dir, val]: RegExpMatchArray,
    { theme, symbols }: { theme: Theme; symbols: ControlSymbols },
  ) {
    const axis = ["top", "bottom"].includes(dir) ? "y" : "x"
    const prop = `${propBase}-${axis}`
    const define = defineOnce(prop, {
      syntax: "*",
      inherits: false,
      initialValue: 0,
    })

    if (["start", "end"].includes(dir)) {
      if (!val) {
        yield define()
        yield {
          [symbols.selector]: (s: string) => `${s}:dir(ltr)`,
          [prop]: dir === "start" ? "-100%" : "100%",
        }
        yield {
          [symbols.selector]: (s: string) => `${s}:dir(rtl)`,
          [prop]: dir === "start" ? "100%" : "-100%",
        }
        return
      }

      const vCSSVar = h.cssvar(val)
      if (vCSSVar) return

      const vBracket = h.bracket(val)
      if (vBracket && (h.number(vBracket) || h.fraction(vBracket))) return

      if (vBracket) {
        yield define()
        const resolved = h.bracket.percent.px.rem(val)
        const ltrVal = `calc(${resolved}${dir === "start" ? " * -1" : ""})`
        const rtlVal = `calc(${resolved}${dir === "start" ? "" : " * -1"})`
        yield {
          [symbols.selector]: (s: string) =>
            `${s}:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)`,
          [prop]: ltrVal,
        }
        yield {
          [symbols.selector]: (s: string) =>
            `${s}:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)`,
          [prop]: rtlVal,
        }
        return
      }

      const vNumber = h.number.numberWithUnit(val)
      if (vNumber) {
        yield define()
        const spacing = theme.spacing?.DEFAULT
        const ltrVal = `calc(${vNumber} * ${spacing}${
          dir === "start" ? " * -1" : ""
        })`
        const rtlVal = `calc(${vNumber} * ${spacing}${
          dir === "start" ? "" : " * -1"
        })`
        yield {
          [symbols.selector]: (s: string) =>
            `${s}:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)`,
          [prop]: ltrVal,
        }
        yield {
          [symbols.selector]: (s: string) =>
            `${s}:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)`,
          [prop]: rtlVal,
        }
        return
      }

      const vFraction = h.fraction(val)
      if (vFraction) {
        yield define()
        const ltrVal = `calc(${vFraction}${
          dir === "start" ? " * -100%" : " * 100%"
        })`
        const rtlVal = `calc(${vFraction}${
          dir === "start" ? " * 100%" : " * -100%"
        })`
        yield {
          [symbols.selector]: (s: string) =>
            `${s}:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)`,
          [prop]: ltrVal,
        }
        yield {
          [symbols.selector]: (s: string) =>
            `${s}:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)`,
          [prop]: rtlVal,
        }
        return
      }
      return
    }

    if (!val) {
      yield define()
      yield { [prop]: ["top", "left"].includes(dir) ? "-100%" : "100%" }
      return
    }

    const vCSSVar = h.cssvar(val)
    if (vCSSVar) return

    const vBracket = h.bracket(val)
    if (vBracket && (h.number(vBracket) || h.fraction(vBracket))) return

    if (vBracket) {
      yield define()
      yield {
        [prop]: `calc(${h.bracket.percent.px.rem(val)}${
          ["top", "left"].includes(dir) ? " * -1" : ""
        })`,
      }
      return
    }

    const vNumber = h.number.numberWithUnit(val)
    if (vNumber) {
      yield define()
      yield {
        [prop]: `calc(${vNumber} * ${theme.spacing?.DEFAULT}${
          ["top", "left"].includes(dir) ? " * -1" : ""
        })`,
      }
      return
    }

    const vFraction = h.fraction(val)
    if (vFraction) {
      yield define()
      yield {
        [prop]: `calc(${vFraction}${
          ["top", "left"].includes(dir) ? " * -100%" : " * 100%"
        })`,
      }
      return
    }
  }
}

export const slideRules: Rule<Theme>[] = [
  [
    /^slide-in-from-(top|bottom|left|right|start|end)(?:-(.+))?$/,
    createSlideRule("enter"),
    {
      autocomplete: [
        "slide-(in|out)-from-(top|bottom|left|right|start|end)-<percent>",
        "slide-(in|out)-from-(top|bottom|left|right|start|end)-full",
      ],
    },
  ],
  [
    /^slide-out-from-(top|bottom|left|right|start|end)(?:-(.+))?$/,
    createSlideRule("exit"),
  ],
]

export const rules: Rule<Theme>[] = [
  ...animationDurationRules,
  ...animationDelayRules,
  ...animationRepeatRules,
  ...animationDirectionRules,
  ...animationFillModeRules,
  ...blurRules,
  ...fadeRules,
  ...zoomRules,
  ...spinRules,
  ...slideRules,
]
