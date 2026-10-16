import { define } from "rstack"

// The upstream package builds with tsup, where every module under `src` is an
// entry so that `@shadcn-solid/registry/internal/*` can reach any of them, and
// each entry gets its own declaration file. Rslib's bundleless mode does the
// same directly: it compiles each file on its own and keeps the directory
// structure, so `dist/index.js` still means `src/index.ts` — without the shared
// chunks tsup emitted (and had to assert Node could still read).
define.lib({
  bundle: false,
  dts: true,
  format: "esm",
  source: {
    entry: {
      index: ["./src/**/*.ts"],
    },
  },
  output: {
    cleanDistPath: true,
    distPath: {
      root: "./dist",
    },
    target: "node",
  },
})

define.fmt({
  endOfLine: "lf",
  semi: false,
})

define.lint(({ ts }) => [
  ts.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  {
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
