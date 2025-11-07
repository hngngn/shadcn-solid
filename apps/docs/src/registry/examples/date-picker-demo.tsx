import { Index, Show, createSignal } from "solid-js"

import { Button } from "@/registry/ui/button"
import {
  Calendar,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHeadCell,
  CalendarLabel,
  CalendarNav,
  CalendarTable,
} from "@/registry/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@/registry/ui/popover"

const { format: formatWeekdayLong } = new Intl.DateTimeFormat("en", {
  weekday: "long",
})
const { format: formatWeekdayShort } = new Intl.DateTimeFormat("en", {
  weekday: "short",
})
const { format: formatMonth } = new Intl.DateTimeFormat("en", {
  month: "long",
})
const { format: formatTrigger } = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

const DatePickerDemo = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <Calendar
      mode="single"
      onValueChange={() => {
        setOpen((prev) => !prev)
      }}
    >
      {(props) => (
        <Popover open={open()} onOpenChange={setOpen}>
          <PopoverTrigger<typeof Button>
            as={(triggerProps) => (
              <Button
                variant="outline"
                id="date"
                class="w-48 justify-between font-normal"
                {...triggerProps}
              >
                <Show when={props.value} fallback="Select date">
                  {formatTrigger(props.value!)}
                </Show>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m6 9l6 6l6-6"
                  />
                </svg>
              </Button>
            )}
          />
          <PopoverPortal>
            <PopoverContent class="w-auto overflow-hidden p-0">
              <div class="flex flex-col gap-4 rounded-md p-3 shadow-sm">
                <div class="relative flex w-full items-center justify-between">
                  <CalendarNav
                    action="prev-month"
                    aria-label="Go to previous month"
                  />
                  <CalendarLabel>
                    {formatMonth(props.month)} {props.month.getFullYear()}
                  </CalendarLabel>
                  <CalendarNav
                    action="next-month"
                    aria-label="Go to next month"
                  />
                </div>
                <CalendarTable>
                  <thead>
                    <tr class="flex">
                      <Index each={props.weekdays}>
                        {(weekday) => (
                          <CalendarHeadCell abbr={formatWeekdayLong(weekday())}>
                            {formatWeekdayShort(weekday())}
                          </CalendarHeadCell>
                        )}
                      </Index>
                    </tr>
                  </thead>
                  <tbody>
                    <Index each={props.weeks}>
                      {(week) => (
                        <tr class="mt-2 flex w-full">
                          <Index each={week()}>
                            {(day) => (
                              <CalendarCell>
                                <CalendarCellTrigger
                                  day={day()}
                                  class="dark:data-[today]:focus-visible:ring-ring/50"
                                >
                                  {day().getDate()}
                                </CalendarCellTrigger>
                              </CalendarCell>
                            )}
                          </Index>
                        </tr>
                      )}
                    </Index>
                  </tbody>
                </CalendarTable>
              </div>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      )}
    </Calendar>
  )
}

export default DatePickerDemo
