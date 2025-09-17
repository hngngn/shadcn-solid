import * as v from "valibot"

import { registry } from "@/registry"
import { registrySchema } from "@/registry/schema"

import { buildRegistry } from "./build-registry"

try {
  console.log("💽 Building registry...")
  const result = v.safeParse(registrySchema, registry)

  if (!result.success) {
    console.error(result.issues)
    process.exit(1)
  }

  buildRegistry(result.output)

  console.log("✅ Done!")
} catch (error) {
  console.error(error)
  process.exit(1)
}
