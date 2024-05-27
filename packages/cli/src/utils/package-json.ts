import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

type PackageJSON = {
  name: string;
  description: string;
  version: string;
};

export const readPackageJSON = async () => {
  const location = resolve(import.meta.dirname, "..", "package.json");

  const data = await readFile(location);

  return JSON.parse(data.toString()) as PackageJSON;
};
