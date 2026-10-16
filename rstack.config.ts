import solid from "eslint-plugin-solid/configs/typescript"
import { define } from "rstack"

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
  // `packages/` is formatted by the configuration of each package, which is
  // what `rs` loads when it runs there.
  ignorePatterns: ["packages/**"],
})

define.lint(({ ts }) => [
  // The packages under `packages/` are ported from the shadcn `ui` repository
  // and own their lint configuration, which relaxes the rules their looser
  // typing style needs (see `packages/registry/rstack.config.ts`). This
  // configuration does not reach into them, so a `--fix` run from the
  // repository root cannot rewrite the port in place. Their own `check`
  // scripts still check them, and `turbo run check` runs those.
  { ignores: ["packages/**"] },
  ts.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  {
    files: ["apps/www/src/**/*.{ts,tsx}"],
    ...solid,
  },
])
