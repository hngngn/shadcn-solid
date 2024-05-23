import { join } from "node:path";
import { type InferInput, array, enum_, object, optional, parse, record, string } from "valibot";
import type { Config } from "./config";

const baseURL = process.env.REGISTRY_URL ?? "https://shadcn-solid.com";

const frameworkSchema = array(
  object({
    name: string(),
    label: string()
  })
);

const fetchRegistry = async (paths: string[]) => {
  try {
    return await Promise.all(
      paths.map(async path => {
        const response = await fetch(`${baseURL}/registry/${path}`);

        return await response.json();
      })
    );
  } catch (error) {
    throw new Error(`Failed to fetch registry from ${baseURL}`);
  }
};

export const getRegistryFrameworks = async () => {
  try {
    const [result] = await fetchRegistry(["frameworks/index.json"]);

    return parse(frameworkSchema, result);
  } catch (error) {
    throw new Error("[framework] Failed to fetch registry");
  }
};

export const getRegistryColors = () => [
  {
    name: "slate",
    label: "Slate"
  },
  {
    name: "gray",
    label: "Gray"
  },
  {
    name: "zinc",
    label: "Zinc"
  },
  {
    name: "neutral",
    label: "Neutral"
  },
  {
    name: "stone",
    label: "Stone"
  }
];

const colorSchema = object({
  inlineColors: object({
    light: record(string(), string()),
    dark: record(string(), string())
  }),
  cssVars: object({
    light: record(string(), string()),
    dark: record(string(), string())
  }),
  inlineColorsTemplate: optional(string()),
  cssVarsTemplate: string()
});

export type ColorSchema = InferInput<typeof colorSchema>;

export const getRegistryColor = async (color: string, name: string) => {
  try {
    const [result] = await fetchRegistry([`colors/${name}/${color}.json`]);

    return parse(colorSchema, result);
  } catch (error) {
    throw new Error("[color] Failed to fetch registry");
  }
};

enum Type {
  "components:ui" = "components:ui",
  "components:component" = "components:component",
  "components:example" = "components:example"
}

const componentItemSchema = object({
  name: string(),
  dependencies: optional(array(string())),
  registryDependencies: optional(array(string())),
  files: array(string()),
  type: enum_(Type)
});

const componentSchema = array(componentItemSchema);

type ComponentSchema = InferInput<typeof componentSchema>;

export const getRegistryComponent = async () => {
  try {
    const [result] = await fetchRegistry(["index.json"]);

    return parse(componentSchema, result);
  } catch (error) {
    throw new Error("[component] Failed to fetch registry");
  }
};

export const resolveTree = async (index: ComponentSchema, names: string[]) => {
  const tree: ComponentSchema = [];

  for (const name of names) {
    const entry = index.find(entry => entry.name === name);

    if (!entry) {
      continue;
    }

    tree.push(entry);

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies);
      tree.push(...dependencies);
    }
  }

  return tree.filter(
    (component, index, self) => self.findIndex(c => c.name === component.name) === index
  );
};

const itemWithContentSchema = object({
  ...componentItemSchema.entries,
  files: array(
    object({
      name: string(),
      content: string()
    })
  )
});

type ItemWithContentSchema = InferInput<typeof itemWithContentSchema>;

const withContentSchema = array(itemWithContentSchema);

export const fetchTree = async (style: string, tree: ComponentSchema) => {
  try {
    const paths = tree.map(item => `frameworks/${style}/${item.name}.json`);
    const result = await fetchRegistry(paths);

    return parse(withContentSchema, result);
  } catch (error) {
    throw new Error("[tree] Failed to fetch registry");
  }
};

export const getItemTargetPath = async (
  config: Config,
  item: Pick<ItemWithContentSchema, "type">
) => {
  if (item.type === "components:ui" && config.alias.ui) {
    return config.resolvedPaths.ui;
  }

  const [parent, type] = item.type.split(":");
  if (!(parent! in config.resolvedPaths)) {
    return null;
  }

  return join(config.resolvedPaths[parent as keyof typeof config.resolvedPaths], type!);
};
