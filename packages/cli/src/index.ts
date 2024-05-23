#!/usr/bin/env node
import { Command } from "commander";
import { addCommand } from "./commands/add";
import { initCommand } from "./commands/init";
import { readPackageJSON } from "./utils/package-json";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const run = async () => {
  const info = await readPackageJSON();

  new Command()
    .name(info.name)
    .description(info.description)
    .version(info.version, "-v, --version")
    .addCommand(initCommand)
    .addCommand(addCommand)
    .parse(process.argv);
};

run();
