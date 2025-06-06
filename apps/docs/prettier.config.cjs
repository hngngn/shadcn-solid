/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^(solid-js/(.*)$)|^(solid-js$)",
    "^(@tanstack/(.*)$)|^(@tanstack$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@repo/(.*)$",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderCaseSensitive: true,
}
