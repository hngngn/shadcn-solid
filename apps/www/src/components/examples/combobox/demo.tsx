import { createFilter } from "@kobalte/core"
import { createSignal } from "solid-js"
import type { ComboboxTriggerMode } from "~/components"
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
} from "~/components"

const ALL_OPTIONS = ["Next.js", "Astro", "Qwik", "SolidStart", "Nuxt.js"]

export const ComboboxDemo = () => {
    const filter = createFilter({ sensitivity: "base" })
    const [options, setOptions] = createSignal(ALL_OPTIONS)
    const onOpenChange = (
        isOpen: boolean,
        triggerMode?: ComboboxTriggerMode
    ) => {
        if (isOpen && triggerMode === "manual") {
            setOptions(ALL_OPTIONS)
        }
    }
    const onInputChange = (value: string) => {
        setOptions(
            ALL_OPTIONS.filter((option) => filter.contains(option, value))
        )
    }

    return (
        <Combobox
            options={options()}
            onInputChange={onInputChange}
            onOpenChange={onOpenChange}
            placeholder="Search framework…"
            itemComponent={(props) => (
                <ComboboxItem item={props.item}>
                    {props.item.rawValue}
                </ComboboxItem>
            )}
        >
            <ComboboxTrigger>
                <ComboboxInput />
            </ComboboxTrigger>
            <ComboboxContent />
        </Combobox>
    )
}
