import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { execa } from "execa";
import cl from "picocolors";
import { type InferInput, array, boolean, object, optional, parse, string } from "valibot";
import { getConfig } from "../utils/config";
import { handleError } from "../utils/error";
import { readPackageJSON } from "../utils/package-json";
import { getPackageManager } from "../utils/package-manager";
import {
  fetchTree,
  getItemTargetPath,
  getRegistryColor,
  getRegistryComponent,
  resolveTree
} from "../utils/registry";
import { transform } from "../utils/transforms";

const schema = object({
  components: optional(array(string())),
  overwrite: boolean(),
  cwd: string(),
  all: boolean()
});

type Schema = InferInput<typeof schema>;

export const addCommand = new Command()
  .name("add")
  .description("add components to your project")
  .argument("[components...]", "the components to add")
  .usage("[components...] [options]")
  .option("-o, --overwrite", "overwrite existing file", false)
  .option("-c, --cwd <path>", "the working directory", process.cwd())
  .option("-a, --all", "install all components", false)
  .action(async (components, opts) => {
    try {
      const parsed = parse(schema, {
        components,
        ...opts
      } satisfies Schema);

      const cwd = resolve(parsed.cwd);
      if (!existsSync(cwd)) {
        throw new Error(`The path ${cwd} does not exist`);
      }

      const config = getConfig(cwd);
      if (config === undefined) {
        p.log.warning(
          cl.yellow(
            `Configuration is missing. Please run ${cl.bold(
              "init"
            )} to create a components.json file`
          )
        );
        process.exit(1);
      }

      const registryComponent = await getRegistryComponent();

      let selectComponents = parsed.all ? registryComponent.map(v => v.name) : parsed.components;

      const info = await readPackageJSON();

      p.intro(cl.bgCyan(cl.black(` ${info.name} - ${info.version} `)));

      if (!parsed.all && !parsed.components?.length) {
        const group = await p.group(
          {
            components: () =>
              p.multiselect<{ label: string; value: string; hint?: string }[], string>({
                message: `Which ${cl.cyan("component")} would you like to add?`,
                options: registryComponent.map(v => ({
                  label: v.name,
                  value: v.name
                }))
              })
          },
          {
            onCancel: () => {
              p.cancel("Cancelled");
              process.exit(0);
            }
          }
        );

        selectComponents = group.components;
      }

      const tree = await resolveTree(registryComponent, selectComponents!);

      const payload = await fetchTree(config.uno ? "unocss" : "tailwindcss", tree);
      const color = await getRegistryColor(
        config.uno ? config.uno.color : config.tailwind!.color,
        config.uno ? "unocss" : "tailwindcss"
      );

      if (!payload.length) {
        p.log.warning("Selected components not found");
        process.exit(0);
      }

      const spinner = p.spinner();

      spinner.start("Installing component");

      const dependencies = new Set<string>();

      for (const item of payload) {
        spinner.message(`Installing ${cl.cyan(item.name)}`);

        const targetDir = await getItemTargetPath(config, item);
        if (!targetDir) {
          continue;
        }

        if (!existsSync(targetDir)) {
          await mkdir(targetDir, { recursive: true });
        }

        const existingComponent = item.files.filter(v => existsSync(resolve(targetDir, v.name)));

        if (existingComponent.length && !parsed.overwrite) {
          if (selectComponents!.includes(item.name)) {
            p.log.warning(
              cl.yellow(`Component ${item.name} already exists. Use ${cl.bold("-o")} to overwrite`)
            );
            process.exit(1);
          }
        }

        for (const file of item.files) {
          const path = resolve(targetDir, file.name);

          const content = await transform({
            filename: file.name,
            raw: file.content,
            config,
            color
          });

          await writeFile(path, content);
        }

        if (item.dependencies?.length) {
          item.dependencies.map(v => dependencies.add(v));
        }
      }

      spinner.stop(
        selectComponents!.length > 1 || parsed.all
          ? `${cl.cyan("Components")} installed`
          : `${cl.cyan("Component")} installed`
      );

      spinner.start(
        `Installing ${cl.cyan(
          Array.from(dependencies)
            .map(v => v)
            .join(", ")
            .toString()
        )}`
      );
      const pm = getPackageManager();

      await execa(pm, ["add", ...Array.from(dependencies)], {
        cwd,
        env: { NODE_ENV: undefined }
      });

      spinner.stop(
        `${cl.cyan(
          selectComponents!.length > 1 || parsed.all ? "Dependencies" : "Dependency"
        )} installed`
      );

      p.outro("Component addition completed");
    } catch (error) {
      handleError(error);
    }
  });
