import {
  Progress,
  ProgressGroup,
  ProgressLabel,
  ProgressValueLabel,
} from "@repo/tailwindcss/ui/v4/progress"

const ProgressDemo = () => {
  return (
    <Progress value={80} class="max-w-xs">
      <ProgressGroup>
        <ProgressLabel>Progress</ProgressLabel>
        <ProgressValueLabel />
      </ProgressGroup>
    </Progress>
  )
}

export default ProgressDemo
