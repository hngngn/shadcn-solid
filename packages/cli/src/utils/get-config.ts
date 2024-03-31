import { resolveImport } from "@/src/utils/resolve-import";
import { cosmiconfig } from "cosmiconfig";
import path from "path";
import { loadConfig } from "tsconfig-paths";
import { z } from "zod";

// export const DEFAULT_STYLE = "default"
export const DEFAULT_COMPONENTS = "@/components";
export const DEFAULT_UTILS = "@/libs/cn";
export const DEFAULT_CSS = "src/app.css";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.cjs";
export const DEFAULT_UNO_CONFIG = "uno.config.ts";

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig("components", {
  searchPlaces: ["components.json"]
});

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    // style: z.string(),
    tailwind: z
      .object({
        config: z.string(),
        css: z.string(),
        baseColor: z.string(),
        cssVariables: z.boolean().default(true),
        prefix: z.string().default("").optional()
      })
      .optional(),
    uno: z
      .object({
        config: z.string(),
        css: z.string(),
        baseColor: z.string(),
        cssVariables: z.boolean().default(true),
        prefix: z.string().default("").optional()
      })
      .optional(),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().optional()
    })
  })
  .strict();

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    config: z.string(),
    css: z.string(),
    utils: z.string(),
    components: z.string(),
    ui: z.string()
  })
});

export type Config = z.infer<typeof configSchema>;

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  return await resolveConfigPaths(cwd, config);
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsConfig = loadConfig(cwd);

  if (tsConfig.resultType === "failed") {
    throw new Error(`Failed to load tsconfig.json. ${tsConfig.message ?? ""}`.trim());
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      config: path.resolve(cwd, config.uno ? config.uno.config : config.tailwind!.config),
      css: path.resolve(cwd, config.uno ? config.uno.css : config.tailwind!.css),
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      components: await resolveImport(config.aliases["components"], tsConfig),
      ui: config.aliases["ui"]
        ? await resolveImport(config.aliases["ui"], tsConfig)
        : await resolveImport(config.aliases["components"], tsConfig)
    }
  });
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return rawConfigSchema.parse(configResult.config);
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`);
  }
}
