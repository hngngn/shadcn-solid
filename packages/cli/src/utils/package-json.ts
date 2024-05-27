import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type PackageJSON = {
  name: string;
  description: string;
  version: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readPackageJSON = async () => {
  const location = resolve(__dirname, "..", "package.json");

  const data = await readFile(location);

  return JSON.parse(data.toString()) as PackageJSON;
};
