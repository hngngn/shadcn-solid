import { Skeleton } from "@repo/tailwindcss/ui/v4/skeleton"

const SkeletonDemo = () => {
  return (
    <div class="flex items-center space-x-4">
      <Skeleton radius={100} height={48} width={48} />
      <div class="space-y-2">
        <Skeleton height={16} width={250} />
        <Skeleton height={16} width={200} />
      </div>
    </div>
  )
}

export default SkeletonDemo
