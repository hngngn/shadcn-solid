import { define } from "rstack"

// The upstream package builds with tsup, listing each public entry point
// separately. The four subpaths `package.json` exports are what consumers
// import, and bundleless output puts each of them at the same path its source
// has, so the export map keeps working unchanged.
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
