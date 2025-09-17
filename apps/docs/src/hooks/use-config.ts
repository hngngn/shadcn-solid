import { persistentAtom } from "@nanostores/persistent"
import { useStore } from "@nanostores/solid"

interface Config {
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  installationType: "cli" | "manual"
}

export const $configAtom = persistentAtom<Config>(
  "config",
  {
    packageManager: "pnpm",
    installationType: "manual",
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
)

export const useConfig = () => {
  const config = useStore($configAtom)
  const setConfig = (config: Config) => {
    $configAtom.set({ ...$configAtom.get(), ...config })
  }

  return { config, setConfig }
}
