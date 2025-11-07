import { Skeleton } from "@/registry/ui/skeleton"

const SkeletonDemo = () => {
  return (
    <div class="flex w-full flex-wrap items-start gap-4">
      <div class="flex items-center gap-4">
        <Skeleton
          class="shrink-0"
          style={{
            height: "calc(var(--spacing) * 10)",
            width: "calc(var(--spacing) * 10)",
          }}
          radius={9999}
        />
        <div class="grid gap-2">
          <Skeleton
            width={150}
            style={{
              height: "calc(var(--spacing) * 4)",
            }}
          />
          <Skeleton
            width={100}
            style={{
              height: "calc(var(--spacing) * 4)",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SkeletonDemo
