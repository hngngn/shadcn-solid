import type { Registry } from "./schema"

export const utils: Registry["items"] = [
  {
    name: "cva",
    type: "registry:utils",
    dependencies: ["cva@beta", "tailwind-merge"],
    files: [
      {
        path: "src/utils/cva.ts",
        type: "registry:utils",
      },
    ],
  },
  {
    name: "call-handler",
    type: "registry:utils",
    files: [
      {
        path: "src/utils/call-handler.ts",
        type: "registry:utils",
      },
    ],
  },
]
