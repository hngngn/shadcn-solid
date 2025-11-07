import * as v from "valibot";

export const registryItemTypeSchema = v.picklist([
  "registry:lib",
  "registry:block",
  "registry:component",
  "registry:ui",
  "registry:hook",
  "registry:page",

  // Internal use only
  "registry:example",
]);

export const registryItemFileSchema = v.variant("type", [
  v.object({
    path: v.string(),
    content: v.optional(v.string()),
    type: v.picklist(["registry:page"]),
    target: v.string(),
  }),
  v.object({
    path: v.string(),
    content: v.optional(v.string()),
    type: v.pipe(registryItemTypeSchema, v.excludes("registry:page")),
    target: v.optional(v.string()),
  }),
]);

export const registryItemTailwindSchema = v.object({
  config: v.optional(
    v.object({
      content: v.optional(v.array(v.string())),
      theme: v.optional(v.record(v.string(), v.any())),
      plugins: v.optional(v.array(v.string())),
    }),
  ),
});

export const registryItemCssVarsSchema = v.object({
  theme: v.optional(v.record(v.string(), v.string())),
  light: v.optional(v.record(v.string(), v.string())),
  dark: v.optional(v.record(v.string(), v.string())),
});

export const registryItemCssSchema = v.record(
  v.string(),
  v.lazy(() =>
    v.union([
      v.string(),
      v.record(
        v.string(),
        v.union([v.string(), v.record(v.string(), v.string())]),
      ),
    ]),
  ),
);

export const registryItemEnvVarsSchema = v.record(v.string(), v.string());

export const registryItemSchema = v.object({
  $schema: v.optional(v.string()),
  extends: v.optional(v.string()),
  name: v.string(),
  type: registryItemTypeSchema,
  title: v.optional(v.string()),
  author: v.optional(v.pipe(v.string(), v.minLength(2))),
  description: v.optional(v.string()),
  dependencies: v.optional(v.array(v.string())),
  devDependencies: v.optional(v.array(v.string())),
  registryDependencies: v.optional(v.array(v.string())),
  files: v.optional(v.array(registryItemFileSchema)),
  tailwind: v.optional(registryItemTailwindSchema),
  cssVars: v.optional(registryItemCssVarsSchema),
  css: v.optional(registryItemCssSchema),
  envVars: v.optional(registryItemEnvVarsSchema),
  meta: v.optional(v.record(v.string(), v.any())),
  docs: v.optional(v.string()),
  categories: v.optional(v.array(v.string())),
});

export const registrySchema = v.object({
  name: v.string(),
  homepage: v.string(),
  items: v.array(registryItemSchema),
});

export type Registry = v.InferOutput<typeof registrySchema>;
