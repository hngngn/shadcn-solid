#!/usr/bin/env node
import { add } from "@/src/commands/add"
import { init } from "@/src/commands/init"
import { Command } from "commander"

import { getPackageInfo } from "./utils/get-package-info"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
    const packageInfo = getPackageInfo()

    const program = new Command()
        .name("shadcn-solid")
        .description("add components and dependencies to your project")
        .version(
            packageInfo.version!,
            "-v, --version",
            "display the version number"
        )

    program.addCommand(init).addCommand(add)

    program.parse()
}

main()
