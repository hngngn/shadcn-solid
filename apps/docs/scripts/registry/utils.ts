import type { Registry } from "./schema"

export const utils: Registry = [
  {
    name: "cva",
    type: "registry:utils",
    dependencies: ["cva@beta", "tailwind-merge"],
    files: [
      {
        path: "utils/cva.ts",
        type: "registry:utils",
      },
    ],
  },
  {
    name: "call-handler",
    type: "registry:utils",
    files: [
      {
        path: "utils/call-handler.ts",
        type: "registry:utils",
      },
    ],
  },
]
