import { Separator } from "../ui/separator";

const SeparatorDemo = () => {
  return (
    <div>
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Kobalte UI</h4>
        <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator class="my-4" />
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
        <Separator orientation="vertical" />
        <div>Changelog</div>
      </div>
    </div>
  );
};

export default SeparatorDemo;
