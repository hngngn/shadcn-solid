import type { Registry } from "./schema";
import { registryItemSchema } from "./schema";
import * as v from "valibot";
import { uis } from "./uis";
import { examples } from "./examples";
import { hooks } from "./hooks";
import { libs } from "./libs";
import { charts } from "./charts";
import { blocks } from "./blocks";

export const registry: Registry = {
  name: "shadcn-solid",
  homepage: "https://shadcn-solid.com",
  items: v.parse(v.array(registryItemSchema), [
    ...uis,
    ...examples,
    ...hooks,
    ...libs,
    ...charts,
    ...blocks,
  ]),
};
