import {
  DEFAULT_COMPONENTS,
  DEFAULT_CSS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_UNO_CONFIG,
  DEFAULT_UTILS,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
  type Config
} from "@/src/utils/get-config";
import { getPackageManager } from "@/src/utils/get-package-manager";
import { handleError } from "@/src/utils/handle-error";
import {
  getRegistryBaseColor,
  getRegistryBaseColors,
  getRegistryStyles
} from "@/src/utils/registry";
import * as templates from "@/src/utils/templates";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { execa } from "execa";
import { existsSync, promises as fs } from "fs";
import template from "lodash.template";
import path from "path";
import color from "picocolors";
import { loadConfig } from "tsconfig-paths";
import { z } from "zod";
import { applyPrefixesCss } from "../utils/transformers/transform-tw-prefix";

let PROJECT_DEPENDENCIES = ["class-variance-authority", "clsx", "tailwind-merge"];
const TAILWIND_DEPENDENCIES = ["tailwindcss-animate"];
const UNO_DEPENDENCIES = ["unocss-preset-animations"];

const initOptionsSchema = z.object({
  cwd: z.string()
});

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async opts => {
    try {
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      // Ensure target directory exists.
      if (!existsSync(cwd)) {
        p.log.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      // Read config.
      const existingConfig = await getConfig(cwd);

      const config = await promptForConfig(cwd, existingConfig);

      await runInit(cwd, config);

      p.log.info(`${color.blue("Success!")} Project initialization completed.`);
    } catch (error) {
      handleError(error);
    }
  });

export async function promptForConfig(cwd: string, defaultConfig: Config | null = null) {
  const highlight = (text: string) => color.cyan(text);

  const styles = await getRegistryStyles();
  const baseColors = await getRegistryBaseColors();

  const firstOptions = await p.group(
    {
      style: () =>
        p.select({
          message: `How would you like to use to ${highlight("style")} your app?`,
          // @ts-ignore
          options: styles.map(style => ({
            label: style.label,
            value: style.name
          }))
        })
    },
    {
      onCancel: () => {
        p.cancel("Cancelled.");
        process.exit(0);
      }
    }
  );

  const nextOptions = await p.group(
    {
      baseColor: () =>
        p.select({
          message: `Which color would you like to use as ${highlight("base color")}?`,
          // @ts-ignore
          options: baseColors.map(color => ({
            label: color.label,
            value: color.name
          }))
        }),
      css: () =>
        p.text({
          message: `Where is your ${highlight("global CSS")} file?`,
          placeholder:
            (firstOptions.style === "unocss"
              ? defaultConfig?.uno?.css
              : defaultConfig?.tailwind?.css) ?? DEFAULT_CSS,
          defaultValue:
            (firstOptions.style === "unocss"
              ? defaultConfig?.uno?.css
              : defaultConfig?.tailwind?.css) ?? DEFAULT_CSS
        }),
      cssVariables: () =>
        p.confirm({
          message: `Would you like to use ${highlight("CSS variables")} for colors?`,
          initialValue:
            firstOptions.style === "unocss"
              ? defaultConfig?.uno?.cssVariables
              : defaultConfig?.tailwind?.cssVariables ?? true
        }),
      prefix: () =>
        p.text({
          message: `Are you using a custom ${highlight(
            firstOptions.style === "unocss" ? "uno prefix eg. uno-" : "tailwind prefix eg. tw-"
          )}? (Leave blank if not)`,
          placeholder: "",
          defaultValue: ""
        }),
      config: () =>
        p.text({
          message: `Where is your ${highlight(firstOptions.style === "unocss" ? DEFAULT_UNO_CONFIG : DEFAULT_TAILWIND_CONFIG)} located?`,
          placeholder:
            (firstOptions.style === "unocss"
              ? defaultConfig?.uno?.config
              : defaultConfig?.tailwind?.config) ?? firstOptions.style === "unocss"
              ? DEFAULT_UNO_CONFIG
              : DEFAULT_TAILWIND_CONFIG,
          defaultValue:
            (firstOptions.style === "unocss"
              ? defaultConfig?.uno?.config
              : defaultConfig?.tailwind?.config) ?? firstOptions.style === "unocss"
              ? DEFAULT_UNO_CONFIG
              : DEFAULT_TAILWIND_CONFIG
        })
    },
    {
      onCancel: () => {
        p.cancel("Cancelled.");
        process.exit(0);
      }
    }
  );

  const finalOptions = await p.group(
    {
      components: () =>
        p.text({
          message: `Configure the import alias for ${highlight("components")}:`,
          placeholder: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS,
          defaultValue: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS,
          validate: () => {
            const tsConfig = loadConfig(cwd);

            if (tsConfig.resultType === "success" && tsConfig.paths["@/*"] === undefined) {
              return `Please make sure to update your path aliases to '@'. For more information, please visit: https://shadcn-solid.com/docs/installation`;
            }
          }
        }),
      utils: () =>
        p.text({
          message: `Configure the import alias for ${highlight("utils")}:`,
          placeholder: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
          defaultValue: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS
        }),
      proceed: () =>
        p.confirm({
          message: `Write configuration to ${highlight("components.json")}. Proceed?`,
          initialValue: true
        })
    },
    {
      onCancel: () => {
        p.cancel("Cancelled.");
        process.exit(0);
      }
    }
  );

  if (!finalOptions.proceed) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const tailwindConfig = rawConfigSchema.parse({
    $schema: "https://shadcn-solid.com/schema.json",
    // style: options.style,
    tailwind: {
      config: nextOptions.config,
      css: nextOptions.css,
      baseColor: nextOptions.baseColor,
      cssVariables: nextOptions.cssVariables,
      prefix: nextOptions.prefix
    },
    aliases: {
      utils: finalOptions.utils,
      components: finalOptions.components
    }
  });

  const unoConfig = rawConfigSchema.parse({
    $schema: "https://shadcn-solid.com/schema.json",
    // style: options.style,
    uno: {
      config: nextOptions.config,
      css: nextOptions.css,
      baseColor: nextOptions.baseColor,
      cssVariables: nextOptions.cssVariables,
      prefix: nextOptions.prefix
    },
    aliases: {
      utils: finalOptions.utils,
      components: finalOptions.components
    }
  });

  // Write to file.
  const spinner = p.spinner();
  spinner.start("Writing components.json...");
  const targetPath = path.resolve(cwd, "components.json");
  await fs.writeFile(
    targetPath,
    JSON.stringify(firstOptions.style === "unocss" ? unoConfig : tailwindConfig, null, 2),
    "utf8"
  );
  spinner.stop("Components.json written");

  return await resolveConfigPaths(
    cwd,
    firstOptions.style === "unocss" ? unoConfig : tailwindConfig
  );
}

export async function runInit(cwd: string, config: Config) {
  const spinner = p.spinner();
  spinner.start("Initializing project...");

  // Ensure all resolved paths directories exist.
  for (const [, resolvedPath] of Object.entries(config.resolvedPaths)) {
    const isFile = path.extname(resolvedPath);
    let dirname = isFile ? path.dirname(resolvedPath) : resolvedPath;

    const parsedPath = path.parse(resolvedPath);
    dirname = parsedPath.dir;

    await fs.mkdir(dirname, { recursive: true });
  }

  // Write config.
  await fs.writeFile(
    config.resolvedPaths.config,
    template(
      (config.uno ? config.uno.cssVariables : config.tailwind!.cssVariables)
        ? config.uno
          ? templates.UNO_CONFIG_WITH_VARIABLES
          : templates.TAILWIND_CONFIG_WITH_VARIABLES
        : config.uno
          ? templates.UNO_CONFIG
          : templates.TAILWIND_CONFIG
    )({
      prefix: config.uno ? config.uno.prefix : config.tailwind!.prefix
    }),
    "utf8"
  );

  // Write css file.
  const baseColor = await getRegistryBaseColor(
    config.uno ? config.uno.baseColor : config.tailwind!.baseColor
  );
  if (baseColor) {
    await fs.writeFile(
      config.resolvedPaths.css,
      (config.uno ? config.uno.cssVariables : config.tailwind!.cssVariables)
        ? (config.uno ? config.uno.prefix : config.tailwind!.prefix)
          ? applyPrefixesCss(
              baseColor.cssVarsTemplate,
              config.uno ? config.uno.prefix! : config.tailwind!.prefix!
            )
          : baseColor.cssVarsTemplate
        : baseColor.inlineColorsTemplate,
      "utf8"
    );
  }

  // Write cn file.
  await fs.writeFile(`${config.resolvedPaths.utils}.ts`, templates.UTILS, "utf8");

  spinner.stop("Initialized project");

  // Install dependencies.
  spinner.start("Installing dependencies...");
  const packageManager = await getPackageManager(cwd);

  if (config.uno) {
    PROJECT_DEPENDENCIES.push(...UNO_DEPENDENCIES);
  } else {
    PROJECT_DEPENDENCIES.push(...TAILWIND_DEPENDENCIES);
  }

  await execa(
    packageManager,
    [packageManager === "npm" ? "install" : "add", ...PROJECT_DEPENDENCIES],
    {
      cwd
    }
  );
  spinner.stop("Dependencies installed");
}
