import {
  Slider,
  SliderFill,
  SliderThumb,
  SliderTrack,
} from "@repo/tailwindcss/ui/v4/slider"

const SliderDemo = () => {
  return (
    <Slider defaultValue={[50]} step={1} maxValue={100} class="w-[60%]">
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
      </SliderTrack>
    </Slider>
  )
}

export default SliderDemo
