import { Separator } from "@/registry/ui/separator"

const SeparatorDemo = () => {
  return (
    <div>
      <div class="flex flex-col gap-1">
        <div class="text-sm leading-none font-medium">UnoCSS</div>
        <div class="text-muted-foreground text-sm">
          Instant On-demand Atomic CSS Engine.
        </div>
      </div>
      <Separator class="my-4" />
      <div class="flex h-5 items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}

export default SeparatorDemo
