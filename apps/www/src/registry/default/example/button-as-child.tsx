import { As } from "@kobalte/core"
import { A } from "solid-start"
import { Button } from "../ui/button"

const ButtonAsChild = () => {
    return (
        <Button asChild>
            <As component={A} href="/login">
                Login
            </As>
        </Button>
    )
}

export default ButtonAsChild
