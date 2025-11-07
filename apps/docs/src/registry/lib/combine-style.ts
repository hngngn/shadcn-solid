// https://github.com/solidjs-community/solid-primitives/blob/main/packages/props/src/combineProps.ts

import type { JSX } from "solid-js"

const extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g

export function stringStyleToObject(style: string): JSX.CSSProperties {
  const object: Record<string, string> = {}
  let match: RegExpExecArray | null
  while ((match = extractCSSregex.exec(style))) {
    object[match[1]] = match[2]
  }
  return object
}

export function combineStyle(a: string, b: string): string
export function combineStyle(
  a: JSX.CSSProperties | undefined,
  b: JSX.CSSProperties | undefined,
): JSX.CSSProperties
export function combineStyle(
  a: JSX.CSSProperties | string | undefined,
  b: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties
export function combineStyle(
  a: JSX.CSSProperties | string | undefined,
  b: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties | string {
  if (typeof a === "string") {
    if (typeof b === "string") return `${a};${b}`

    a = stringStyleToObject(a)
  } else if (typeof b === "string") {
    b = stringStyleToObject(b)
  }

  return { ...a, ...b }
}
