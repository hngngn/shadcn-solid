import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  createMatchPath,
  loadConfig,
  type ConfigLoaderSuccessResult,
} from "tsconfig-paths"
import {
  boolean,
  object,
  optional,
  parse,
  string,
  type InferInput,
} from "valibot"

export const DEFAULT_COMPONENTS = "@/components"
export const DEFAULT_UTILS = "@/libs/cn"
export const DEFAULT_CSS = "src/app.css"
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.cjs"
export const DEFAULT_UNO_CONFIG = "uno.config.ts"

const cssSchema = optional(
  object({
    config: string(),
    css: object({
      path: string(),
      variable: optional(boolean(), true),
    }),
    color: string(),
    prefix: optional(string(), ""),
  })
)

export const rawConfigSchema = object({
  $schema: optional(string()),
  tailwind: cssSchema,
  uno: cssSchema,
  alias: object({
    component: string(),
    cn: string(),
    ui: optional(string()),
  }),
})

export type RawConfig = InferInput<typeof rawConfigSchema>

const configSchema = object({
  ...rawConfigSchema.entries,
  resolvedPaths: object({
    config: string(),
    css: string(),
    cn: string(),
    components: string(),
    ui: string(),
  }),
})

export type Config = InferInput<typeof configSchema>

const getRawConfig = (cwd: string) => {
  try {
    const path = resolve(cwd, "components.json")

    if (!existsSync(path)) return

    const config = JSON.parse(readFileSync(path).toString())

    return parse(rawConfigSchema, config)
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}

const resolveImport = (
  importPath: string,
  config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) => {
  return createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
    [".ts", ".tsx"]
  )
}

export const resolveConfigPath = (cwd: string, config: RawConfig) => {
  const tsConfig = loadConfig(cwd)

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load tsconfig.json. ${tsConfig.message ?? ""}`.trim()
    )
  }

  return parse(configSchema, {
    ...config,
    resolvedPaths: {
      config: resolve(
        cwd,
        config.uno ? config.uno.config : config.tailwind?.config
      ),
      css: resolve(
        cwd,
        config.uno ? config.uno.css.path : config.tailwind?.css.path
      ),
      cn: resolveImport(config.alias.cn, tsConfig)!,
      components: resolveImport(config.alias.component, tsConfig)!,
      ui: config.alias.ui
        ? resolveImport(config.alias.ui, tsConfig)!
        : resolveImport(config.alias.component, tsConfig)!,
    },
  } satisfies Config)
}

export const getConfig = (cwd: string) => {
  const config = getRawConfig(cwd)

  if (!config) return

  return resolveConfigPath(cwd, config)
}
