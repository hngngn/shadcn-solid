import { For } from "solid-js"

import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  SegmentedControlItemLabel,
  SegmentedControlItems,
  SegmentedControlLabel,
  SegmentedControlList,
} from "@repo/tailwindcss/ui/v4/segmented-control"

const SegmentedControlDemo = () => {
  return (
    <SegmentedControl defaultValue="Orange">
      <SegmentedControlLabel>Favorite fruit</SegmentedControlLabel>
      <SegmentedControlList>
        <SegmentedControlIndicator />
        <SegmentedControlItems>
          <For each={["Apple", "Orange", "Watermelon"]}>
            {(fruit) => (
              <SegmentedControlItem value={fruit}>
                <SegmentedControlItemInput />
                <SegmentedControlItemLabel>{fruit}</SegmentedControlItemLabel>
              </SegmentedControlItem>
            )}
          </For>
        </SegmentedControlItems>
      </SegmentedControlList>
    </SegmentedControl>
  )
}

export default SegmentedControlDemo
