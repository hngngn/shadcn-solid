import * as tsParser from "@typescript-eslint/parser"
import solid from "eslint-plugin-solid/configs/typescript"

import config from "../../eslint.config.mjs"

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,
  {
    files: ["src/**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/only-throw-error": "off",
    },
  },
  {
    ignores: [
      "plugins/*",
      "src/__registry__/*",
      "src/components/client-only-wrapper.tsx",
    ],
  },
]
