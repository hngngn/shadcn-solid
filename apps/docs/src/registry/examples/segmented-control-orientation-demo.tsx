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
} from "@/registry/ui/segmented-control"

const SegmentedControlOrientationDemo = () => {
  return (
    <SegmentedControl orientation="vertical" defaultValue="Orange">
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

export default SegmentedControlOrientationDemo
