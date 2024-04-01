import {
  type Config,
  DEFAULT_COMPONENTS,
  DEFAULT_CSS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_UNO_CONFIG,
  DEFAULT_UTILS,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths
} from "@/src/utils/get-config";
import { getPackageManager } from "@/src/utils/get-package-manager";
import { handleError } from "@/src/utils/handle-error";
import {
  getRegistryBaseColor,
  getRegistryBaseColors,
  getRegistryFrameworks
} from "@/src/utils/registry";
import * as templates from "@/src/utils/templates";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { execa } from "execa";
import { existsSync, promises as fs } from "fs";
import template from "lodash.template";
import path from "path";
import color from "picocolors";
import { z } from "zod";
import { applyPrefixesCss } from "../utils/transformers/transform-tw-prefix";
import { getPackageInfo } from "@/src/utils/get-package-info";
import { loadConfig } from "tsconfig-paths";

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

      p.outro(`${color.cyan("Success!")} Project initialization completed.`);
    } catch (error) {
      handleError(error);
    }
  });

export async function promptForConfig(cwd: string, defaultConfig: Config | null = null) {
  const highlight = (text: string) => color.cyan(text);

  const framework = await getRegistryFrameworks();
  const baseColors = await getRegistryBaseColors();

  p.intro(color.bgCyan(color.black(` shadcn-solid - ${getPackageInfo().version!} `)));

  const tsConfig = loadConfig(cwd);

  if (tsConfig.resultType === "success" && tsConfig.paths["@/*"] === undefined) {
    p.note(
      `Please make sure to use the same alias defined in your ${highlight("tsconfig")}.`,
      "Note."
    );
  }

  const firstOptions = await p.group(
    {
      framework: () =>
        p.select({
          message: `Which ${highlight("CSS framework")} would you like to use?`,
          // @ts-ignore
          options: framework.map(style => ({
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
            (firstOptions.framework === "unocss"
              ? defaultConfig?.uno?.css
              : defaultConfig?.tailwind?.css) ?? DEFAULT_CSS,
          defaultValue:
            (firstOptions.framework === "unocss"
              ? defaultConfig?.uno?.css
              : defaultConfig?.tailwind?.css) ?? DEFAULT_CSS
        }),
      cssVariables: () =>
        p.confirm({
          message: `Would you like to use ${highlight("CSS variables")} for colors?`,
          initialValue:
            firstOptions.framework === "unocss"
              ? defaultConfig?.uno?.cssVariables
              : defaultConfig?.tailwind?.cssVariables ?? true
        }),
      prefix: () =>
        p.text({
          message: `Are you using a custom ${highlight(
            firstOptions.framework === "unocss" ? "uno prefix eg. uno-" : "tailwind prefix eg. tw-"
          )}? (Leave blank if not)`,
          placeholder:
            (firstOptions.framework === "unocss"
              ? defaultConfig?.uno?.prefix
              : defaultConfig?.tailwind?.prefix) ?? "",
          defaultValue: ""
        }),
      config: () =>
        p.text({
          message: `Where is your ${highlight(firstOptions.framework === "unocss" ? DEFAULT_UNO_CONFIG : DEFAULT_TAILWIND_CONFIG)} located?`,
          placeholder:
            (firstOptions.framework === "unocss"
              ? defaultConfig?.uno?.config
              : defaultConfig?.tailwind?.config) ?? firstOptions.framework === "unocss"
              ? DEFAULT_UNO_CONFIG
              : DEFAULT_TAILWIND_CONFIG,
          defaultValue:
            (firstOptions.framework === "unocss"
              ? defaultConfig?.uno?.config
              : defaultConfig?.tailwind?.config) ?? firstOptions.framework === "unocss"
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
          defaultValue: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS
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
    JSON.stringify(firstOptions.framework === "unocss" ? unoConfig : tailwindConfig, null, 2),
    "utf8"
  );
  spinner.stop("Components.json written");

  return await resolveConfigPaths(
    cwd,
    firstOptions.framework === "unocss" ? unoConfig : tailwindConfig
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
    config.uno ? config.uno.baseColor : config.tailwind!.baseColor,
    config.uno ? "unocss" : "tailwindcss"
  );

  const baseColorConfig = (config.uno ? config.uno.cssVariables : config.tailwind!.cssVariables)
    ? (config.uno ? config.uno.prefix : config.tailwind!.prefix)
      ? applyPrefixesCss(
          baseColor.cssVarsTemplate,
          config.uno ? config.uno.prefix! : config.tailwind!.prefix!
        )
      : baseColor.cssVarsTemplate
    : baseColor.inlineColorsTemplate;

  if (baseColorConfig !== undefined) {
    if (baseColor) {
      await fs.writeFile(config.resolvedPaths.css, baseColorConfig, "utf8");
    }
  }

  // Write cn file.
  await fs.writeFile(`${config.resolvedPaths.utils}.ts`, templates.UTILS, "utf8");

  spinner.message("Initialized project");

  // Install dependencies.
  spinner.message("Installing dependencies...");
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
