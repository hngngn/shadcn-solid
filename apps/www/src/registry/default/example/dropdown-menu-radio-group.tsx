import { As } from "@kobalte/core"
import { createSignal } from "solid-js"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuGroupLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const DropdownMenuRadioGroupDemo = () => {
    const [position, setPosition] = createSignal("bottom")

    return (
        <DropdownMenu placement="bottom">
            <DropdownMenuTrigger asChild>
                <As component={Button} variant="outline">
                    Open
                </As>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuGroupLabel>
                        Panel Position
                    </DropdownMenuGroupLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={position()}
                        onChange={setPosition}
                    >
                        <DropdownMenuRadioItem value="top">
                            Top
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom">
                            Bottom
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right">
                            Right
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownMenuRadioGroupDemo
