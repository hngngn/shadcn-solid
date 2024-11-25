import * as v from "valibot";

export enum Type {
	"components:ui" = "components:ui",
	"components:component" = "components:component",
	"components:example" = "components:example",
}

export const registrySchema = v.array(
	v.object({
		name: v.string(),
		dependencies: v.optional(v.array(v.string())),
		registryDependencies: v.optional(v.array(v.string())),
		files: v.array(v.string()),
		type: v.enum(Type),
	}),
);
