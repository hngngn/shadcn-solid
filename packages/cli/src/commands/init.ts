import { getPackageManager } from "@/src/utils/get-package-manager"
import { handleError } from "@/src/utils/handle-error"
import { logger } from "@/src/utils/logger"
import * as templates from "@/src/utils/templates"
import chalk from "chalk"
import { Command } from "commander"
import { execa } from "execa"
import { existsSync, promises as fs } from "fs"
import ora from "ora"
import path from "path"
import * as z from "zod"

const PROJECT_DEPENDENCIES = [
    "class-variance-authority",
    "@iconify-json/lucide",
]

const initOptionsSchema = z.object({
    cwd: z.string(),
})

export const init = new Command()
    .name("init")
    .description("initialize your project and install dependencies")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .action(async (opts) => {
        try {
            const options = initOptionsSchema.parse(opts)
            const cwd = path.resolve(options.cwd)

            // Ensure target directory exists.
            if (!existsSync(cwd)) {
                logger.error(
                    `The path ${cwd} does not exist. Please try again.`
                )
                process.exit(1)
            }

            await runInit(cwd)

            logger.info("")
            logger.info(
                `${chalk.green("Success!")} Project initialization completed.`
            )
            logger.info("")
        } catch (error) {
            handleError(error)
        }
    })

export async function runInit(cwd: string) {
    const spinner = ora(`Initializing project...`)?.start()

    // Write unocss config.
    await fs.writeFile(
        "uno.config.ts",
        templates.UNO_CONFIG_WITH_VARIABLES,
        "utf8"
    )

    try {
        await fs.access(`${cwd}/src/styles`)
    } catch (error) {
        await fs.mkdir(`${cwd}/src/styles`, { recursive: true })
    }

    // Write css file.
    await fs.writeFile("src/styles/global.css", templates.CSS, "utf8")

    spinner?.succeed()

    // Install dependencies.
    const dependenciesSpinner = ora(`Installing dependencies...`)?.start()
    const packageManager = await getPackageManager(cwd)

    await execa(
        packageManager,
        [packageManager === "npm" ? "install" : "add", ...PROJECT_DEPENDENCIES],
        {
            cwd,
        }
    )
    dependenciesSpinner?.succeed()
}
