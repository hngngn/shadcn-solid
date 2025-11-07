import { createSignal } from "solid-js"

import {
  Slider,
  SliderDescription,
  SliderErrorMessage,
  SliderFill,
  SliderGroup,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@/registry/ui/slider"

const SliderCustomLabelDemo = () => {
  const [values, setValues] = createSignal<number[]>([400, 1200])

  return (
    <Slider
      class="w-[60%]"
      value={values()}
      onChange={setValues}
      minValue={10}
      maxValue={2000}
      getValueLabel={(params) => `$${params.values[0]} - $${params.values[1]}`}
      validationState={
        values()[0] < 200 || values()[1] > 1500 ? "invalid" : "valid"
      }
    >
      <SliderGroup>
        <SliderLabel>Money</SliderLabel>
        <SliderValueLabel />
      </SliderGroup>
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
        <SliderThumb />
      </SliderTrack>
      <SliderDescription>Money range</SliderDescription>
      <SliderErrorMessage>Should be between $200 and $1500</SliderErrorMessage>
    </Slider>
  )
}

export default SliderCustomLabelDemo
