import fs from "node:fs/promises"
import path from "node:path"
import { intro, spinner } from "@clack/prompts"
import { Command } from "commander"
import * as v from "valibot"

import { preFlightBuild } from "../preflights/preflight-build"
import { registryItemSchema, registrySchema } from "../registry/schema"
import { handleError } from "../utils/handle-error"
import { highlighter } from "../utils/highlighter"
import { logger } from "../utils/logger"

export const buildOptionsSchema = v.object({
  cwd: v.string(),
  registryFile: v.string(),
  outputDir: v.string(),
})

export const build = new Command()
  .name("build")
  .description("build components for a shadcn-solid registry")
  .argument("[registry]", "path to registry.json file", "./registry.json")
  .option(
    "-o, --output <path>",
    "destination directory for json files",
    "./public/r",
  )
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd(),
  )
  .action(async (registry, opts) => {
    try {
      const options = v.parse(buildOptionsSchema, {
        cwd: path.resolve(opts.cwd),
        registryFile: registry,
        outputDir: opts.output,
      })

      const { resolvePaths } = await preFlightBuild(options)
      const content = await fs.readFile(resolvePaths.registryFile, "utf-8")

      const result = v.safeParse(registrySchema, JSON.parse(content))

      if (!result.success) {
        logger.error(
          `Invalid registry file found at ${highlighter.info(
            resolvePaths.registryFile,
          )}.`,
        )
        process.exit(1)
      }

      intro("shadcn-solid")

      const s = spinner({
        cancelMessage: "Building registry canceled.",
      })

      s.start("Building registry...")
      for (const registryItem of result.output.items) {
        if (!registryItem.files) {
          continue
        }

        s.message(`Building ${highlighter.info(registryItem.name)}...`)

        // Add the schema to the registry item.
        registryItem.$schema =
          "https://shadcn-solid.com/schema/registry-item.json"

        // Loop through each file in the files array.
        for (const file of registryItem.files) {
          // TODO: Add support for UnoCSS.
          file.content = await fs.readFile(
            path.resolve(
              resolvePaths.cwd,
              "../../packages/tailwindcss",
              file.path,
            ),
            "utf-8",
          )
        }

        // Validate the registry item.
        const result = v.safeParse(registryItemSchema, registryItem)
        if (!result.success) {
          logger.error(
            `Invalid registry item found for ${highlighter.info(
              registryItem.name,
            )}.`,
          )
          continue
        }

        // Write the registry item to the output directory.
        await fs.writeFile(
          path.resolve(resolvePaths.outputDir, `${result.output.name}.json`),
          JSON.stringify(result.output, null, 2),
        )
      }

      // Copy registry.json to the output directory.
      await fs.copyFile(
        resolvePaths.registryFile,
        path.resolve(resolvePaths.outputDir, "registry.json"),
      )

      s.stop("Registry built.")
    } catch (error) {
      logger.break()
      handleError(error)
    }
  })
