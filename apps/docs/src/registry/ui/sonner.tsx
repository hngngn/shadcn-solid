import { useColorMode } from "@kobalte/core"
import { Toaster as Sonner } from "somoto"

export const Toaster = (props: Parameters<typeof Sonner>[0]) => {
  const { colorMode } = useColorMode()

  return (
    <Sonner
      theme={colorMode()}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  )
}
