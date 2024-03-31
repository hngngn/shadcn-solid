import { Splitter as SplitterPrimitive } from "@ark-ui/solid";
import { Splitter, SplitterPanel, SplitterResizeTrigger } from "../../ui/splitter";

const SplitterDemo = () => {
  return (
    <Splitter
      class="max-w-md rounded-lg border"
      size={[
        { id: "1", size: 50, minSize: 25 },
        { id: "2", size: 50, minSize: 25 }
      ]}
    >
      <SplitterPanel id="1">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">A</span>
        </div>
      </SplitterPanel>
      <SplitterResizeTrigger id="1:2" />
      <SplitterPanel id="2">
        <Splitter
          orientation="vertical"
          size={[
            { id: "3", size: 35, minSize: 25 },
            { id: "4", size: 65, minSize: 25 }
          ]}
        >
          <SplitterPanel id="3">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">B</span>
            </div>
          </SplitterPanel>
          <SplitterResizeTrigger id="3:4" />
          <SplitterPrimitive.Panel id="4">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">C</span>
            </div>
          </SplitterPrimitive.Panel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  );
};

export default SplitterDemo;
