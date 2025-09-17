import type { Registry } from "./schema"

export const hooks: Registry["items"] = [
  {
    name: "use-mobile",
    type: "registry:hook",
    dependencies: ["@solid-primitives/media"],
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook",
      },
    ],
  },
]
