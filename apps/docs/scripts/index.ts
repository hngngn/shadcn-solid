import { buildRegistry, buildRegistryJSONFile } from "./build-registry"

try {
  console.log("💅 Building registry.json...")
  await buildRegistryJSONFile()

  console.log("🏗️ Building registry...")
  await buildRegistry()
} catch (error) {
  console.error(error)
  process.exit(1)
}
