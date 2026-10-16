// The types the registry's transformers share. Upstream this module also
// re-exported every transformer and ran them in order, but only the types are
// used here, so the rest of that barrel is not ported.
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
