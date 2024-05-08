import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as ToggleGroupPrimitive from "@kobalte/core/toggle-group";
import type { VariantProps } from "class-variance-authority";
import {
  type Accessor,
  type ParentProps,
  type ValidComponent,
  createContext,
  createMemo,
  splitProps,
  useContext
} from "solid-js";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = createContext<Accessor<VariantProps<typeof toggleVariants>>>();

const useToggleGroup = () => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error("`useToggleGroup`: must be used within a `ToggleGroup` component");
  }

  return context;
};

type ToggleGroupProps = ParentProps<
  ToggleGroupPrimitive.ToggleGroupRootProps &
    VariantProps<typeof toggleVariants> & {
      class?: string;
    }
>;

export const ToggleGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToggleGroupProps>
) => {
  const [local, rest] = splitProps(props as ToggleGroupProps, [
    "class",
    "children",
    "size",
    "variant"
  ]);

  const value = createMemo<VariantProps<typeof toggleVariants>>(() => ({
    size: local.size,
    variant: local.variant
  }));

  return (
    <ToggleGroupPrimitive.Root
      class={cn("flex items-center justify-center gap-1", local.class)}
      {...rest}
    >
      <ToggleGroupContext.Provider value={value}>{local.children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
};

type ToggleGroupItemProps = ToggleGroupPrimitive.ToggleGroupItemProps & {
  class?: string;
};

export const ToggleGroupItem = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ToggleGroupItemProps>
) => {
  const [local, rest] = splitProps(props as ToggleGroupItemProps, ["class"]);
  const context = useToggleGroup();

  return (
    <ToggleGroupPrimitive.Item
      class={cn(
        toggleVariants({
          variant: context().variant,
          size: context().size
        }),
        local.class
      )}
      {...rest}
    />
  );
};
