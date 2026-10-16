import solid from "eslint-plugin-solid/configs/typescript"
import { define } from "rstack"

/**
 * Formats the repository. `packages/**` is left to each package's own
 * configuration, which is what `rs` loads when it runs there.
 */
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
  ignorePatterns: ["packages/**"],
})

/**
 * Lints the repository, apart from `packages/**`: those packages are ported
 * from the shadcn `ui` repository and own their configuration, which relaxes
 * the rules their looser typing style needs. Ignoring them here is what keeps a
 * `--fix` run from the repository root from rewriting the port in place. Their
 * own `check` scripts still check them, and `turbo run check` runs those.
 */
define.lint(({ ts }) => [
  { ignores: ["packages/**"] },
  ts.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  {
    files: ["apps/www/src/**/*.{ts,tsx}"],
    ...solid,
  },
])
