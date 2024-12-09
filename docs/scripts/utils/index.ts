import { blocks } from "./blocks";
import { examples } from "./examples";
import { hooks } from "./hooks";
import { libs } from "./libs";
import type { Registry } from "./schema";
import { ui } from "./ui";

export const registry: Registry = [
	...ui,
	...examples,
	...libs,
	...hooks,
	...blocks,
];
