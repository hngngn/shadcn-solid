import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "@repo/tailwindcss/ui/v4/resizable"

const ResizableWithHandleDemo = () => {
  return (
    <Resizable class="max-w-md rounded-lg border md:min-w-[450px]">
      <ResizablePanel initialSize={0.25} minSize={0.2}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={0.75} minSize={0.2}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </Resizable>
  )
}

export default ResizableWithHandleDemo
