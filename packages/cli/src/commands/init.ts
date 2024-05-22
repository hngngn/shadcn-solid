import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, parse, resolve } from "node:path";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { execa } from "execa";
import template from "lodash.template";
import cl from "picocolors";
import { loadConfig } from "tsconfig-paths";
import { object, safeParse, string, parse as valibotParse } from "valibot";
import {
  DEFAULT_COMPONENTS,
  DEFAULT_CSS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_UNO_CONFIG,
  DEFAULT_UTILS,
  type RawConfig,
  getConfig,
  rawConfigSchema,
  resolveConfigPath
} from "../utils/config";
import { readPackageJSON } from "../utils/package-json";
import { getPackageManager } from "../utils/package-manager";
import { getRegistryColor, getRegistryColors, getRegistryFrameworks } from "../utils/registry";
import {
  CN,
  TAILWIND_CONFIG,
  TAILWIND_CONFIG_WITH_VARIABLES,
  UNO_CONFIG,
  UNO_CONFIG_WITH_VARIABLES
} from "../utils/templates";
import { applyPrefixesCSS } from "../utils/transforms/prefix";

const PROJECT_DEPENDENCIES = ["class-variance-authority", "clsx", "tailwind-merge"];
const TAILWIND_DEPENDENCIES = ["tailwindcss-animate"];
const UNO_DEPENDENCIES = ["unocss-preset-animations"];

const schema = object({
  cwd: string()
});

export const initCommand = new Command()
  .name("init")
  .description("Initialize your project and install dependencies")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .action(async opts => {
    const parsed = safeParse(schema, opts);

    if (!parsed.success) {
      p.log.error(
        parsed.issues
          // @ts-expect-error
          .map(v => `[${v.path?.[0].key}] ${v.message}`)
          .join("/n")
          .toString()
      );
      process.exit(1);
    }

    const cwd = resolve(parsed.output.cwd);
    if (!existsSync(cwd)) {
      p.log.error(`The path ${cwd} does not exist`);
      process.exit(1);
    }

    const frameworks = await getRegistryFrameworks();
    const colors = getRegistryColors();
    const info = await readPackageJSON();
    const defaultConfig = getConfig(cwd);

    p.intro(cl.bgCyan(cl.black(` ${info.name} - ${info.version} `)));

    const group = await p.group(
      {
        framework: () =>
          p.select<{ label: string; value: string; hint?: string }[], string>({
            message: `Which ${cl.cyan("CSS framework")} would you like to use?`,
            options: frameworks.map(v => ({ label: v.label, value: v.name }))
          }),
        color: () =>
          p.select<{ label: string; value: string; hint?: string }[], string>({
            message: `Which color would you like to use as ${cl.cyan("base color")}?`,
            options: colors.map(v => ({ label: v.label, value: v.name }))
          }),
        css: ({ results: { framework } }) =>
          p.text({
            message: `Where is your ${cl.cyan("global CSS")} file?`,
            placeholder:
              (framework === "unocss"
                ? defaultConfig?.uno?.css.path
                : defaultConfig?.tailwind?.css.path) ?? DEFAULT_CSS,
            defaultValue:
              (framework === "unocss"
                ? defaultConfig?.uno?.css.path
                : defaultConfig?.tailwind?.css.path) ?? DEFAULT_CSS
          }),
        variable: ({ results: { framework } }) =>
          p.confirm({
            message: `Would you like to use ${cl.cyan("CSS variables")} for colors?`,
            initialValue:
              (framework === "unocss"
                ? defaultConfig?.uno?.css.variable
                : defaultConfig?.tailwind?.css.variable) ?? true
          }),
        prefix: ({ results: { framework } }) =>
          p.text({
            message: `Are you using a custom ${cl.cyan(
              framework === "unocss" ? "uno prefix eg. uno-" : "tailwind prefix eg. tw-"
            )}? (Leave blank if not)`,
            placeholder:
              (framework === "unocss"
                ? defaultConfig?.uno?.prefix
                : defaultConfig?.tailwind?.prefix) ?? "",
            defaultValue:
              (framework === "unocss"
                ? defaultConfig?.uno?.prefix
                : defaultConfig?.tailwind?.prefix) ?? ""
          }),
        config: ({ results: { framework } }) =>
          p.text({
            message: `Where is your ${cl.cyan(
              framework === "unocss" ? DEFAULT_UNO_CONFIG : DEFAULT_TAILWIND_CONFIG
            )} located?`,
            placeholder:
              (framework === "unocss"
                ? defaultConfig?.uno?.config
                : defaultConfig?.tailwind?.config) ??
              (framework === "unocss" ? DEFAULT_UNO_CONFIG : DEFAULT_TAILWIND_CONFIG),
            defaultValue:
              (framework === "unocss"
                ? defaultConfig?.uno?.config
                : defaultConfig?.tailwind?.config) ??
              (framework === "unocss" ? DEFAULT_UNO_CONFIG : DEFAULT_TAILWIND_CONFIG)
          }),
        component: () => {
          const tsConfig = loadConfig(cwd);

          if (tsConfig.resultType === "success" && tsConfig.paths["@/*"] === undefined) {
            p.log.warning(
              cl.yellow(
                `Please make sure to use the same alias defined in your ${cl.bold("tsconfig.json")}`
              )
            );
          }

          return p.text({
            message: `Configure the import alias path for ${cl.cyan("component")}`,
            placeholder: defaultConfig?.alias.component ?? DEFAULT_COMPONENTS,
            defaultValue: defaultConfig?.alias.component ?? DEFAULT_COMPONENTS
          });
        },
        cn: () =>
          p.text({
            message: `Configure the import alias path for ${cl.cyan("cn")}`,
            placeholder: defaultConfig?.alias.cn ?? DEFAULT_UTILS,
            defaultValue: defaultConfig?.alias.cn ?? DEFAULT_UTILS
          })
      },
      {
        onCancel: () => {
          p.cancel("Cancelled");
          process.exit(0);
        }
      }
    );

    const tailwindConfig = valibotParse(rawConfigSchema, {
      $schema: "https://shadcn-solid.com/schema.json",
      tailwind: {
        config: group.config as string,
        css: {
          path: group.css as string,
          variable: group.variable as boolean
        },
        color: group.color,
        prefix: group.prefix as string
      },
      alias: {
        cn: group.cn,
        component: group.component
      }
    } satisfies RawConfig);

    const unoConfig = valibotParse(rawConfigSchema, {
      $schema: "https://shadcn-solid.com/schema.json",
      uno: {
        config: group.config as string,
        css: {
          path: group.css as string,
          variable: group.variable as boolean
        },
        color: group.color,
        prefix: group.prefix as string
      },
      alias: {
        cn: group.cn,
        component: group.component
      }
    } satisfies RawConfig);

    const spinner = p.spinner();

    spinner.start(`Writing ${cl.cyan("components.json")}`);

    const targetPath = resolve(cwd, "components.json");

    await writeFile(
      targetPath,
      JSON.stringify(group.framework === "unocss" ? unoConfig : tailwindConfig, null, 2),
      "utf8"
    );

    spinner.stop(`${cl.cyan("components.json")} created`);

    const promptConfig = resolveConfigPath(
      cwd,
      group.framework === "unocss" ? unoConfig : tailwindConfig
    );

    for (const [, resolvePath] of Object.entries(promptConfig.resolvedPaths)) {
      const isFile = extname(resolvePath);
      let dir = isFile ? dirname(resolvePath) : resolvePath;

      const parsedPath = parse(resolvePath);
      dir = parsedPath.dir;

      await mkdir(dir, { recursive: true });
    }

    spinner.start(
      `Updating ${cl.cyan(
        group.framework === "unocss" ? DEFAULT_UNO_CONFIG : DEFAULT_TAILWIND_CONFIG
      )}`
    );

    await writeFile(
      promptConfig.resolvedPaths.config,
      template(
        (promptConfig.uno ? promptConfig.uno.css.variable : promptConfig.tailwind!.css.variable)
          ? promptConfig.uno
            ? UNO_CONFIG_WITH_VARIABLES
            : TAILWIND_CONFIG_WITH_VARIABLES
          : promptConfig.uno
            ? UNO_CONFIG
            : TAILWIND_CONFIG
      )({
        prefix: promptConfig.uno ? promptConfig.uno.prefix : promptConfig.tailwind!.prefix
      }),
      "utf8"
    );

    spinner.stop(
      `${cl.cyan(
        group.framework === "unocss" ? DEFAULT_UNO_CONFIG : DEFAULT_TAILWIND_CONFIG
      )} updated`
    );

    spinner.start(`Updating ${cl.cyan(group.css as string)}`);

    const baseColor = await getRegistryColor(
      promptConfig.uno ? promptConfig.uno.color : promptConfig.tailwind!.color,
      promptConfig.uno ? "unocss" : "tailwindcss"
    );

    const baseColorConfig = (
      promptConfig.uno
        ? promptConfig.uno.css.variable
        : promptConfig.tailwind!.css.variable
    )
      ? (promptConfig.uno ? promptConfig.uno.prefix : promptConfig.tailwind!.prefix)
        ? applyPrefixesCSS(
            baseColor.cssVarsTemplate,
            promptConfig.uno ? promptConfig.uno.prefix! : promptConfig.tailwind!.prefix!
          )
        : baseColor.cssVarsTemplate
      : baseColor.inlineColorsTemplate;

    if (baseColorConfig !== undefined) {
      if (baseColor) {
        await writeFile(promptConfig.resolvedPaths.css, baseColorConfig, "utf8");
      }
    }

    spinner.stop(`${cl.cyan(group.css as string)} updated`);

    spinner.start(`Writing ${cl.cyan("cn")}`);

    await writeFile(`${promptConfig.resolvedPaths.cn}.ts`, CN, "utf8");

    spinner.stop(`${cl.cyan("cn")} created`);

    const pm = getPackageManager();

    PROJECT_DEPENDENCIES.push(
      ...(group.framework === "unocss" ? UNO_DEPENDENCIES : TAILWIND_DEPENDENCIES)
    );

    spinner.start(`Installing ${cl.cyan(PROJECT_DEPENDENCIES.map(v => v).join(", "))}`);

    await execa(pm, ["add", ...PROJECT_DEPENDENCIES], {
      cwd,
      env: { NODE_ENV: undefined }
    });

    spinner.stop(`${cl.cyan("Dependencies")} installed`);

    p.outro("Initialization completed");
  });
