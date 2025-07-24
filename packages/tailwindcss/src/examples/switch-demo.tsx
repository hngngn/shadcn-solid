import {
  Switch,
  SwitchControl,
  SwitchInput,
  SwitchLabel,
  SwitchThumb,
} from "@repo/tailwindcss/ui/v4/switch"

const SwitchDemo = () => {
  return (
    <Switch class="flex items-center gap-x-2">
      <SwitchInput />
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Airplane Mode</SwitchLabel>
    </Switch>
  )
}

export default SwitchDemo
