import { createRoot } from "solid-js"
import { createStore } from "solid-js/store"
import { makePersisted } from "@solid-primitives/storage"

interface Config {
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  installationType: "cli" | "manual"
}

const useConfig = () => {
  const [config, setConfig] = makePersisted(
    createStore<Config>({
      packageManager: "pnpm",
      installationType: "cli",
    }),
    {
      name: "config",
    },
  )

  return { config, setConfig }
}

export default createRoot(useConfig)
