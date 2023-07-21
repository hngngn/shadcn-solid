import {
	DEFAULT_COMPONENTS,
	DEFAULT_TAILWIND_CONFIG,
	DEFAULT_TAILWIND_CSS,
	DEFAULT_UTILS,
	getConfig,
	rawConfigSchema,
	resolveConfigPaths,
	type Config,
} from "@/src/utils/get-config"
import { getPackageManager } from "@/src/utils/get-package-manager"
import { handleError } from "@/src/utils/handle-error"
import {
	getRegistryBaseColor,
	getRegistryBaseColors,
	getRegistryStyles,
} from "@/src/utils/registry"
import * as templates from "@/src/utils/templates"
import * as p from "@clack/prompts"
import { Command } from "commander"
import { execa } from "execa"
import { existsSync, promises as fs } from "fs"
import path from "path"
import color from "picocolors"
import { loadConfig } from "tsconfig-paths"
import * as z from "zod"

const PROJECT_DEPENDENCIES = [
	"tailwindcss-animate",
	"class-variance-authority",
	"clsx",
	"tailwind-merge",
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
				p.log.error(`The path ${cwd} does not exist. Please try again.`)
				process.exit(1)
			}

			// Read config.
			const existingConfig = await getConfig(cwd)

			const config = await promptForConfig(cwd, existingConfig)

			await runInit(cwd, config)

			p.log.info(
				`${color.blue("Success!")} Project initialization completed.`
			)
		} catch (error) {
			handleError(error)
		}
	})

export async function promptForConfig(
	cwd: string,
	defaultConfig: Config | null = null
) {
	const highlight = (text: string) => color.cyan(text)

	const styles = await getRegistryStyles()
	const baseColors = await getRegistryBaseColors()

	const options = await p.group(
		{
			style: () =>
				p.select({
					message: `Which ${highlight(
						"style"
					)} would you like to use?`,
					// @ts-ignore
					options: styles.map((style) => ({
						label: style.label,
						value: style.name,
					})),
				}),
			tailwindBaseColor: () =>
				p.select({
					message: `Which color would you like to use as ${highlight(
						"base color"
					)}?`,
					// @ts-ignore
					options: baseColors.map((color) => ({
						label: color.label,
						value: color.name,
					})),
				}),
			tailwindCss: () =>
				p.text({
					message: `Where is your ${highlight("global CSS")} file?`,
					placeholder:
						defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
					defaultValue:
						defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
				}),
			tailwindCssVariables: () =>
				p.confirm({
					message: `Would you like to use ${highlight(
						"CSS variables"
					)} for colors?`,
					initialValue: defaultConfig?.tailwind.cssVariables ?? true,
				}),
			tailwindConfig: () =>
				p.text({
					message: `Where is your ${highlight(
						"tailwind.config.cjs"
					)} located?`,
					placeholder:
						defaultConfig?.tailwind.config ??
						DEFAULT_TAILWIND_CONFIG,
					defaultValue:
						defaultConfig?.tailwind.config ??
						DEFAULT_TAILWIND_CONFIG,
				}),
			components: () =>
				p.text({
					message: `Configure the import alias for ${highlight(
						"components"
					)}:`,
					placeholder:
						defaultConfig?.aliases["components"] ??
						DEFAULT_COMPONENTS,
					defaultValue:
						defaultConfig?.aliases["components"] ??
						DEFAULT_COMPONENTS,
					validate: () => {
						const tsConfig = loadConfig(cwd)

						if (
							tsConfig.resultType === "success" &&
							tsConfig.paths["@/*"] === undefined
						) {
							return `Please make sure to update your path aliases to '@'. For more information, please visit: https://shadcn-solid.vercel.app/docs/installation#path-aliases.`
						}
					},
				}),
			utils: () =>
				p.text({
					message: `Configure the import alias for ${highlight(
						"utils"
					)}:`,
					placeholder:
						defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
					defaultValue:
						defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
				}),
			proceed: () =>
				p.confirm({
					message: `Write configuration to ${highlight(
						"components.json"
					)}. Proceed?`,
					initialValue: true,
				}),
		},
		{
			onCancel: () => {
				p.cancel("Cancelled.")
				process.exit(0)
			},
		}
	)

	const config = rawConfigSchema.parse({
		$schema: "https://shadcn-solid.vercel.app/schema.json",
		style: options.style,
		tailwind: {
			config: options.tailwindConfig,
			css: options.tailwindCss,
			baseColor: options.tailwindBaseColor,
			cssVariables: options.tailwindCssVariables,
		},
		aliases: {
			utils: options.utils,
			components: options.components,
		},
	})

	// Write to file.
	if (options.proceed) {
		const spinner = p.spinner()
		spinner.start("Writing components.json...")
		const targetPath = path.resolve(cwd, "components.json")
		await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8")
		spinner.stop("Components.json written")
	}

	return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config) {
	const spinner = p.spinner()
	spinner.start("Initializing project...")

	// Ensure all resolved paths directories exist.
	for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
		// Determine if the path is a file or directory.
		// TODO: is there a better way to do this?
		let dirname = path.extname(resolvedPath)
			? path.dirname(resolvedPath)
			: resolvedPath

		// If the utils alias is set to something like "@/lib/utils",
		// assume this is a file and remove the "utils" file name.
		// TODO: In future releases we should add support for individual utils.
		if (key === "utils" && resolvedPath.endsWith("/utils")) {
			// Remove /utils at the end.
			dirname = dirname.replace(/\/utils$/, "")
		}

		if (!existsSync(dirname)) {
			await fs.mkdir(dirname, { recursive: true })
		}
	}

	// Write tailwind config.
	await fs.writeFile(
		config.resolvedPaths.tailwindConfig,
		config.tailwind.cssVariables
			? templates.TAILWIND_CONFIG_WITH_VARIABLES
			: templates.TAILWIND_CONFIG,
		"utf8"
	)

	// Write css file.
	const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)
	if (baseColor) {
		await fs.writeFile(
			config.resolvedPaths.tailwindCss,
			config.tailwind.cssVariables
				? baseColor.cssVarsTemplate
				: baseColor.inlineColorsTemplate,
			"utf8"
		)
	}

	// Write cn file.
	await fs.writeFile(
		`${config.resolvedPaths.utils}.ts`,
		templates.UTILS,
		"utf8"
	)

	spinner.stop("Initialized project")

	// Install dependencies.
	spinner.start("Installing dependencies...")
	const packageManager = await getPackageManager(cwd)

	await execa(
		packageManager,
		[packageManager === "npm" ? "install" : "add", ...PROJECT_DEPENDENCIES],
		{
			cwd,
		}
	)
	spinner.stop("Dependencies installed")
}
