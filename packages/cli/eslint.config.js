import config from "../../eslint.config.mjs"

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,
  {
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-misused-spread": "off",
    },
  },
]
