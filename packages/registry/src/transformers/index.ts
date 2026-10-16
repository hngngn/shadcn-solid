import { z } from "zod"

import { registryBaseColorSchema, type Config } from "../registry/schema.js"

export type TransformOpts = {
  filename: string
  raw: string
  config: Config
  baseColor?: z.infer<typeof registryBaseColorSchema>
  transformJsx?: boolean
  isRemote?: boolean
  supportedFontMarkers?: string[]
}

export type Transformer = (
  code: string,
  opts: TransformOpts,
) => string | Promise<string>
