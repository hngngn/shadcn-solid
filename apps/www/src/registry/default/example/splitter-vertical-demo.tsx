import { Splitter, SplitterPanel, SplitterResizeTrigger } from "../ui/splitter";

const SplitterVerticalDemo = () => {
  return (
    <Splitter
      orientation="vertical"
      class="min-h-[200px] max-w-md rounded-lg border"
      size={[
        { id: "1", size: 25, minSize: 25 },
        { id: "2", size: 75, minSize: 25 }
      ]}
    >
      <SplitterPanel id="1">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">A</span>
        </div>
      </SplitterPanel>
      <SplitterResizeTrigger id="1:2" />
      <SplitterPanel id="2">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">B</span>
        </div>
      </SplitterPanel>
    </Splitter>
  );
};

export default SplitterVerticalDemo;
