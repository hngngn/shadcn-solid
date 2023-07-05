import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from "../ui/switch"

const SwitchDemo = () => {
    return (
        <Switch class="flex items-center space-x-2">
            <SwitchControl>
                <SwitchThumb />
            </SwitchControl>
            <SwitchLabel class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Airplane Mode
            </SwitchLabel>
        </Switch>
    )
}

export default SwitchDemo
