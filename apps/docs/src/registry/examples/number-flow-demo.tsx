import { createMemo, createSignal } from "solid-js"
import type { Format } from "number-flow/lite"

import { NumberFlow } from "@/registry/ui/number-flow"

const useCycle = <T,>(options: readonly T[]) => {
  const [_options, _setOptions] = createSignal<typeof options>(options)

  const toggle = () => {
    const value = _options()[0]
    const index = Math.abs(_options()!.indexOf(value))

    _setOptions(
      _options()
        .slice(index + 1)
        .concat(value),
    )
  }

  const currentOption = createMemo(() => _options()[0])

  return [currentOption, toggle] as const
}

const NUMBERS = [
  321, -3243.6, 42, 398.43, -3243.5, 1435237.2, 12348.43, -3243.6, 54323.2,
]
const LOCALES = [
  "fr-FR",
  "en-US",
  "fr-FR",
  "en-US",
  "en-US",
  "zh-CN",
  "en-US",
  "en-US",
  "fr-FR",
]
const FORMATS = [
  {
    style: "currency",
    currency: "USD",
    currencySign: "accounting",
    signDisplay: "always",
  },
  {},
  {
    style: "percent",
    signDisplay: "always",
  },
  {},
  {
    style: "unit",
    unit: "meter",
    notation: "compact",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "never",
  },
  {
    style: "currency",
    currency: "USD",
  },
  {},
  {
    signDisplay: "always",
  },
] as Format[]

const NumberFlowDemo = () => {
  const [value, cycleValue] = useCycle(NUMBERS)
  const [locale, cycleLocale] = useCycle(LOCALES)
  const [format, cycleFormat] = useCycle(FORMATS)

  const cycle = () => {
    cycleValue()
    cycleLocale()
    cycleFormat()
  }

  return (
    <div
      onMouseDown={(e) => {
        if (e.detail > 1) {
          e.preventDefault()
        }
      }}
      onClick={cycle}
    >
      <NumberFlow
        class="text-5xl font-semibold"
        value={value()}
        locales={locale()}
        format={format()}
      />
    </div>
  )
}

export default NumberFlowDemo
