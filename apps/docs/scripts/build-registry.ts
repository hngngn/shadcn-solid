import { exec } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { rimraf } from "rimraf"

import { registry } from "@/registry"

export const buildRegistryJSONFile = async () => {
  // Write the content of the registry to `registry.json`
  rimraf.sync(path.join(process.cwd(), `registry.json`))
  await fs.writeFile(
    path.join(process.cwd(), `registry.json`),
    JSON.stringify(registry, null, 2),
  )
}

export const buildRegistry = () => {
  return new Promise((resolve, reject) => {
    const process = exec(
      `pnpx shadcn-solid build registry.json -o public/r/frameworks/tailwindcss/v4 -c ../../apps/docs`,
    )

    process.on("exit", (code) => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}
