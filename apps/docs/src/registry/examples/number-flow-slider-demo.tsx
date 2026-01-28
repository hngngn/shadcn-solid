import { useSliderContext } from "@kobalte/core/slider"

import { NumberFlow, continuous } from "@/registry/ui/number-flow"
import {
  Slider,
  SliderFill,
  SliderThumb,
  SliderTrack,
} from "@/registry/ui/slider"

const SliderTrackView = () => {
  const context = useSliderContext()

  return (
    <SliderTrack>
      <SliderFill />
      <SliderThumb>
        <NumberFlow
          locales="en-US"
          willChange
          value={Number(
            context.getValueLabel?.({
              values: context.state.values(),
              max: context.maxValue(),
              min: context.minValue(),
            }),
          )}
          plugins={[continuous]}
          opacityTiming={{
            duration: 250,
            easing: "ease-out",
          }}
          transformTiming={{
            easing: `linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)`,
            duration: 500,
          }}
          class="absolute bottom-6 left-1/2 -translate-x-1/2 font-semibold"
        />
      </SliderThumb>
    </SliderTrack>
  )
}

const NumberFlowSliderDemo = () => {
  return (
    <Slider defaultValue={[50]} step={1} maxValue={100} class="w-[60%]">
      <SliderTrackView />
    </Slider>
  )
}

export default NumberFlowSliderDemo
