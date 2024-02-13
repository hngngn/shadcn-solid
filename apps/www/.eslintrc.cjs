/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["solid", "@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:solid/typescript"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "no-undef": "off",
    "no-redeclare": "off",
    "no-unused-vars": "off",
  },
}
