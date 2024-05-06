import { createSignal } from "solid-js";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

const DropdownMenuCheckboxes = () => {
  const [showStatusBar, setShowStatusBar] = createSignal<boolean>(true);
  const [showActivityBar, setShowActivityBar] = createSignal<boolean>(false);
  const [showPanel, setShowPanel] = createSignal<boolean>(false);

  return (
    <DropdownMenu placement="bottom">
      <DropdownMenuTrigger as={() => <Button variant="outline">Open</Button>} />
      <DropdownMenuContent class="w-56">
        <DropdownMenuCheckboxItem checked={showStatusBar()} onChange={setShowStatusBar}>
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar()}
          onChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPanel()} onChange={setShowPanel}>
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuCheckboxes;
