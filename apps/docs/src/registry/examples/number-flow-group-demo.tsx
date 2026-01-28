import { createMemo, createSignal } from "solid-js"

import { cx } from "@/registry/lib/cva"
import { NumberFlow, NumberFlowGroup } from "@/registry/ui/number-flow"

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

const DATA = [
  { value: 124.23, diff: 0.0564 },
  { value: 2125.95, diff: 0.0029 },
  { value: 41.75, diff: -0.3912 },
]

const NumberFlowGroupDemo = () => {
  const [data, cycleData] = useCycle(DATA)

  return (
    <div
      onMouseDown={(e) => {
        if (e.detail > 1) {
          e.preventDefault()
        }
      }}
      onClick={cycleData}
    >
      <NumberFlowGroup>
        <div
          style={{ "--number-flow-char-height": "0.85em" }}
          class="flex items-center gap-4 font-semibold"
        >
          <NumberFlow
            value={data().value}
            locales="en-US"
            format={{ style: "currency", currency: "USD" }}
            class="text-4xl"
          />
          <NumberFlow
            value={data().diff}
            locales="en-US"
            format={{
              style: "percent",
              maximumFractionDigits: 2,
              signDisplay: "always",
            }}
            class={cx(
              "text-2xl transition-colors duration-300",
              data().diff < 0 ? "text-red-500" : "text-emerald-500",
            )}
          />
        </div>
      </NumberFlowGroup>
    </div>
  )
}

export default NumberFlowGroupDemo
