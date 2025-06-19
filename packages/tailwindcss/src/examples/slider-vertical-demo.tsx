import {
  Slider,
  SliderFill,
  SliderThumb,
  SliderTrack,
} from "@repo/tailwindcss/ui/v4/slider"

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
