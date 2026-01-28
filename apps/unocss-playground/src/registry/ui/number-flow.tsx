import type { Accessor, ComponentProps, ParentProps } from "solid-js"
import {
  createComputed,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  splitProps,
  useContext,
} from "solid-js"
import { Dynamic, isServer } from "solid-js/web"
import type { Format, Value } from "number-flow/lite"
import NumberFlowElement, {
  define,
  formatToData,
  renderInnerHTML,
  type Props as NumberFlowProps,
} from "number-flow/lite"

export * from "number-flow/plugins"

define("number-flow-solid", NumberFlowElement)

interface RegisterWithGroup {
  useRegister: (getEl: () => NumberFlowElement | null) => void
  willUpdate: () => void
  didUpdate: () => void
}

const GroupContext = createContext<RegisterWithGroup | undefined>(undefined)

export const NumberFlowGroup = (props: ParentProps) => {
  const flows = new Set<Accessor<NumberFlowElement | null>>()
  const [updating, setUpdating] = createSignal(false)

  const api: RegisterWithGroup = {
    useRegister(getEl) {
      flows.add(getEl)
      onCleanup(() => flows.delete(getEl))
    },

    willUpdate() {
      if (updating()) return
      setUpdating(true)

      flows.forEach((getEl) => {
        const el = getEl()
        if (el?.created) el.willUpdate()
      })
    },

    didUpdate() {
      flows.forEach((getEl) => getEl()?.didUpdate())
      setUpdating(false)
    },
  }

  return (
    <GroupContext.Provider value={api}>{props.children}</GroupContext.Provider>
  )
}

type Props = Partial<NumberFlowProps> & {
  locales?: Intl.LocalesArgument
  format?: Format
  value: Value
  prefix?: string
  suffix?: string
  willChange?: boolean
  isolate?: boolean
  onAnimationsStart?: () => void
  onAnimationsFinish?: () => void
  ref?: (el: NumberFlowElement) => void
}

export const NumberFlow = (props: ComponentProps<"div"> & Props) => {
  const merged = mergeProps(
    {
      trend: NumberFlowElement.defaultProps.trend,
      plugins: NumberFlowElement.defaultProps.plugins,
      animated: NumberFlowElement.defaultProps.animated,
      transformTiming: NumberFlowElement.defaultProps.transformTiming,
      spinTiming: NumberFlowElement.defaultProps.spinTiming,
      opacityTiming: NumberFlowElement.defaultProps.opacityTiming,
      respectMotionPreference:
        NumberFlowElement.defaultProps.respectMotionPreference,
      digits: NumberFlowElement.defaultProps.digits,
      willChange: false,
    } as Props,
    props,
  )

  const [, rest] = splitProps(merged, [
    "locales",
    "format",
    "value",
    "prefix",
    "suffix",
    "trend",
    "plugins",
    "animated",
    "transformTiming",
    "spinTiming",
    "opacityTiming",
    "respectMotionPreference",
    "digits",
    "willChange",
    "onAnimationsStart",
    "onAnimationsFinish",
    "ref",
    "isolate",
  ])

  const [el, setEl] = createSignal<NumberFlowElement | null>(null)

  const formatter = () => new Intl.NumberFormat(merged.locales, merged.format)

  const data = createMemo(() =>
    formatToData(merged.value, formatter(), merged.prefix, merged.suffix),
  )

  const html = createMemo(() =>
    isServer ? renderInnerHTML(data()) : undefined,
  )

  const group = useContext(GroupContext)

  if (group) {
    group.useRegister(el)
  }

  const triggerWillUpdate = () => {
    if (group) group.willUpdate()
    else if (!merged.isolate) el()?.willUpdate()
  }

  const triggerDidUpdate = () => {
    if (group) group.didUpdate()
    else if (!merged.isolate) el()?.didUpdate()
  }

  createComputed(on(data, triggerWillUpdate, { defer: true }))
  createEffect(on(data, triggerDidUpdate, { defer: true }))

  const handleRef = (node: NumberFlowElement) => {
    setEl(node)
    merged.ref?.(node)
  }

  return (
    <Dynamic
      component="number-flow-solid"
      ref={handleRef}
      {...rest}
      batched={merged.isolate}
      trend={merged.trend}
      plugins={merged.plugins}
      animated={merged.animated}
      transformTiming={merged.transformTiming}
      spinTiming={merged.spinTiming}
      opacityTiming={merged.opacityTiming}
      respectMotionPreference={merged.respectMotionPreference}
      digits={merged.digits}
      data-will-change={merged.willChange ? "" : undefined}
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={html()}
      data-allow-mismatch
      onAnimationsStart={merged.onAnimationsStart}
      onAnimationsFinish={merged.onAnimationsFinish}
      data={data()}
    />
  )
}
