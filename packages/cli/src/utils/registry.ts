import { array, object, optional, parse, record, string } from "valibot";

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
    console.log(error);
    throw new Error(`Failed to fetch registry from ${baseURL}`);
  }
};

export const getRegistryFrameworks = async () => {
  try {
    const [result] = await fetchRegistry(["frameworks/index.json"]);

    return parse(frameworkSchema, result);
  } catch (error) {
    console.log(error);
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

export const getRegistryColor = async (color: string, name: string) => {
  try {
    const [result] = await fetchRegistry([`colors/${name}/${color}.json`]);

    return parse(colorSchema, result);
  } catch (error) {
    throw new Error("[color] Failed to fetch registry.");
  }
};
