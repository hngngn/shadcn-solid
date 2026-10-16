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
})

define.lint(({ ts }) => [
  ts.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  {
    // This package is ported from the shadcn `ui` repository, where these
    // files are formatted but never linted, so they are written to a looser
    // typing style than type-aware linting allows: non-null assertions on
    // babel node positions, `any` where the babel AST is untyped, defensive
    // conditions, and `type` aliases where an interface would do. They are
    // kept as close to upstream as possible — so the codemod output stays
    // identical and a future re-sync stays a copy — and that means relaxing
    // those rules here rather than rewriting the code.
    //
    // Two of them are relaxed for a stronger reason: their autofixes are not
    // safe on this code. `prefer-regexp-exec` turns `String#match` into
    // `RegExp#exec`, which returns only the first match when the expression is
    // global, and the `consistent-type-definitions` fix turns `PresetConfig`
    // into an interface that `Object.fromEntries` no longer casts to, which
    // does not compile. The package's `check` script accordingly runs
    // `rs check` without `--fix`, so nothing rewrites the port in place.
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  },
])
