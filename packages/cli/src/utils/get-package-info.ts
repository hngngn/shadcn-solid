import fs from "fs-extra"
import { dirname, resolve } from "node:path"
import { type PackageJson } from "type-fest"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function getPackageInfo() {
	const packageJsonPath = resolve(__dirname, "../package.json")

	return fs.readJSONSync(packageJsonPath) as PackageJson
}
