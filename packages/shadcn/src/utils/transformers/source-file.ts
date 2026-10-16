import path from "path"
import {
  type TransformOpts,
  type Transformer,
} from "@shadcn-solid/registry/internal/transformers/index"
import { Project, ScriptKind, type SourceFile } from "ts-morph"

export type SourceFileTransformer = (
  opts: TransformOpts & {
    sourceFile: SourceFile
  },
) => Promise<SourceFile>

export function fromTextTransformer(
  transform: Transformer,
): SourceFileTransformer {
  return async ({ sourceFile, ...opts }) => {
    setFullText(sourceFile, await transform(sourceFile.getFullText(), opts))
    return sourceFile
  }
}

function setFullText(sourceFile: SourceFile, text: string) {
  const fullText = sourceFile.getFullText()
  if (text !== fullText) {
    sourceFile.applyTextChanges([
      { span: { start: 0, length: fullText.length }, newText: text },
    ])
  }
}

let project: Project | undefined
let files = 0

export function toTextTransformer(
  transform: SourceFileTransformer,
): Transformer {
  return async (code, opts) => {
    project ??= new Project({
      compilerOptions: {},
      useInMemoryFileSystem: true,
    })
    const sourceFile = project.createSourceFile(
      path.join(`/shadcn-${++files}`, path.basename(opts.filename)),
      code,
      { scriptKind: ScriptKind.TSX },
    )

    try {
      await transform({ ...opts, sourceFile })
      return sourceFile.getFullText()
    } finally {
      project.removeSourceFile(sourceFile)
    }
  }
}
