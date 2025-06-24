import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "@repo/tailwindcss/ui/v4/resizable"

const ResizableOrientationDemo = () => {
  return (
    <Resizable
      class="h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
      orientation="vertical"
    >
      <ResizablePanel initialSize={0.25} minSize={0.2}>
        <div class="flex h-full items-center justify-center p-4">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel initialSize={0.75} minSize={0.2}>
        <div class="flex h-full items-center justify-center p-4">
          <span class="font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </Resizable>
  )
}

export default ResizableOrientationDemo
