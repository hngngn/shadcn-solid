import {
  Slider,
  SliderFill,
  SliderThumb,
  SliderTrack,
} from "@/registry/ui/slider"

const SliderVerticalDemo = () => {
  return (
    <Slider orientation="vertical">
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
      </SliderTrack>
    </Slider>
  )
}

export default SliderVerticalDemo
