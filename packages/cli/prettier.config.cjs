/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^[./]"],
  importOrderCaseSensitive: true,
}
