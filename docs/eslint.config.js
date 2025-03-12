import config from "../eslint.config.mjs"

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,
  {
    ignores: ["src/__registry__/**", "app.config.ts", "scripts/**"],
  },
]
