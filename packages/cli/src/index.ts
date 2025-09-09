#!/usr/bin/env node
import { Command } from "commander"

import packageJson from "../package.json"
import { build } from "./commands/build"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

const main = () => {
  const program = new Command()
    .name("shadcn-solid")
    .description("add items from registries to your project")
    .version(packageJson.version, "-v, --version", "display the version number")

  program.addCommand(build)

  program.parse()
}

main()
