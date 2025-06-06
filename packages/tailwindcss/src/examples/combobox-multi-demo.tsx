import { For } from "solid-js"

import { Badge } from "@repo/tailwindcss/ui/v4/badge"
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxDescription,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxPortal,
  ComboboxTrigger,
} from "@repo/tailwindcss/ui/v4/combobox"

const ALL_OPTIONS = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

const ComboboxMultiDemo = () => {
  return (
    <Combobox
      multiple
      defaultValue={["Apple"]}
      options={ALL_OPTIONS}
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
        </ComboboxItem>
      )}
    >
      <ComboboxControl<string> class="h-full min-h-9 w-full max-w-sm">
        {(state) => (
          <>
            <div class="flex flex-wrap items-center gap-1">
              <For each={state.selectedOptions()}>
                {(option) => (
                  <Badge class="rounded-sm">
                    {option}
                    <button
                      type="button"
                      class="rounded-full"
                      onClick={() => {
                        state.remove(option)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="size-3"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18 6L6 18M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Badge>
                )}
              </For>
              <ComboboxInput />
            </div>
            <ComboboxTrigger />
          </>
        )}
      </ComboboxControl>
      <ComboboxDescription>
        Choose the fruit you like the most.
      </ComboboxDescription>
      <ComboboxPortal>
        <ComboboxContent />
      </ComboboxPortal>
    </Combobox>
  )
}

export default ComboboxMultiDemo
