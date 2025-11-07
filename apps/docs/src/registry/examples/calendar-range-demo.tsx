import { Index } from "solid-js"

import {
  Calendar,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHeadCell,
  CalendarLabel,
  CalendarNav,
  CalendarTable,
} from "@/registry/ui/calendar"

const { format: formatWeekdayLong } = new Intl.DateTimeFormat("en", {
  weekday: "long",
})
const { format: formatWeekdayShort } = new Intl.DateTimeFormat("en", {
  weekday: "short",
})
const { format: formatMonth } = new Intl.DateTimeFormat("en", {
  month: "long",
})

const CalendarRangeDemo = () => {
  return (
    <Calendar mode="range" numberOfMonths={2}>
      {(props) => (
        <div class="rounded-md border p-3 shadow-sm">
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
          <div class="space-y-4 md:flex md:space-y-0 md:space-x-4">
            <Index each={props.months}>
              {(month, index) => (
                <div class="flex flex-col gap-4">
                  <div class="flex h-7 items-center justify-center">
                    <CalendarLabel index={index}>
                      {formatMonth(month().month)} {month().month.getFullYear()}
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
      )}
    </Calendar>
  )
}

export default CalendarRangeDemo
