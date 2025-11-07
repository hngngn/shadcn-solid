/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(solid-js/(.*)$)|^(solid-js$)",
    "^(@tanstack/(.*)$)|^(@tanstack$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderCaseSensitive: true,
};
