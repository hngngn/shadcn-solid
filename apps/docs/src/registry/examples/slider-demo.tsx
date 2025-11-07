import {
  Slider,
  SliderFill,
  SliderThumb,
  SliderTrack,
} from "@/registry/ui/slider"

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
