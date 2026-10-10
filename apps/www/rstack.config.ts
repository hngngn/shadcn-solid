import { define } from "rstack"
import solid from "eslint-plugin-solid/configs/typescript"

define.fmt({
  endOfLine: "lf",
  semi: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(solid-js/(.*)$)|^(solid-js$)",
    "^(@solidjs/(.*)$)|^(@solidjs$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderCaseSensitive: true,
})

define.lint(({ ts }) => [
  ts.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  {
    files: ["apps/www/src/**/*.{ts,tsx}"],
    ...solid,
  },
])
