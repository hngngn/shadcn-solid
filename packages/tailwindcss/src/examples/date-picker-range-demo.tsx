import { Index, Show } from "solid-js"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Calendar,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHeadCell,
  CalendarLabel,
  CalendarNav,
  CalendarTable,
} from "@repo/tailwindcss/ui/v4/calendar"
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@repo/tailwindcss/ui/v4/popover"

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

const DatePickerRangeDemo = () => {
  return (
    <Calendar mode="range" numberOfMonths={2}>
      {(props) => (
        <Popover>
          <PopoverTrigger<typeof Button>
            as={(triggerProps) => (
              <Button
                variant="outline"
                id="date"
                class="min-w-48 justify-between font-normal"
                {...triggerProps}
              >
                <Show
                  when={props.value.from && props.value.to}
                  fallback="Select date"
                >
                  {formatTrigger(props.value.from!)} -{" "}
                  {formatTrigger(props.value.to!)}
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
              <div class="rounded-md p-3 shadow-sm">
                <div class="relative w-full">
                  <CalendarNav
                    action="prev-month"
                    class="absolute left-1"
                    aria-label="Go to previous month"
                  />
                  <CalendarNav
                    action="next-month"
                    class="absolute right-1"
                    aria-label="Go to next month"
                  />
                </div>
                <div class="space-y-4 md:flex md:space-x-4 md:space-y-0">
                  <Index each={props.months}>
                    {(month, index) => (
                      <div class="flex flex-col gap-4">
                        <div class="flex h-7 items-center justify-center">
                          <CalendarLabel index={index}>
                            {formatMonth(month().month)}{" "}
                            {month().month.getFullYear()}
                          </CalendarLabel>
                        </div>
                        <CalendarTable index={index}>
                          <thead>
                            <tr class="flex">
                              <Index each={props.weekdays}>
                                {(weekday) => (
                                  <CalendarHeadCell
                                    abbr={formatWeekdayLong(weekday())}
                                  >
                                    {formatWeekdayShort(weekday())}
                                  </CalendarHeadCell>
                                )}
                              </Index>
                            </tr>
                          </thead>
                          <tbody>
                            <Index each={month().weeks}>
                              {(week) => (
                                <tr class="mt-2 flex w-full">
                                  <Index each={week()}>
                                    {(day) => (
                                      <CalendarCell>
                                        <CalendarCellTrigger
                                          day={day()}
                                          month={month().month}
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
                    )}
                  </Index>
                </div>
              </div>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      )}
    </Calendar>
  )
}

export default DatePickerRangeDemo
