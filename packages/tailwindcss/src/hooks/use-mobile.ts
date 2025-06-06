import { createMediaQuery } from "@solid-primitives/media"

export const useIsMobile = () => createMediaQuery("(max-width: 767px)")
