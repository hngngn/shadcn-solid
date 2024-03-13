import { cn } from "@/lib/cn";
import { TextField as TextFieldPrimitive } from "@kobalte/core";
import { cva } from "class-variance-authority";
import { splitProps, type ParentComponent } from "solid-js";

export const TextField: ParentComponent<TextFieldPrimitive.TextFieldRootProps> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return <TextFieldPrimitive.Root class={cn("space-y-1", local.class)} {...rest} />;
};

const textfieldLabel = cva(
  "text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 font-medium",
  {
    variants: {
      label: {
        true: "data-[invalid]:text-destructive"
      },
      error: {
        true: "text-destructive"
      },
      description: {
        true: "font-normal text-muted-foreground"
      }
    },
    defaultVariants: {
      label: true
    }
  }
);

export const TextFieldLabel: ParentComponent<TextFieldPrimitive.TextFieldLabelProps> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return <TextFieldPrimitive.Label class={cn(textfieldLabel(), local.class)} {...rest} />;
};

export const TextFieldErrorMessage: ParentComponent<
  TextFieldPrimitive.TextFieldErrorMessageProps
> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <TextFieldPrimitive.ErrorMessage
      class={cn(textfieldLabel({ error: true }), local.class)}
      {...rest}
    />
  );
};

export const TextFieldDescription: ParentComponent<
  TextFieldPrimitive.TextFieldDescriptionProps
> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <TextFieldPrimitive.Description
      class={cn(textfieldLabel({ description: true }), local.class)}
      {...rest}
    />
  );
};

export const TextFieldInput: ParentComponent<TextFieldPrimitive.TextFieldInputProps> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <TextFieldPrimitive.Input
      class={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...rest}
    />
  );
};
