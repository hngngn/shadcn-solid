import type { Registry } from "./schema";

export const libs: Registry["items"] = [
  {
    name: "call-handler",
    type: "registry:lib",
    files: [
      {
        path: "lib/call-handler.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "combine-style",
    type: "registry:lib",
    files: [
      {
        path: "lib/combine-style.ts",
        type: "registry:lib",
      },
    ],
  },
];
