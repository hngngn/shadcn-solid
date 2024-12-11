import {
	Resizable,
	ResizableHandle,
	ResizablePanel,
} from "@/registry/tailwindcss/ui/resizable";

const ResizableDemo = () => {
	return (
		<Resizable class="max-w-md rounded-lg border">
			<ResizablePanel initialSize={0.3} minSize={0.2}>
				<div class="flex h-[200px] items-center justify-center">
					<span class="font-semibold">A</span>
				</div>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel initialSize={0.7} minSize={0.2}>
				<Resizable orientation="vertical">
					<ResizablePanel initialSize={0.5} minSize={0.2}>
						<div class="flex h-full items-center justify-center">
							<span class="font-semibold">B</span>
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel initialSize={0.5} minSize={0.2}>
						<div class="flex h-full items-center justify-center">
							<span class="font-semibold">C</span>
						</div>
					</ResizablePanel>
				</Resizable>
			</ResizablePanel>
		</Resizable>
	);
};

export default ResizableDemo;
