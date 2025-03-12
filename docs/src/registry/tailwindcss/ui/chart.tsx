import {
  For,
  Match,
  Show,
  Switch,
  createContext,
  mergeProps,
  splitProps,
  useContext,
  type JSX,
} from "solid-js"
import { render } from "solid-js/web"
import {
  VisCrosshair,
  VisSingleContainer,
  VisXYContainer,
  type VisCrosshairProps,
} from "@unovis/solid"

import { cn } from "@/registry/tailwindcss/libs/cn"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: '[data-kb-theme="dark"]' } as const

export type ChartConfig = Record<
  string,
  {
    label?: JSX.Element
    icon?: JSX.Element
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type chartContextProps = {
  config: ChartConfig
}

const ChartContext = createContext<chartContextProps>()

const useChart = () => {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

type SingleContainer<T> = Parameters<typeof VisSingleContainer<T>>[0] & {
  type: "single"
}

type XYContainer<T> = Parameters<typeof VisXYContainer<T>>[0] & {
  type: "xy"
}

type chartContainerProps<T> = (XYContainer<T> | SingleContainer<T>) &
  chartContextProps

export const ChartContainer = <T,>(props: chartContainerProps<T>) => {
  const [local, rest] = splitProps(props, [
    "config",
    "children",
    "type",
    "class",
  ])

  return (
    <ChartContext.Provider
      value={{
        get config() {
          return local.config
        },
      }}
    >
      <div class={cn("flex aspect-video justify-center", local.class)}>
        <Switch>
          <Match when={local.type === "xy"}>
            <VisXYContainer {...(rest as Omit<XYContainer<T>, "type">)}>
              <ChartStyle type="xy" config={local.config} />
              {local.children}
            </VisXYContainer>
          </Match>

          <Match when={local.type === "single"}>
            <VisSingleContainer {...(rest as Omit<SingleContainer<T>, "type">)}>
              <ChartStyle type="singe" config={local.config} />
              {local.children}
            </VisSingleContainer>
          </Match>
        </Switch>
      </div>
    </ChartContext.Provider>
  )
}

// TODO: fix the typo
export const ChartStyle = (
  props: { type: "xy" | "singe" } & Omit<chartContextProps, "data">
) => {
  const colorConfig = () =>
    Object.entries(props.config).filter(
      ([, config]) => config.theme ?? config.color
    )

  return (
    <Show when={colorConfig().length}>
      <style>
        {Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
						${prefix} [data-vis-${props.type}-container] {
						${colorConfig()
              .map(([key, itemConfig]) => {
                const color =
                  itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
                  itemConfig.color
                return color ? `  --color-${key}: ${color};` : null
              })
              .join("\n")}
						}
						`
          )
          .join("\n")}
      </style>
    </Show>
  )
}

type chartCrosshairProps<T> = Omit<VisCrosshairProps<T>, "template"> & {
  template?: (
    props: {
      data: T
      x: number | Date
    } & chartContextProps
  ) => JSX.Element
}

export const ChartCrosshair = <T,>(props: chartCrosshairProps<T>) => {
  const [local, rest] = splitProps(props, ["template"])
  const { config } = useChart()

  const template = (d: T, x: number | Date) => {
    const container = document.createElement("div")
    const Component = () =>
      !local.template ? null : local.template({ data: d, x, config })
    render(() => <Component />, container)
    return container.innerHTML
  }

  return <VisCrosshair template={template} {...rest} />
}

// @ts-expect-error
type chartTooltipContentProps<T, C extends ChartConfig = undefined> = {
  data: T
  x: number | Date
  labelKey: C extends undefined ? keyof T : keyof C
  class?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  nameKey?: C extends undefined ? never : keyof C
  labelFormatter?: (data: number | Date) => JSX.Element
  labelAsKey?: boolean
  formatter?: (
    value: number,
    name: JSX.Element,
    item: T,
    index: number
  ) => JSX.Element
} & chartContextProps

// @ts-expect-error
export const ChartTooltipContent = <T, C extends ChartConfig = undefined>(
  props: chartTooltipContentProps<T, C>
) => {
  const merge = mergeProps(
    {
      hideLabel: false,
      hideIndicator: false,
      indicator: "dot",
      labelAsKey: false,
    } satisfies Partial<chartTooltipContentProps<T, C>>,
    props
  )

  const value = () =>
    getConfigFromData<T, C>(
      merge.data,
      merge.config,
      merge.labelKey,
      merge.nameKey
    )

  const tooltipLabel = () => {
    if (merge.hideLabel || !value().items.length) {
      return null
    }

    return (
      <div class="font-medium capitalize">
        <Show
          when={!merge.labelFormatter}
          fallback={merge.labelFormatter!(
            typeof merge.x === "number" ? Math.round(merge.x) : merge.x
          )}
        >
          {value().label as JSX.Element}
        </Show>
      </div>
    )
  }

  const nestLabel = () =>
    value().items.length === 1 && merge.indicator !== "dot"

  return (
    <div
      class={cn("grid min-w-[8rem] items-start gap-1.5 text-xs", merge.class)}
    >
      <Show when={!nestLabel()}>{tooltipLabel()}</Show>
      <div class="grid gap-1.5">
        <For each={value().items}>
          {(item, index) => (
            <div
              class={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5",
                merge.indicator === "dot" && "items-center"
              )}
            >
              <Show
                when={!merge.formatter}
                fallback={merge.formatter!(
                  item.value!,
                  item.key,
                  merge.data,
                  index()
                )}
              >
                <Show when={item.icon}>{item.icon}</Show>
                <Show when={!item.icon && !merge.hideIndicator}>
                  <div
                    class={cn(
                      "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                      {
                        "size-2.5": merge.indicator === "dot",
                        "w-1": merge.indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent":
                          merge.indicator === "dashed",
                        "my-0.5": nestLabel() && merge.indicator === "dashed",
                      }
                    )}
                    style={{
                      "--color-border": item.color,
                      "--color-bg": item.color,
                    }}
                  />
                </Show>
                <div
                  class={cn(
                    "flex flex-1 justify-between gap-1.5 leading-none",
                    nestLabel() ? "items-end" : "items-center"
                  )}
                >
                  <div class="grid gap-1.5">
                    <Show when={nestLabel()}>{tooltipLabel()}</Show>
                    <span class="text-muted-foreground capitalize">
                      <Show
                        when={!merge.labelAsKey}
                        fallback={value().label as string}
                      >
                        {item.key}
                      </Show>
                    </span>
                  </div>
                  <span class="text-foreground font-mono font-medium tabular-nums">
                    {item.value}
                  </span>
                </div>
              </Show>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

// @ts-expect-error
const getConfigFromData = <T, C extends ChartConfig = undefined>(
  data: T,
  config: ChartConfig,
  labelKey?: C extends undefined ? keyof T : keyof C,
  nameKey?: C extends undefined ? never : keyof C
) => {
  const valueKeys =
    // @ts-expect-error
    Object.entries(data)
      .filter(
        ([key, value]) =>
          key !== labelKey &&
          (typeof value === "number" || typeof value === "object")
      )
      .filter(([key]) => !key.includes("_"))
      .map(([key]) => key)

  const items = valueKeys.map((key) => {
    const configItem = config[key]
    let color = configItem.color

    // @ts-expect-error
    if (!color && "fill" in data) {
      color = data.fill as string
    }

    const rawValue = data[key as keyof T]
    const value =
      typeof rawValue === "object" && rawValue !== null
        ? Object.values(rawValue).find((v) => typeof v === "number")
        : (rawValue as number)

    return {
      value,
      key: nameKey ? config[nameKey].label : configItem.label,
      icon: configItem.icon,
      color,
    }
  })

  const label = data[labelKey as keyof T] ?? config[labelKey as keyof C].label

  return {
    label,
    items,
  }
}
