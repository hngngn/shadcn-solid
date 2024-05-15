import { cn } from "@/libs/cn";
import ResizablePrimitive, {
  type HandleElementProps,
  type HandleProps,
  type RootElementProps
} from "@corvu/resizable";
import type { DynamicProps, RootProps } from "@corvu/resizable";
import type { ValidComponent, VoidProps } from "solid-js";
import { Show, splitProps } from "solid-js";

export const ResizablePanel = ResizablePrimitive.Panel;

type ResizableProps = RootProps & {
  class?: string;
};

export const Resizable = <T extends ValidComponent = "div">(
  props: DynamicProps<T, ResizableProps, RootElementProps>
) => {
  const [local, rest] = splitProps(props as ResizableProps, ["class"]);

  return <ResizablePrimitive class={cn("size-full", local.class)} {...rest} />;
};

type ResizableHandleProps = VoidProps<
  HandleProps & {
    class?: string;
    withHandle?: boolean;
  }
>;

export const ResizableHandle = <T extends ValidComponent = "button">(
  props: DynamicProps<T, ResizableHandleProps, HandleElementProps>
) => {
  const [local, rest] = splitProps(props as ResizableHandleProps, ["class", "withHandle"]);

  return (
    <ResizablePrimitive.Handle
      class={cn(
        "flex w-px items-center justify-center bg-border focus-visible:(outline-none ring-1.5 ring-ring ring-offset-1) data-[orientation=vertical]:(h-px w-full) transition-shadow",
        local.class
      )}
      {...rest}
    >
      <Show when={local.withHandle}>
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" viewBox="0 0 15 15">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M5.5 4.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m4 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25M10.625 7.5a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0M5.5 8.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m5.125 2.875a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0M5.5 12.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </Show>
    </ResizablePrimitive.Handle>
  );
};
