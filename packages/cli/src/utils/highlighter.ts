import { styleText } from "node:util"

const error = (text: string) => styleText("red", text)
const warn = (text: string) => styleText("yellow", text)
const info = (text: string) => styleText("cyan", text)
const success = (text: string) => styleText("green", text)

export const highlighter = {
  error,
  warn,
  info,
  success,
}
