import { cn } from "@/lib/cn";
import { splitProps, type ComponentProps, type ParentComponent } from "solid-js";

export const Table: ParentComponent<ComponentProps<"table">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class="w-full overflow-auto">
      <table class={cn("w-full caption-bottom text-sm", local.class)} {...rest} />
    </div>
  );
};

export const TableHeader: ParentComponent<ComponentProps<"thead">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return <thead class={cn("[&_tr]:border-b", local.class)} {...rest} />;
};

export const TableBody: ParentComponent<ComponentProps<"tbody">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return <tbody class={cn("[&_tr:last-child]:border-0", local.class)} {...rest} />;
};

export const TableFooter: ParentComponent<ComponentProps<"tfoot">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <tbody class={cn("bg-primary font-medium text-primary-foreground", local.class)} {...rest} />
  );
};

export const TableRow: ParentComponent<ComponentProps<"tr">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <tr
      class={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        local.class
      )}
      {...rest}
    />
  );
};

export const TableHead: ParentComponent<ComponentProps<"th">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <th
      class={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class
      )}
      {...rest}
    />
  );
};

export const TableCell: ParentComponent<ComponentProps<"td">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <td
      class={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class
      )}
      {...rest}
    />
  );
};

export const TableCaption: ParentComponent<ComponentProps<"caption">> = props => {
  const [local, rest] = splitProps(props, ["class"]);
  return <caption class={cn("mt-4 text-sm text-muted-foreground", local.class)} {...rest} />;
};
