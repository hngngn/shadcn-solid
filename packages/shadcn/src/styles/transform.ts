import { Project, ScriptKind, type SourceFile } from "ts-morph"

import { type StyleMap } from "./create-style-map.js"
import { transformStyleMap } from "./transform-style-map.js"

export type TransformerStyle<Output = SourceFile> = (opts: {
  sourceFile: SourceFile
  styleMap: StyleMap
}) => Promise<Output>

export async function transformStyle(
  source: string,
  {
    styleMap,
    transformers = [transformStyleMap],
  }: {
    styleMap: StyleMap
    transformers?: TransformerStyle<SourceFile>[]
  },
) {
  const project = new Project({
    useInMemoryFileSystem: true,
  })

  const sourceFile = project.createSourceFile("component.tsx", source, {
    scriptKind: ScriptKind.TSX,
    overwrite: true,
  })

  for (const transformer of transformers) {
    await transformer({ sourceFile, styleMap })
  }

  return sourceFile.getText()
}
