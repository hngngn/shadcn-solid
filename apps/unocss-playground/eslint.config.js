import * as tsparser from "@typescript-eslint/parser"
import solid from "eslint-plugin-solid/configs/typescript"

import config from "../../eslint.config.mjs"

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,
  {
    files: ["src/**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
]
