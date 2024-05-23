import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Project, ScriptKind, type SourceFile } from "ts-morph";
import type { Config } from "../config";
import type { ColorSchema } from "../registry";
import { transformCSSVariable } from "./css";
import { transformImport } from "./import";
import { transformPrefix } from "./prefix";

type Option = {
  filename: string;
  raw: string;
  config: Config;
  color?: ColorSchema;
};

export type Transformer<Output = SourceFile> = (
  opts: Option & {
    sourceFile: SourceFile;
  }
) => Promise<Output>;

const transformers: Transformer[] = [transformImport, transformCSSVariable, transformPrefix];

const project = new Project({
  compilerOptions: {}
});

const createTempSourceFile = async (filename: string) => {
  const dir = await mkdtemp(join(tmpdir(), "shadcn-"));
  return join(dir, filename);
};

export const transform = async (opts: Option) => {
  const tempFile = await createTempSourceFile(opts.filename);
  const sourceFile = project.createSourceFile(tempFile, opts.raw, {
    scriptKind: ScriptKind.TSX
  });

  for (const transformer of transformers) {
    transformer({ sourceFile, ...opts });
  }

  return sourceFile.getFullText();
};
