import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { type Change, diffLines } from "diff";
import cl from "picocolors";
import { type InferInput, object, optional, parse, string } from "valibot";
import { type Config, getConfig } from "../utils/config";
import { handleError } from "../utils/error";
import { readPackageJSON } from "../utils/package-json";
import {
  type ComponentSchema,
  fetchTree,
  getItemTargetPath,
  getRegistryColor,
  getRegistryComponent
} from "../utils/registry";
import { transform } from "../utils/transforms";

const schema = object({
  component: optional(string()),
  cwd: string()
});

type Schema = InferInput<typeof schema>;

export const diffComponent = async (component: ComponentSchema[number], config: Config) => {
  const payload = await fetchTree(config.uno ? "unocss" : "tailwindcss", [component]);
  const color = await getRegistryColor(
    config.uno ? config.uno.color : config.tailwind!.color,
    config.uno ? "unocss" : "tailwindcss"
  );

  const changes = [];

  for (const item of payload) {
    const targetDir = await getItemTargetPath(config, item);
    if (!targetDir) {
      continue;
    }

    for (const file of item.files) {
      const filePath = resolve(targetDir, file.name);

      if (!existsSync(filePath)) {
        continue;
      }

      const fileContent = await readFile(filePath, "utf8");

      const registryContent = await transform({
        filename: file.name,
        raw: file.content,
        config,
        color
      });

      const patch = diffLines(registryContent as string, fileContent);
      if (patch.length > 1) {
        changes.push({
          file: file.name,
          filePath,
          patch
        });
      }
    }
  }

  return changes;
};

const printDiff = (diff: Change[]) => {
  diff.forEach(part => {
    if (part) {
      if (part.added) {
        return process.stdout.write(cl.green(part.value));
      }
      if (part.removed) {
        return process.stdout.write(cl.red(part.value));
      }

      return process.stdout.write(part.value);
    }
  });
};

export const diffCommand = new Command()
  .name("diff")
  .description("check for updates agaist the registry")
  .argument("[component]", "the component name")
  .usage("[component] [options]")
  .option("-c, --cwd <path>", "the working directory", process.cwd())
  .action(async (name, opts) => {
    try {
      const parsed = parse(schema, {
        component: name,
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

      if (!parsed.component) {
        const targetDir = config.resolvedPaths.components;

        const projectComponents = registryComponent.filter(v => {
          for (const file of v.files) {
            const filePath = resolve(targetDir, file);
            if (existsSync(filePath)) return true;
          }

          return false;
        });

        const componentWithUpdate = [];

        const info = await readPackageJSON();

        p.intro(cl.bgCyan(cl.black(` ${info.name} - ${info.version} `)));

        const spinner = p.spinner();

        spinner.start("Checking for updates");
        for (const component of projectComponents) {
          const changes = await diffComponent(component, config);
          if (changes.length) {
            componentWithUpdate.push({
              name: component.name,
              changes
            });
          }
        }

        if (!componentWithUpdate.length) {
          p.log.info("No updates found");
          process.exit(0);
        }

        spinner.stop("The following components have updates avaiable");
        for (const component of componentWithUpdate) {
          for (const change of component.changes) {
            p.log.info(`${cl.cyan(component.name)} - ${change.filePath}`);
          }
        }

        p.outro(`Run ${cl.cyan("diff <component>")} to see the changes`);
        process.exit(0);
      }

      const component = registryComponent.find(v => v.name === parsed.component);
      if (!component) {
        throw new Error(`The component ${cl.bold(parsed.component)} does not exist`);
      }

      const changes = await diffComponent(component, config);
      if (!changes.length) {
        p.log.info(`No updates found for ${cl.cyan(parsed.component)}`);
        process.exit(0);
      }

      for (const change of changes) {
        console.log(cl.cyan(change.filePath));
        console.log("");
        printDiff(change.patch);
      }
    } catch (error) {
      handleError(error);
    }
  });
