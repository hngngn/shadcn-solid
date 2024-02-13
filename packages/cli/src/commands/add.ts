import { getConfig } from "@/src/utils/get-config";
import { getPackageManager } from "@/src/utils/get-package-manager";
import { handleError } from "@/src/utils/handle-error";
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
  resolveTree,
} from "@/src/utils/registry";
import { transform } from "@/src/utils/transformers";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { execa } from "execa";
import { existsSync, promises as fs } from "fs";
import path from "path";
import color from "picocolors";
import { z } from "zod";

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  overwrite: z.boolean(),
  yes: z.boolean(),
  cwd: z.string(),
  path: z.string().optional(),
});

export const add = new Command()
  .name("add")
  .description("add a component to your project")
  .argument("[components...]", "the components to add")
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd(),
  )
  .option("-p, --path <path>", "the path to add the component to.")
  .option("-y --yes", "skip confirmation prompt.", false)
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        ...opts,
      });

      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        p.log.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      const config = await getConfig(cwd);
      if (!config) {
        p.log.warn(
          `Configuration is missing. Please run ${color.green(
            `init`,
          )} to create a components.json file.`,
        );
        process.exit(1);
      }

      const registryIndex = await getRegistryIndex();

      let selectedComponents = options.components;
      if (!options.components?.length) {
        const { components } = await p.group(
          {
            components: () =>
              p.multiselect({
                message: "Which components would you like to add?",
                options: registryIndex.map((entry) => ({
                  label: entry.name,
                  value: entry.name,
                  hint: "Space to select. A to toggle all. Enter to submit.",
                })),
              }),
          },
          {
            onCancel: () => {
              p.cancel("Cancelled.");
              process.exit(0);
            },
          },
        );
        selectedComponents = components as string[];
      }

      if (!selectedComponents?.length) {
        p.log.warn("No components selected. Exiting.");
        process.exit(0);
      }

      const tree = await resolveTree(registryIndex, selectedComponents);

      // If new styling is added, the config.style property will be reinstated.
      const payload = await fetchTree("default", tree);
      const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);

      if (!payload.length) {
        p.log.warn("Selected components not found. Exiting.");
        process.exit(0);
      }

      if (!options.yes) {
        await p.group(
          {
            proceed: () =>
              p.confirm({
                message: `Ready to install components and dependencies. Proceed?`,
                initialValue: true,
              }),
          },
          {
            onCancel: () => {
              p.cancel("Cancelled.");
              process.exit(0);
            },
          },
        );
      }

      const spinner = p.spinner();
      spinner.start(`Installing ${payload.map((i) => i.name).join(", ")}...`);
      for (const item of payload) {
        const targetDir = await getItemTargetPath(
          config,
          item,
          options.path ? path.resolve(cwd, options.path) : undefined,
        );

        if (!targetDir) {
          continue;
        }

        if (!existsSync(targetDir)) {
          await fs.mkdir(targetDir, { recursive: true });
        }

        const existingComponent = item.files.filter((file) =>
          existsSync(path.resolve(targetDir, file.name)),
        );

        if (existingComponent.length && !options.overwrite) {
          if (selectedComponents.includes(item.name)) {
            p.log.warn(
              `Component ${item.name} already exists. Use ${color.green(
                "-o",
              )} to overwrite.`,
            );
            process.exit(1);
          }

          continue;
        }

        for (const file of item.files) {
          let filePath = path.resolve(targetDir, file.name);

          // Run transformers.
          const content = await transform({
            filename: file.name,
            raw: file.content,
            config,
            baseColor,
          });

          await fs.writeFile(filePath, content);
        }

        // Install dependencies.
        if (item.dependencies?.length) {
          const packageManager = await getPackageManager(cwd);
          await execa(
            packageManager,
            [
              packageManager === "npm" ? "install" : "add",
              ...item.dependencies,
            ],
            {
              cwd,
            },
          );
        }
      }
      spinner.stop(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });
